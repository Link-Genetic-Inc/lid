# linkid-client – Python SDK

[![CI](https://github.com/Link-Genetic-Inc/lid/actions/workflows/ci.yml/badge.svg)](https://github.com/Link-Genetic-Inc/lid/actions/workflows/ci.yml)

Python client library for the [LinkID](https://linkgenetic.com) persistent identifier system.

## Installation

pip install linkid-client

## Quick Start

from linkid import LinkIdClient

client = LinkIdClient(resolver="https://resolver.linkgenetic.com")
result = client.resolve("linkid:7e96f229-21c3-4a3d-a6cf-ef7d8dd70f24")
print(result.target_uri)

## Requirements

- Python 3.9, 3.11, or 3.12

## Development

pip install -r requirements.txt
pytest --cov=. --cov-report=xml

## License

[LCL v1.0](../../LICENSE) – free for non-commercial use.
