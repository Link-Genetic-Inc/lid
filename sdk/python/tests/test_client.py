"""Unit tests for the LinkID Python client SDK."""

import pytest
from unittest.mock import MagicMock, patch

import httpx

from linkid.client import LinkIdClient, RedirectResolution, MetadataResolution
from linkid.errors import LinkIdError, ErrorCode, ValidationError, NotFoundError, NetworkError


RESOLVER = "https://resolver.linkgenetic.com"
VALID_ID = "linkid:7e96f229-21c3-4a3d-a6cf-ef7d8dd70f24"
VALID_RAW_ID = "7e96f229-21c3-4a3d-a6cf-ef7d8dd70f24"
INVALID_ID = "not-a-linkid"


class TestLinkIdClient:
    def setup_method(self):
        self.client = LinkIdClient(resolver=RESOLVER)

    def teardown_method(self):
        self.client.close()

    def test_constructor_sets_resolver(self):
        assert self.client.resolver == RESOLVER

    def test_resolve_raises_on_invalid_id(self):
        with pytest.raises(ValidationError):
            self.client.resolve(INVALID_ID)

    def test_resolve_returns_redirect_on_3xx(self):
        mock_response = httpx.Response(
            status_code=302,
            headers={
                "location": "https://example.com/resource",
                "x-linkid-resolver": RESOLVER,
            },
            request=httpx.Request("GET", f"{RESOLVER}/resolve/{VALID_RAW_ID}"),
        )

        with patch.object(self.client._http, "request", return_value=mock_response):
            result = self.client.resolve(VALID_ID)
            assert isinstance(result, RedirectResolution)
            assert result.target_uri == "https://example.com/resource"
            assert result.link_id == VALID_RAW_ID

    def test_resolve_returns_metadata_on_200(self):
        mock_response = httpx.Response(
            status_code=200,
            json={
                "linkId": VALID_RAW_ID,
                "targetUri": "https://example.com",
                "contentType": "text/html",
            },
            headers={"x-linkid-resolver": RESOLVER},
            request=httpx.Request("GET", f"{RESOLVER}/resolve/{VALID_RAW_ID}"),
        )

        with patch.object(self.client._http, "request", return_value=mock_response):
            result = self.client.resolve(VALID_ID, metadata=True)
            assert isinstance(result, MetadataResolution)
            assert result.data["targetUri"] == "https://example.com"

    def test_resolve_raises_not_found_on_404(self):
        mock_response = httpx.Response(
            status_code=404,
            json={"error": "not found"},
            request=httpx.Request("GET", f"{RESOLVER}/resolve/{VALID_RAW_ID}"),
        )

        with patch.object(self.client._http, "request", return_value=mock_response):
            with pytest.raises(NotFoundError) as exc_info:
                self.client.resolve(VALID_ID)
            assert exc_info.value.code == ErrorCode.NOT_FOUND

    def test_register_requires_api_key(self):
        with pytest.raises(ValidationError, match="API key required"):
            self.client.register("https://example.com/doc.pdf")

    def test_register_validates_target_uri(self):
        client = LinkIdClient(resolver=RESOLVER, api_key="test-key")
        with pytest.raises(ValidationError, match="absolute HTTP"):
            client.register("not-a-url")
        client.close()


class TestLinkIdError:
    def test_has_error_code(self):
        err = LinkIdError("not found", ErrorCode.NOT_FOUND)
        assert err.code == ErrorCode.NOT_FOUND

    def test_is_exception(self):
        err = LinkIdError("test", ErrorCode.NETWORK_ERROR)
        assert isinstance(err, Exception)

    def test_not_found_stores_link_id(self):
        err = NotFoundError("abc123" * 6)
        assert err.link_id == "abc123" * 6
        assert err.code == ErrorCode.NOT_FOUND
