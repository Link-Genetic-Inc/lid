# LinkID Roadmap

> Community input welcome via [GitHub Discussions](https://github.com/Link-Genetic-Inc/lid/discussions).

---

## ✅ Completed

- JavaScript / TypeScript SDK (`@linkgenetic/client`)
- Python SDK (`linkid-client`)
- Java SDK (`com.linkgenetic:linkid-client`)
- Independent architecture draft (not a W3C Recommendation)
- IETF Internet-Draft for `linkid:` URI scheme
- IANA `linkid:` URI scheme provisional registration
- WICG proposal opened (not evidence of a dedicated W3C Community Group)
- TPAC 2025 Breakout Session (Kobe)
- GitHub Actions CI and Dependabot configured
- SDK 1.0.1 published on npm, PyPI and Maven Central
- Submitted IETF URI draft revision -01

---

## 🚧 Current status

- [ ] Verify all refreshed CI jobs after the maintenance changes reach GitHub
- [ ] Run the opt-in integration tests against the live public resolver
- [ ] TypeDoc API docs auto-deployed to GitHub Pages
- [ ] Maintainer review of CLA signatures (automated CLA workflow currently disabled)
- [ ] IETF 127 DISPATCH discussion, 16 November 2026, San Francisco / remote

---

## 📅 Planned

- [ ] **Go SDK** (planned; no published package claimed)
- [ ] **Ruby gem** (planned; no published package claimed)
- [ ] Explore W3C incubation / a Community Group report; neither is an approved standard
- [ ] Evaluate DISPATCH feedback before proposing another Internet-Draft revision
- [ ] Conformance test suite expansion
- [ ] Code coverage reports in CI (Codecov)

---

## 💡 Longer-term proposals

- [ ] Browser-native `linkid:` scheme resolution (Chromium intent-to-prototype)
- [ ] C# / .NET SDK
- [ ] PHP SDK, Rust crate
- [ ] WICG Proposal advancement
- [ ] Federation protocol for multi-resolver deployments

---

## 🔒 Out of Scope (not open-sourced)

- Server-side resolver implementation
- AI-powered semantic link repair (LinkManager)
- Enterprise management portal

*Status reviewed: 13 November 2026. Local preparation is not a published release or
a successful GitHub CI run. The public SDK version remains 1.0.1.*
