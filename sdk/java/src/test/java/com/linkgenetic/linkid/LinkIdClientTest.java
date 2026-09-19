package com.linkgenetic.linkid;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import static org.junit.jupiter.api.Assertions.*;

class LinkIdClientTest {

    private static final String RESOLVER = "https://linkid.io";
    private static final String VALID_ID = "linkid:7e96f229-21c3-4a3d-a6cf-ef7d8dd70f24";
    private static final String INVALID_ID = "not-a-linkid";

    private LinkIdClient client;

    @BeforeEach
    void setUp() {
        client = LinkIdClient.builder()
            .resolverUri(java.net.URI.create(RESOLVER))
            .build();
    }

    @Test
    void constructor_setsResolver() { assertNotNull(client); }

    @Test
    void resolve_throwsOnInvalidLinkId() {
        assertThrows(LinkIdClient.ValidationException.class, () -> client.resolve(INVALID_ID));
    }

    @Test
    void resolve_throwsOnNullLinkId() {
        assertThrows(NullPointerException.class, () -> client.resolve(null));
    }

    @Test
    void resolutionResult_storesValues() {
        var result = new ResolutionResult(VALID_ID, "https://example.com/resource", "text/html", java.time.Instant.now(), java.util.Map.of("version", "1"));
        assertEquals(VALID_ID, result.getLinkId());
        assertEquals("https://example.com/resource", result.getTargetUri());
        assertEquals("1", result.getMetadata().get("version"));
    }

    @Test
    void linkIdException_notFound_containsId() {
        var ex = new LinkIdException.NotFound(VALID_ID);
        assertEquals(VALID_ID, ex.getLinkId());
        assertTrue(ex.getMessage().contains(VALID_ID));
    }

    @Test
    void linkIdException_resolutionFailed_containsStatusCode() {
        var ex = new LinkIdException.ResolutionFailed(404, "not found");
        assertEquals(404, ex.getStatusCode());
    }
}
