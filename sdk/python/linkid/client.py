# SPDX-License-Identifier: LicenseRef-LCL-1.0
# SPDX-FileCopyrightText: 2025-2026 Link Genetic GmbH <info@linkgenetic.com>

"""LinkID client for Python.

This module provides the main client class for interacting with a LinkID
resolver.  It covers the common operations: resolution, registration,
update, and withdrawal.
"""

from __future__ import annotations

import re
import time
from dataclasses import dataclass, field
from typing import Any, Dict, Optional, Union

import httpx

from .errors import (
    ErrorCode,
    LinkIdError,
    NetworkError,
    NotFoundError,
    ValidationError,
    WithdrawnError,
)

# ---------------------------------------------------------------------------
# Data classes
# ---------------------------------------------------------------------------

_LINKID_PATTERN = re.compile(r"^[A-Za-z0-9._~-]{32,64}$")
_LINKID_URI_PREFIX = "linkid:"


@dataclass(frozen=True)
class RedirectResolution:
    """Represents a resolver redirect response."""

    link_id: str
    target_uri: str
    resolver: str
    cached: bool = False
    quality: Optional[float] = None


@dataclass(frozen=True)
class MetadataResolution:
    """Represents a resolver metadata response."""

    link_id: str
    data: Dict[str, Any] = field(default_factory=dict)
    resolver: str = ""
    cached: bool = False


ResolutionResult = Union[RedirectResolution, MetadataResolution]


# ---------------------------------------------------------------------------
# Client
# ---------------------------------------------------------------------------


