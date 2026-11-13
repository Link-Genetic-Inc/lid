# Contributing to LinkID

Thank you for your interest in contributing! This guide covers everything you need to get started.

---

## 1. Sign the CLA

All contributors must sign our [Contributor License Agreement](../.github/CLA.md) before their first PR is merged. The signing declaration is unchanged:

1. Open a pull request
2. Read the CLA linked above
3. Reply with exactly: `I have read the CLA Document and I hereby sign the CLA`
4. A maintainer verifies the GitHub identity and declaration and records the PR comment URL in the review before merge.

The CLA Assistant workflow was observed manually disabled on 13 November 2026.
Do not assume an automated comment or status check will appear. Maintainers must
check existing signatures in `.github/cla-signatures.json` and the PR record;
absence of a bot check is not a waiver. Re-enabling the workflow and configuring
its credentials requires a separate repository-administrator decision.

> ℹ️ No email, no PDF, no manual process. The bot handles everything.

---

## 2. What to Contribute

| Area | Examples |
|------|---------|
| **SDK bug fixes** | Fixes in `sdk/js`, `sdk/python`, `sdk/java` |
| **New SDK language bindings** | Go, Rust, Ruby, .NET, PHP |
| **Tests** | Unit tests, conformance tests, integration tests |
| **Documentation** | Improvements, translations, examples |
| **Specification** | Editorial corrections to `spec/` or `draft/` |

**Out of scope** (separate licensed repository):
- Server-side resolver implementations
- AI/semantic link repair engine (LinkManager)

---

## 3. Development Setup

### JavaScript / TypeScript
```bash
cd sdk/js
npm install
npm run build
npm test
npm run lint
```

### Python
```bash
cd sdk/python
pip install -e ".[dev]"
pytest
ruff check .
black --check .
```

### Java
```bash
cd sdk/java
mvn verify
```

---

## 4. Code Style

| Language | Linter | Formatter |
|----------|--------|-----------|
| TypeScript / JS | ESLint (`@typescript-eslint`) | Prettier |
| Python | Ruff | Black |
| Java | Google Java Style | — |

---

## 5. Pull Request Process

1. Fork the repository, create a branch from `main`
2. Write tests for your changes
3. Ensure all CI checks pass locally
4. Update `CHANGELOG.md` under `[Unreleased]`
5. Open a PR — a maintainer checks your CLA signature and the required CI results before merge
6. A maintainer reviews within **7 working days**

---

## 6. Getting Help

- ❓ Questions → [GitHub Discussions](https://github.com/Link-Genetic-Inc/lid/discussions)
- 🐛 Bugs → [Open an Issue](https://github.com/Link-Genetic-Inc/lid/issues/new?template=bug_report.md)
- 📧 General → [community@linkgenetic.com](mailto:community@linkgenetic.com)

---

## 7. Governance

See [GOVERNANCE.md](../GOVERNANCE.md) for roles, decision-making, and the release process.
