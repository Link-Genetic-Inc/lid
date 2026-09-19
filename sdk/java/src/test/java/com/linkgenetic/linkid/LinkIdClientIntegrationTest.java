package com.linkgenetic.linkid;

import com.fasterxml.jackson.databind.JsonNode;
import org.junit.jupiter.api.Assumptions;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertTrue;

class LinkIdClientIntegrationTest {
    @Test
    void resolvesPublicContract() {
        Assumptions.assumeTrue("1".equals(System.getenv("LINKID_INTEGRATION")));
        String resolver = System.getenv().getOrDefault("LINKID_RESOLVER", "https://linkid.io");
        String identifier = System.getenv().getOrDefault(
            "LINKID_TEST_ID", "linkid:b1a93fdb-ab8a-49f8-a359-33ad79e19df3");
        LinkIdClient client = LinkIdClient.builder()
            .resolverUri(java.net.URI.create(resolver))
            .caching(false)
            .build();
        var result = client.resolve(identifier);
        Assumptions.assumeTrue(result instanceof LinkIdClient.MetadataResolution);
        JsonNode data = ((LinkIdClient.MetadataResolution) result).metadata();
        for (String field : new String[] {
            "id", "scheme", "uuid", "target_url", "status",
            "last_verified_at", "version"
        }) {
            assertTrue(data.has(field), "missing field: " + field);
        }
    }
}