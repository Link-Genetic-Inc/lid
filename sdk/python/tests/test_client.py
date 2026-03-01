"""Unit tests for the LinkID Python client SDK."""
import pytest
from unittest.mock import AsyncMock, MagicMock, patch
from linkid.client import LinkIdClient
from linkid.errors import LinkIdError, ErrorCode

RESOLVER = "https://resolver.linkgenetic.com"
VALID_ID = "linkid:7e96f229-21c3-4a3d-a6cf-ef7d8dd70f24"
INVALID_ID = "not-a-linkid"


class TestLinkIdClient:
    def setup_method(self):
        self.client = LinkIdClient(resolver=RESOLVER)

    def test_constructor_sets_resolver(self):
        assert self.client is not None

    def test_resolve_raises_on_invalid_id(self):
        with pytest.raises((LinkIdError, ValueError)):
            import asyncio
            asyncio.get_event_loop().run_until_complete(
                self.client.resolve(INVALID_ID)
            )

    @pytest.mark.asyncio
    async def test_resolve_returns_result_on_success(self):
        mock_response = MagicMock()
        mock_response.status = 200
        mock_response.json = AsyncMock(return_value={
            "linkId": VALID_ID,
            "targetUri": "https://example.com",
            "contentType": "text/html",
        })
        mock_response.__aenter__ = AsyncMock(return_value=mock_response)
        mock_response.__aexit__ = AsyncMock(return_value=False)

        with patch("aiohttp.ClientSession.get", return_value=mock_response):
            result = await self.client.resolve(VALID_ID)
            assert result.target_uri == "https://example.com"

    @pytest.mark.asyncio
    async def test_resolve_raises_on_404(self):
        mock_response = MagicMock()
        mock_response.status = 404
        mock_response.json = AsyncMock(return_value={"error": "not found"})
        mock_response.__aenter__ = AsyncMock(return_value=mock_response)
        mock_response.__aexit__ = AsyncMock(return_value=False)

        with patch("aiohttp.ClientSession.get", return_value=mock_response):
            with pytest.raises(LinkIdError):
                await self.client.resolve(VALID_ID)


class TestLinkIdError:
    def test_has_error_code(self):
        err = LinkIdError("not found", ErrorCode.NOT_FOUND)
        assert err.code == ErrorCode.NOT_FOUND

    def test_is_exception(self):
        err = LinkIdError("test", ErrorCode.NETWORK_ERROR)
        assert isinstance(err, Exception)
