# LinkID Governance

## Overview

The LinkID project is maintained by **Link Genetic GmbH** (Zurich, Switzerland) in collaboration with the [W3C LinkID Community Group](https://www.w3.org/community/linkid/).

The project operates on two layers:

| Layer | Who decides | Scope |
|-------|-------------|-------|
| **Specification** | W3C Community Group + Link Genetic GmbH | `spec/`, `draft/` |
| **Repository / SDKs** | Link Genetic GmbH with community input | `sdk/`, `tests/`, CI |

---

## Roles

### Maintainers
Write access to this repository. Responsibilities: review and merge PRs, triage issues, cut releases, enforce Code of Conduct.

Current maintainers: Link Genetic GmbH ([@Link-Genetic-Inc](https://github.com/Link-Genetic-Inc))

### Contributors
Anyone who submits a PR, files an issue, or participates in discussions. Must sign the [CLA](CLA.md) before their first PR is merged (automated via bot — no email required).

### Community Group Members
Members of the [W3C LinkID Community Group](https://www.w3.org/community/linkid/) have a voice in the specification process. Joining is free and open.

---

## Decision Making

| Type | Process |
|------|---------|
| Bug fixes, dependency updates | Maintainer discretion |
| New SDK features, API changes | GitHub Issue/PR discussion, 7-day comment window |
| Specification changes (`spec/`, `draft/`) | W3C CG discussion, minimum 14-day review |
| Breaking changes (major version) | GitHub Discussions announcement, 30-day notice |
| CLA or License changes | Announced 30 days in advance, community consultation |

---

## Release Process

1. All CI checks green
2. `CHANGELOG.md` updated with version entry
3. Git tag `v{major}.{minor}.{patch}` pushed → triggers release workflow
4. SDKs auto-published to npm, PyPI, Maven Central

---

## Patent Policy

LinkID technology is protected by patent application **CH P220889**. Use of the **client SDK libraries** in this repository does **not** require a patent license. Server-side implementations require licensing — see [linkgenetic.com/licenses](https://linkgenetic.com/licenses).

---

## Amendments

Governance changes are proposed via GitHub Discussions with a minimum 14-day feedback period before taking effect.

*Questions? → [GitHub Discussions](https://github.com/Link-Genetic-Inc/lid/discussions) or [community@linkgenetic.com](mailto:community@linkgenetic.com)*
