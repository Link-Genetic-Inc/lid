# linkid-client – Python SDK

[![CI](https://github.com/Link-Genetic-Inc/lid/actions/workflows/ci.yml/badge.svg)](https://github.com/Link-Genetic-Inc/lid/actions/workflows/ci.yml)

Python client library for the [LinkID](https://linkgenetic.com) persistent identifier system.

## Installation

The PyPI package is publication-ready but is not yet published; installation
will be available after the first release.

## Quick Start

from linkid import LinkIdClient

client = LinkIdClient()
result = client.resolve("linkid:b1a93fdb-ab8a-49f8-a359-33ad79e19df3")
print(result.data)

## Requirements

- Python 3.9, 3.11, or 3.12

## Development

pip install -r requirements.txt
pytest --cov=. --cov-report=xml

## License

[Apache-2.0](LICENSE). This SDK currently supports public resolution only.
