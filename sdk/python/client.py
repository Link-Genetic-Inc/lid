"""Sample LinkID client for Python.




This module demonstrates how to interact with a LinkID resolver as
specified in the project documentation. It covers the common operations:
resolution, registration, update, and withdrawal.
"""




from __future__ import annotations




import re
import time
from dataclasses import dataclass, replace
from typing import Any, Dict, Optional, Union












class LinkIDError(Exception):
    """Base error for LinkID client issues."""




    def __init__(self, message: str, code: Optional[str] = None) -> None:
        super().__init__(message)
        self.code = code








class NetworkError(LinkIDError):
    """Raised when the client cannot reach the resolver."""








class ValidationError(LinkIDError):
    """Raised when request parameters are invalid."""








class LinkIDNotFoundError(LinkIDError):
    """Raised when the resolver cannot find the requested LinkID."""




    def __init__(self, link_id: str, message: str) -> None:
        super().__init__(message, code="NOT_FOUND")
        self.link_id = link_id








class LinkIDWithdrawnError(LinkIDError):
    """Raised when the requested LinkID has been withdrawn."""




    def __init__(self, link_id: str, message: str, tombstone: Optional[Dict[str, Any]] = None) -> None:
        super().__init__(message, code="WITHDRAWN")
        self.link_id = link_id
        self.tombstone = tombstone or {}


@dataclass
class RedirectResolution:
    """Represents a resolver redirect response."""




    link_id: str
    uri: str
    resolver: str
    cached: bool = False
    quality: Optional[float] = None








@dataclass
class MetadataResolution:
    """Represents a resolver metadata response."""




    link_id: str
    data: Dict[str, Any]
    resolver: str
    cached: bool = False








ResolutionResult = Union[RedirectResolution, MetadataResolution]
