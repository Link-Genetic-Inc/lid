import os

import pytest

from linkid import LinkIdClient, MetadataResolution


@pytest.mark.integration
def test_public_resolution_contract() -> None:
    if os.getenv("LINKID_INTEGRATION") != "1":
        pytest.skip("set LINKID_INTEGRATION=1 to enable live integration tests")
    with LinkIdClient(
        resolver=os.getenv("LINKID_RESOLVER", "https://linkid.io"),
        caching=False,
    ) as client:
        result = client.resolve(
            os.getenv(
                "LINKID_TEST_ID",
                "linkid:b1a93fdb-ab8a-49f8-a359-33ad79e19df3",
            )
        )
    assert isinstance(result, MetadataResolution)
    assert {
        "id", "scheme", "uuid", "target_url", "status",
        "last_verified_at", "version",
    } <= result.data.keys()