"""LinkID Python Client SDK.

Provides a client library for interacting with LinkID resolvers.

Example
-------
>>> from linkid import LinkIdClient
>>> client = LinkIdClient(resolver="https://resolver.linkgenetic.com")
>>> result = client.resolve("linkid:7e96f229-21c3-4a3d-a6cf-ef7d8dd70f24")
>>> print(result.target_uri)
"""

from .client import (
    LinkIdClient,
    MetadataResolution,
    RedirectResolution,
    ResolutionResult,
)
from .errors import (
    ErrorCode,
    LinkIdError,
    NetworkError,
    NotFoundError,
    ValidationError,
    WithdrawnError,
)

__all__ = [
    "LinkIdClient",
    "RedirectResolution",
    "MetadataResolution",
    "ResolutionResult",
    "LinkIdError",
    "ErrorCode",
    "NetworkError",
    "ValidationError",
    "NotFoundError",
    "WithdrawnError",
]

__version__ = "1.0.0"
