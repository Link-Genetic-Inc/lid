# LinkID Governance

## Overview

The LinkID project is maintained by **Link Genetic GmbH** (Zurich, Switzerland).
Community discussion includes the [WICG proposal](https://github.com/WICG/proposals/issues/238)
and the DISPATCH mailing list. A proposal or presentation is not evidence of
a dedicated W3C Community Group, IETF adoption or standards approval.

The project operates on two layers:

| Layer | Who decides | Scope |
|-------|-------------|-------|
| **Specification** | Link Genetic editors; community review through the relevant venues | `spec/` (working copy), `draft/` (historical) |
| **Repository / SDKs** | Link Genetic GmbH with community input | `sdk/`, `tests/`, CI |

---

## Roles

### Maintainers
Write access to this repository. Responsibilities: review and merge PRs, triage issues, cut releases, enforce Code of Conduct.

Current maintainers: Link Genetic GmbH ([@Link-Genetic-Inc](https://github.com/Link-Genetic-Inc))

### Contributors
Anyone who submits a PR, files an issue, or participates in discussions. Contributors must sign the [CLA](.github/CLA.md) before their first PR is merged. A maintainer reviews signatures while the automated assistant is disabled.

### Community Participants
Participants in the [WICG proposal](https://github.com/WICG/proposals/issues/238),
GitHub Discussions and DISPATCH discussions can provide specification feedback.
Participation does not confer an unestablished standards-body role.

---

## Decision Making

| Type | Process |
|------|---------|
| Bug fixes, dependency updates | Maintainer discretion |
| New SDK features, API changes | GitHub Issue/PR discussion, 7-day comment window |
| Specification changes (`spec/`, `draft/`) | Community discussion, minimum 14-day review; external submissions remain separately approved |
| Breaking changes (major version) | GitHub Discussions announcement, 30-day notice |
| CLA or License changes | Announced 30 days in advance, community consultation |

---

## Release Process

1. All CI checks green
2. `CHANGELOG.md` updated with version entry
3. An authorized maintainer approves the release and pushes a new immutable tag `v{major}.{minor}.{patch}`
4. Release preflight and reusable CI test the exact tag; all checks must pass before any registry publication
5. SDKs are published to npm, PyPI and Maven Central, followed by the GitHub Release

Documentation maintenance does not itself authorize tagging, publication or
re-publication of 1.0.1. Platform, SDK and security-policy versions are separate.
The CLA Assistant workflow was observed manually disabled on 13 November 2026;
until explicitly re-enabled, a maintainer must review and record CLA signatures
before merging contributions. No automated CLA enforcement is claimed.

---

## Patent Policy

Patent application **CH P220889** is filed, not stated to be granted. The repository
uses [Apache-2.0](LICENSE); the existing [Patent Promise](PATENTS.md) separately
defines its Covered Specifications and Necessary Claims. It includes covered
open-source and commercial implementations, not a grant to the proprietary
platform or features outside that scope. See [product licensing](https://linkgenetic.com/licenses)
for separately supplied platform/server products. These grants are not changed here.

---

## Amendments

Governance changes are proposed via GitHub Discussions with a minimum 14-day feedback period before taking effect.

*Questions? → [GitHub Discussions](https://github.com/Link-Genetic-Inc/lid/discussions) or [community@linkgenetic.com](mailto:community@linkgenetic.com)*
