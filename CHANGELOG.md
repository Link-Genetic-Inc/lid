# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed
- Align documentation with the Apache-2.0 repository license and existing Patent Promise; retain separate platform licensing.
- Add the verified IETF 127 DISPATCH session and distinguish the official submitted draft from the editable working copy.
- Correct SDK publication status, contributor links and WICG/IANA status descriptions.
- Clarify that persistent identifiers require maintained, authorized mappings and do not guarantee target availability.
- Refresh CI coverage for supported Node.js and Python runtimes without changing the published SDK minimum requirements.
- Gate every registry publication on checks of the exact release-tag source.

### Fixed
- Replace the unexecutable legacy conformance suite with isolated public-resolution contract tests.
- Replace references to nonexistent test infrastructure with runnable SDK and repository checks.
- Use a valid reproducible Java archive timestamp so packaging does not fail at the ZIP epoch boundary.
- Preserve `cross-fetch/polyfill` as a declared external runtime import in both JavaScript bundles; add build-artifact regression checks to prevent undeclared top-level `node-fetch` imports.

These changes are maintenance preparation, not a new SDK release. SDK 1.0.1,
security policy 1.1 and LinkID platform releases have independent version numbers.

## [1.0.1] - 2026-09-19

### Added
- Publication-ready JavaScript, Python, and Java client SDK packages
- Apache License 2.0 files and package metadata for each public client SDK
- Gated live integration tests for the public LinkID resolver contract

### Changed
- Public SDKs now resolve through `https://linkid.io/api/public/resolve/{identifier}`
- Java coordinates and package namespace use `com.linkgenetic`
- Maven publishing uses the current Central Publisher Portal workflow
- Registry and availability claims now match the packages' pre-release status

### Fixed
- Unsupported public write operations fail locally instead of calling nonexistent endpoints
- JavaScript lockfile uses public npm registry URLs so external CI can install dependencies
- GitHub Actions install JavaScript dependencies reliably on Node.js 22

## [1.0.0] - 2026-02-28

### Added
- Initial repository structure with JS, Python, and Java SDKs
- W3C Specification (`spec/index.html`)
- IETF Internet-Draft for LinkID URI scheme
- GitHub Actions CI workflows (CI, CLA, GitHub Pages)
- Contributor License Agreement (CLA)
- Contributing guidelines and Code of Conduct
- TPAC 2025 presentation materials
