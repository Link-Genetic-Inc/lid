# SPDX-License-Identifier: Apache-2.0
# SPDX-FileCopyrightText: 2025-2026 Link Genetic GmbH <info@linkgenetic.com>

"""LinkID Python Client SDK.

Provides a client library for interacting with LinkID resolvers.

Example
-------
>>> from linkid import LinkIdClient
>>> client = LinkIdClient()
>>> result = client.resolve("linkid:b1a93fdb-ab8a-49f8-a359-33ad79e19df3")
>>> print(result.data["target_url"])
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

__version__ = "1.0.1"
