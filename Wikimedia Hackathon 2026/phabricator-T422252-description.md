# T422252 · Improving Wikipedia Reference Integrity with Persistent LinkIDs

**Project tag**: Wikimedia-Hackathon-2026  
**Type**: Project / Working Session + Demo  
**Presenter**: Christian Nyffenegger (Link Genetic GmbH)  
**Contact**: hackathon@linkgenetic.com  
**Demo**: https://www.loom.com/share/614350752f0d426ca943db03b4aea24b  
**Use Cases**: https://github.com/Link-Genetic-Inc/lid/tree/main/Wikimedia%20Hackathon%202026

---

## Summary

Wikipedia's references are its epistemic backbone — and a significant share of them are broken or silently misleading. This project introduces **LinkID**, a persistent identifier system that decouples the *identity* of a reference from the *physical address* of its target, solving both link rot and content drift at the infrastructure level.

During the hackathon, we will prototype a MediaWiki integration, discuss governance and deployment models with the community, and explore how LinkID can complement existing tools like InternetArchiveBot and Citoid.

---

## The Problem

| Failure Mode | Description | Scale |
|---|---|---|
| **Link rot** | URL returns 404 / domain expired | Tens of millions of Wikipedia references |
| **Content drift** | URL resolves but content has changed | Hard to detect; pervasive |
| **Version opacity** | No anchor to the version consulted at citation time | Universal |

Current mitigations (InternetArchiveBot, manual archiving) are reactive and incomplete. They treat symptoms, not the underlying structural fragility.

---

## The Proposed Solution

```
Traditional:  Wikipedia article → URL → Resource  (breaks or drifts silently)
With LinkID:  Wikipedia article → LinkID → Resolver → Current or archived resource
```

A **LinkID** (`linkid:UUID`) is a stable, location-independent identifier assigned at citation time. The resolver always returns the best available version of the resource — live, redirected, or archived — and exposes an API for monitoring content changes over time.

LinkID is:
- An open specification (W3C Community Group: https://www.w3.org/community/linkid/)
- Available under a Public Interest License (LPIL) for Wikimedia's use
- Deployable fully on WMF infrastructure (no external dependency required)

---

## Hackathon Goals

### Must (demo-ready by closing showcase)
- [ ] **UC-1**: Live demo of link rot detection and automatic fallback to archived snapshot
- [ ] **UC-3**: Working `{{cite web}}` template extension with `|linkid=` parameter on a MediaWiki sandbox instance

### Should (working prototype or clear design)
- [ ] **UC-4**: Reference archival triggered at registration time, including Wayback Machine snapshot
- [ ] **UC-6**: Design for a bot-assisted migration pass over existing citations

### Could (discussion + community feedback)
- [ ] **UC-2**: Content drift alerting API design
- [ ] **UC-5**: Wikidata property proposal for `P_linkid`
- [ ] **UC-7**: Cross-wiki reference resilience model

---

## What Participants Will Do

This is a hands-on working session, open to anyone interested in:

- **MediaWiki / Lua / PHP developers**: Help prototype the `{{cite web}}` extension (UC-3) and the resolver integration hook
- **Bot operators**: Discuss the migration bot design (UC-6) and InternetArchiveBot integration path
- **Wikidata contributors**: Explore the `P_linkid` property proposal (UC-5)
- **Community / policy folks**: Discuss governance — who controls the resolver? How does this interact with WMF's data sovereignty requirements?
- **Curious attendees**: Come to the demo, ask hard questions, give feedback

No prior knowledge of LinkID is required. The use cases folder in the repo provides full context.

---

## Resources

- **GitHub** (specs, SDKs, use cases): https://github.com/Link-Genetic-Inc/lid
- **Wikimedia use cases**: https://github.com/Link-Genetic-Inc/lid/tree/main/Wikimedia%20Hackathon%202026
- **W3C Community Group**: https://www.w3.org/community/linkid/
- **Loom demo**: https://www.loom.com/share/614350752f0d426ca943db03b4aea24b
- **Resolver** (live): https://resolver.linkgenetic.com
- **JS SDK**: `npm install @linkgenetic/client`
- **Python SDK**: `pip install linkid-client`

---

## Looking for Help With

- A MediaWiki sandbox instance to test the `{{cite web}}` integration
- Feedback from anyone familiar with the Citation Style 1 Lua module
- Introductions to the InternetArchiveBot maintainers
- Anyone who has previously proposed a Wikidata property and can advise on the process for `P_linkid`

---

## Notes on Governance & Deployment

LinkID is designed for flexible deployment. For Wikimedia's use, it can run:
- **Fully on WMF infrastructure** — no external resolver dependency
- Under the **LPIL (Public Interest License)** — free for Wikimedia, libraries, universities, and government
- With **full data sovereignty** — no network flows leave WMF infrastructure

This is not a product pitch. The goal is to work with the community to define what a trustworthy, open, Wikimedia-governed reference persistence layer should look like.
