package org.linkgenetic.linkid;

import java.time.Instant;
import java.util.Map;
import java.util.Objects;

public final class ResolutionResult {

    private final String linkId;
    private final String targetUri;
    private final String contentType;
    private final Instant resolvedAt;
    private final Map<String, String> metadata;

    public ResolutionResult(String linkId, String targetUri, String contentType, Instant resolvedAt, Map<String, String> metadata) {
        this.linkId = Objects.requireNonNull(linkId);
        this.targetUri = Objects.requireNonNull(targetUri);
        this.contentType = contentType;
        this.resolvedAt = resolvedAt;
        this.metadata = metadata != null ? Map.copyOf(metadata) : Map.of();
    }

    public String getLinkId() { return linkId; }
    public String getTargetUri() { return targetUri; }
    public String getContentType() { return contentType; }
    public Instant getResolvedAt() { return resolvedAt; }
    public Map<String, String> getMetadata() { return metadata; }

    @Override
    public String toString() { return "ResolutionResult{linkId='" + linkId + "', targetUri='" + targetUri + "'}"; }
}
