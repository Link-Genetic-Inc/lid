# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
