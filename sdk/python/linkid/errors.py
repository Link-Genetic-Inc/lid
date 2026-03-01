"""Error types for the LinkID Python client SDK."""

from __future__ import annotations

from enum import Enum
from typing import Any, Dict, Optional


class ErrorCode(Enum):
    """Standard error codes returned by the LinkID resolver."""

    NOT_FOUND = "NOT_FOUND"
    WITHDRAWN = "WITHDRAWN"
    NETWORK_ERROR = "NETWORK_ERROR"
    VALIDATION_ERROR = "VALIDATION_ERROR"
    UNAUTHORIZED = "UNAUTHORIZED"
    FORBIDDEN = "FORBIDDEN"
    RATE_LIMITED = "RATE_LIMITED"
    HTTP_ERROR = "HTTP_ERROR"
    TIMEOUT = "TIMEOUT"


class LinkIdError(Exception):
    """Base error for all LinkID client issues."""

    def __init__(
        self,
        message: str,
        code: Optional[ErrorCode] = None,
    ) -> None:
        super().__init__(message)
        self.code = code


class NetworkError(LinkIdError):
    """Raised when the client cannot reach the resolver."""

    def __init__(self, message: str) -> None:
        super().__init__(message, code=ErrorCode.NETWORK_ERROR)


class ValidationError(LinkIdError):
    """Raised when request parameters are invalid."""

    def __init__(self, message: str) -> None:
        super().__init__(message, code=ErrorCode.VALIDATION_ERROR)


class NotFoundError(LinkIdError):
    """Raised when the resolver cannot find the requested LinkID."""

    def __init__(self, link_id: str, message: str = "") -> None:
        msg = message or f"LinkID not found: {link_id}"
        super().__init__(msg, code=ErrorCode.NOT_FOUND)
        self.link_id = link_id


class WithdrawnError(LinkIdError):
    """Raised when the requested LinkID has been withdrawn."""

    def __init__(
        self,
        link_id: str,
        message: str = "",
        tombstone: Optional[Dict[str, Any]] = None,
    ) -> None:
        msg = message or f"LinkID withdrawn: {link_id}"
        super().__init__(msg, code=ErrorCode.WITHDRAWN)
        self.link_id = link_id
        self.tombstone = tombstone or {}
