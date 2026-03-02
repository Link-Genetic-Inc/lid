// SPDX-License-Identifier: LicenseRef-LCL-1.0
// SPDX-FileCopyrightText: 2025-2026 Link Genetic GmbH <info@linkgenetic.com>

package org.linkgenetic.linkid;

public class LinkIdException extends Exception {

    public LinkIdException(String message) { super(message); }
    public LinkIdException(String message, Throwable cause) { super(message, cause); }

    public static class NotFound extends LinkIdException {
        private final String linkId;
        public NotFound(String linkId) { super("LinkID not found: " + linkId); this.linkId = linkId; }
        public String getLinkId() { return linkId; }
    }

    public static class ResolutionFailed extends LinkIdException {
        private final int statusCode;
        public ResolutionFailed(int statusCode, String msg) { super("Resolution failed (" + statusCode + "): " + msg); this.statusCode = statusCode; }
        public int getStatusCode() { return statusCode; }
    }

    public static class NetworkError extends LinkIdException {
        public NetworkError(String message, Throwable cause) { super("Network error: " + message, cause); }
    }

    public static class InvalidLinkId extends LinkIdException {
        public InvalidLinkId(String value) { super("Invalid LinkID: " + value); }
    }
}
