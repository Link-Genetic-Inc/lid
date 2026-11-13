# LinkID tests and coverage

These commands describe files and scripts actually present in this repository.
The public SDK is **resolve-only**. These tests do not certify the older extended
architecture, an independent resolver federation, proprietary repair services,
payment processing or cryptographic provenance verification.

## Requirements and isolation

- Node.js 22, 24 or 26 for the refreshed JavaScript CI matrix.
- Python 3.11–3.15 for the refreshed Python CI matrix.
- JDK 17, 21 or 25 and Maven for Java.
- Dependency installation in the relevant SDK directory, not the repository root.
- No Docker, MongoDB, Redis or persistent test database is required.

Published SDK 1.0.1 still advertises its original minimum runtime versions.
The supported CI matrix above is not a retroactive change to that package.

## Repository documentation and release safeguards

From the repository root, with Node.js and no additional dependencies:

```bash
node --test tests/repository/*.test.js
```

These checks cover local documentation links, the existing license and Patent
Promise references, version consistency, current IETF metadata, and the release
workflow's dependency on exact-source CI. They are not a security scan.

## JavaScript SDK

```bash
cd sdk/js
npm ci --include=dev --ignore-scripts --no-audit --no-fund
npm run lint
npm run type-check
npm run build
npm run test:coverage
node --test ../../tests/conformance/resolution-algorithm.test.js
```

The final command uses an ephemeral HTTP server on loopback to exercise the
actual built SDK: public endpoint selection, JSON metadata, malformed input,
404/410/403, non-JSON responses, cache reuse/bypass and unsupported registration.
It uses fixture UUIDs and `example.org`; it neither mints identifiers nor calls
production. It replaces the former unexecutable tests with missing mocks.

## Python SDK

```bash
cd sdk/python
python -m pip install -e '.[dev]' black
ruff check .
black --check .
python -m pytest tests/ -m 'not integration'
```

Unit tests mock HTTP responses; the integration test is disabled unless
explicitly opted in.

The unit tests also use Python's standard `unittest` runner, so with the SDK
runtime dependencies installed they can be run without pytest:

```bash
cd sdk/python
python -m unittest discover -s tests -p test_client.py -v
```

## Java SDK

```bash
cd sdk/java
mvn --batch-mode -Dgpg.skip=true verify
```

Unit tests use mocked HTTP responses. No signing keys are required for this
validation; it does not invoke `deploy` or publish a package.

## Optional live resolver checks

The existing **Integration Tests** GitHub workflow is manual, not scheduled.
It performs public, read-only resolution against `https://linkid.io` by default.
Use a known existing LinkID; example syntax alone does not prove a record exists.
No automatic writes, production seeding or account creation is part of the check.

To run a language's existing live test, set `LINKID_INTEGRATION=1`,
`LINKID_RESOLVER` and `LINKID_TEST_ID`, then run respectively:

- JavaScript: `npm run test:integration` from `sdk/js`.
- Python: `python -m pytest tests/ -m integration` from `sdk/python`.
- Java: `mvn --batch-mode test -Dlinkid.integration=true` from `sdk/java`.

A Cloudflare HTML challenge, network failure or sign-in page is not a successful
resolver response. Report the actual result; do not bypass protections to make a
test appear green.

## CI, release and reports

- `.github/workflows/ci.yml`: SDK lint/build/tests, isolated public-contract
  checks, documentation/release safeguards and HTML validation.
- `.github/workflows/integration.yml`: opt-in live resolver checks.
- `.github/workflows/release.yml`: preflight plus reusable CI on the exact
  release tag **before** any npm, PyPI or Maven publication.
- JavaScript coverage is generated in `sdk/js/coverage/`; Python coverage in
  `sdk/python/coverage.xml`; Java test reports in `sdk/java/target/surefire-reports/`.

There is no root `npm run test:all`, root Maven project, Docker Compose test
stack, GitLab/Jenkins/CircleCI configuration, or `tests/reports/` aggregation.
Earlier references to those facilities described proposals, not delivered tools.

## Future coverage, not implemented conformance claims

The earlier test catalogue included resolver selection/ranking, content and
language negotiation, historical versions, signature validation, DOI/ARK/archive
integration, CMS integration, federation, authentication, rate limits, latency,
throughput and load testing. These require separate fixtures, implementations and
acceptance criteria before being advertised as tested capabilities.