class LinkIdClient:
    """Client for interacting with a LinkID resolver.

    Parameters
    ----------
    resolver:
        Base URL of the LinkID resolver
        (e.g. ``"https://resolver.linkgenetic.com"``).
    api_key:
        Optional API key required for registration, update, and
        withdrawal operations.
    timeout:
        Request timeout in seconds (default ``10.0``).
    retries:
        Number of retry attempts on transient failures (default ``3``).
    caching:
        Whether to cache resolution results in memory (default ``True``).
    cache_ttl:
        Default cache time-to-live in seconds (default ``3600``).
    headers:
        Additional HTTP headers to send with every request.

    Example
    -------
    >>> client = LinkIdClient(resolver="https://resolver.linkgenetic.com")
    >>> result = client.resolve("linkid:7e96f229-21c3-4a3d-a6cf-ef7d8dd70f24")
    >>> print(result.target_uri)
    """

    def __init__(
        self,
        resolver: str = "https://resolver.linkgenetic.com",
        *,
        api_key: Optional[str] = None,
        timeout: float = 10.0,
        retries: int = 3,
        caching: bool = True,
        cache_ttl: int = 3600,
        headers: Optional[Dict[str, str]] = None,
    ) -> None:
        self.resolver = resolver.rstrip("/")
        self.api_key = api_key
        self.timeout = timeout
        self.retries = retries
        self.caching = caching
        self.cache_ttl = cache_ttl
        self._extra_headers = headers or {}
        self._cache: Dict[str, _CacheEntry] = {}
        self._http = httpx.Client(
            timeout=timeout,
            follow_redirects=False,
            headers=self._build_default_headers(),
        )

    # -- public API ---------------------------------------------------------

    def resolve(
        self,
        link_id: str,
        *,
        format: Optional[str] = None,
        language: Optional[str] = None,
        version: Optional[int] = None,
        timestamp: Optional[str] = None,
        metadata: bool = False,
        bypass_cache: bool = False,
    ) -> ResolutionResult:
        """Resolve a LinkID to its current resource location.

        Parameters
        ----------
        link_id:
            The LinkID to resolve (may include the ``linkid:`` prefix).
        format:
            Preferred response format.
        language:
            Preferred language (BCP-47).
        version:
            Specific version number.
        timestamp:
            ISO-8601 point-in-time for historical resolution.
        metadata:
            Request metadata instead of redirect.
        bypass_cache:
            Ignore any cached result.

        Returns
        -------
        ResolutionResult
            A ``RedirectResolution`` or ``MetadataResolution``.
        """
        raw_id = self._strip_prefix(link_id)
        self._validate_link_id(raw_id)

        cache_key = self._cache_key(raw_id, format, language, version, metadata)
        if self.caching and not bypass_cache:
            cached = self._get_cached(cache_key)
            if cached is not None:
                return cached

        params: Dict[str, str] = {}
        if format:
            params["format"] = format
        if language:
            params["lang"] = language
        if version is not None:
            params["version"] = str(version)
        if timestamp:
            params["at"] = timestamp
        if metadata:
            params["metadata"] = "true"

        url = f"{self.resolver}/resolve/{raw_id}"
        response = self._request("GET", url, params=params)

        if self._is_redirect(response.status_code):
            location = response.headers.get("location", "")
            quality_str = response.headers.get("x-linkid-quality")
            quality = float(quality_str) if quality_str else None
            result: ResolutionResult = RedirectResolution(
                link_id=raw_id,
                target_uri=location,
                resolver=response.headers.get("x-linkid-resolver", self.resolver),
                cached=False,
                quality=quality,
            )
        elif response.status_code == 200:
            data = response.json()
            result = MetadataResolution(
                link_id=raw_id,
                data=data,
                resolver=response.headers.get("x-linkid-resolver", self.resolver),
                cached=False,
            )
        else:
            self._handle_error(response, raw_id)
            # _handle_error always raises; this line is never reached
            raise LinkIdError(f"Unexpected status {response.status_code}")

        if self.caching:
            ttl = self._parse_cache_ttl(response.headers.get("cache-control"))
            self._cache[cache_key] = _CacheEntry(result=result, expires_at=time.monotonic() + ttl)

        return result

    def register(
        self,
        target_uri: str,
        *,
        media_type: Optional[str] = None,
        language: Optional[str] = None,
        metadata: Optional[Dict[str, Any]] = None,
    ) -> Dict[str, Any]:
        """Register a new LinkID.

        Parameters
        ----------
        target_uri:
            The URL that the new LinkID should point to.
        media_type:
            MIME type of the target resource.
        language:
            Language of the target resource (BCP-47).
        metadata:
            Arbitrary metadata to associate with the LinkID.

        Returns
        -------
        dict
            Registration result including the newly assigned LinkID.
        """
        self._require_api_key("registration")
        self._validate_url(target_uri)

        body: Dict[str, Any] = {"targetUri": target_uri}
        if media_type:
            body["mediaType"] = media_type
        if language:
            body["language"] = language
        if metadata:
            body["metadata"] = metadata

        url = f"{self.resolver}/register"
        response = self._request("POST", url, json=body)

        if response.status_code not in (200, 201):
            self._handle_error(response)

        return response.json()

    def update(
        self,
        link_id: str,
        *,
        target_uri: Optional[str] = None,
        media_type: Optional[str] = None,
        language: Optional[str] = None,
        metadata: Optional[Dict[str, Any]] = None,
    ) -> None:
        """Update an existing LinkID.

        Parameters
        ----------
        link_id:
            The LinkID to update.
        target_uri:
            New target URL.
        media_type:
            New MIME type.
        language:
            New language.
        metadata:
            New metadata (replaces existing).
        """
        raw_id = self._strip_prefix(link_id)
        self._validate_link_id(raw_id)
        self._require_api_key("update")

        body: Dict[str, Any] = {}
        if target_uri is not None:
            self._validate_url(target_uri)
            body["targetUri"] = target_uri
        if media_type is not None:
            body["mediaType"] = media_type
        if language is not None:
            body["language"] = language
        if metadata is not None:
            body["metadata"] = metadata

        url = f"{self.resolver}/resolve/{raw_id}"
        response = self._request("PUT", url, json=body)

        if response.status_code not in (200, 204):
            self._handle_error(response, raw_id)

        self._invalidate_cache(raw_id)

    def withdraw(
        self,
        link_id: str,
        *,
        reason: Optional[str] = None,
    ) -> None:
        """Withdraw (soft-delete) a LinkID.

        Parameters
        ----------
        link_id:
            The LinkID to withdraw.
        reason:
            Optional human-readable reason.
        """
        raw_id = self._strip_prefix(link_id)
        self._validate_link_id(raw_id)
        self._require_api_key("withdrawal")

        body: Dict[str, Any] = {}
        if reason:
            body["reason"] = reason

        url = f"{self.resolver}/resolve/{raw_id}"
        response = self._request("DELETE", url, json=body if body else None)

        if response.status_code not in (200, 204):
            self._handle_error(response, raw_id)

        self._invalidate_cache(raw_id)

    def clear_cache(self) -> None:
        """Remove all cached resolution results."""
        self._cache.clear()

    def close(self) -> None:
        """Close the underlying HTTP client."""
        self._http.close()

    def __enter__(self) -> "LinkIdClient":
        return self

    def __exit__(self, *exc: Any) -> None:
        self.close()

    # -- internal helpers ---------------------------------------------------

    @staticmethod
    def _strip_prefix(link_id: str) -> str:
        if link_id.startswith(_LINKID_URI_PREFIX):
            return link_id[len(_LINKID_URI_PREFIX):]
        return link_id

    @staticmethod
    def _validate_link_id(link_id: str) -> None:
        if not link_id:
            raise ValidationError("LinkID must be a non-empty string")
        if not _LINKID_PATTERN.match(link_id):
            raise ValidationError(
                f"Invalid LinkID format: must be 32-64 URL-safe characters, got '{link_id}'"
            )

    @staticmethod
    def _validate_url(url: str) -> None:
        if not url or not (url.startswith("http://") or url.startswith("https://")):
            raise ValidationError(f"targetUri must be an absolute HTTP(S) URL, got '{url}'")

    def _require_api_key(self, operation: str) -> None:
        if not self.api_key:
            raise ValidationError(f"API key required for {operation}")

    def _build_default_headers(self) -> Dict[str, str]:
        headers: Dict[str, str] = {
            "User-Agent": "LinkID-Python-Client/1.0.0",
            "Accept": "application/linkid+json, application/json, */*",
        }
        headers.update(self._extra_headers)
        if self.api_key:
            headers["Authorization"] = f"ApiKey {self.api_key}"
        return headers

    def _request(
        self,
        method: str,
        url: str,
        *,
        params: Optional[Dict[str, str]] = None,
        json: Optional[Any] = None,
    ) -> httpx.Response:
        last_exc: Optional[Exception] = None

        for attempt in range(1, self.retries + 1):
            try:
                response = self._http.request(method, url, params=params, json=json)
                # Retry on 5xx
                if response.status_code >= 500 and attempt < self.retries:
                    time.sleep(2 ** (attempt - 1))
                    continue
                return response
            except httpx.TimeoutException as exc:
                last_exc = exc
            except httpx.HTTPError as exc:
                last_exc = exc

            if attempt < self.retries:
                time.sleep(2 ** (attempt - 1))

        raise NetworkError(
            f"Request failed after {self.retries} attempts: {last_exc}"
        )

    @staticmethod
    def _is_redirect(status: int) -> bool:
        return status in (301, 302, 303, 307, 308)

    def _handle_error(
        self,
        response: httpx.Response,
        link_id: Optional[str] = None,
    ) -> None:
        try:
            data = response.json()
        except Exception:
            data = {}

        message = data.get("error") or data.get("message") or f"HTTP {response.status_code}"
        lid = link_id or "unknown"

        status = response.status_code
        if status == 404:
            raise NotFoundError(lid, message)
        if status == 410:
            raise WithdrawnError(lid, message, tombstone=data.get("tombstone"))
        if status in (400, 422):
            raise ValidationError(message)
        if status == 401:
            raise LinkIdError(message, ErrorCode.UNAUTHORIZED)
        if status == 403:
            raise LinkIdError(message, ErrorCode.FORBIDDEN)
        if status == 429:
            raise LinkIdError(message, ErrorCode.RATE_LIMITED)
        raise LinkIdError(message, ErrorCode.HTTP_ERROR)

    # -- cache helpers ------------------------------------------------------

    def _cache_key(
        self,
        link_id: str,
        fmt: Optional[str],
        lang: Optional[str],
        ver: Optional[int],
        meta: bool,
    ) -> str:
        return f"linkid:{link_id}|{fmt or ''}|{lang or ''}|{ver or ''}|{'1' if meta else '0'}"

    def _get_cached(self, key: str) -> Optional[ResolutionResult]:
        entry = self._cache.get(key)
        if entry is None:
            return None
        if time.monotonic() > entry.expires_at:
            del self._cache[key]
            return None
        return entry.result

    def _invalidate_cache(self, link_id: str) -> None:
        prefix = f"linkid:{link_id}|"
        keys = [k for k in self._cache if k.startswith(prefix)]
        for k in keys:
            del self._cache[k]

    def _parse_cache_ttl(self, header: Optional[str]) -> int:
        if not header:
            return self.cache_ttl
        match = re.search(r"max-age=(\d+)", header)
        if match:
            return int(match.group(1))
        return self.cache_ttl


@dataclass
class _CacheEntry:
    result: ResolutionResult
    expires_at: float
