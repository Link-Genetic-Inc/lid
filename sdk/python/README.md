# linkid-client – Python SDK

[![CI](https://github.com/Link-Genetic-Inc/lid/actions/workflows/ci.yml/badge.svg)](https://github.com/Link-Genetic-Inc/lid/actions/workflows/ci.yml)

Python client library for the [LinkID](https://linkgenetic.com) persistent identifier system.

## Installation

Version 1.0.1 is published on
[PyPI](https://pypi.org/project/linkid-client/).

```bash
pip install linkid-client
```

## Quick Start

```python
from linkid import LinkIdClient

client = LinkIdClient()
result = client.resolve("linkid:b1a93fdb-ab8a-49f8-a359-33ad79e19df3")
print(result.data)
```

## Requirements

- Python 3.9+

## Development

```bash
pip install -r requirements.txt
pytest --cov=. --cov-report=xml
```

## License

[Apache-2.0](LICENSE). This SDK currently supports public resolution only.
