# T422252 · Improving Wikipedia Reference Integrity with Persistent LinkIDs

**Project tag**: Wikimedia-Hackathon-2026  
**Type**: Project / Working Session + Demo  
**Presenter**: Christian Nyffenegger (Link Genetic GmbH)  
**Contact**: hackathon@linkgenetic.com  
**Demo** (LinkManager × Wikipedia): https://linkmanager.linkgenetic.com/integrations/wikipedia  
**Loom walkthrough**: https://www.loom.com/share/614350752f0d426ca943db03b4aea24b  
**Use Cases**: https://github.com/Link-Genetic-Inc/lid/tree/main/Wikimedia%20Hackathon%202026

---

## Summary

Wikipedia's references are its epistemic backbone — and a significant share of them are broken or silently misleading due to **link rot** (broken URLs) and **content drift** (URLs that resolve but whose content has changed).

This project addresses both failure modes at two levels, using two complementary products:

| Product | Role in Wikipedia |
|---------|------------------|
| **LinkManager** | Monitors URLs inside Wikipedia articles (the "document") — detects link rot and content drift, repairs them automatically or proposes fixes |
| **LinkID** | Replaces fragile URLs with persistent `linkid:` identifiers — so references never rot or drift at the structural level |

During the hackathon, we will prototype a MediaWiki integration for both products, discuss governance and deployment models with the community, and explore how they complement existing tools like InternetArchiveBot and Citoid.

---

## The Problem

| Failure Mode | Description | Scale |
|---|---|---|
| **Link rot** | URL returns 404 / domain expired | Tens of millions of Wikipedia references |
| **Content drift** | URL resolves but content has changed | Hard to detect; pervasive |
| **Version opacity** | No anchor to the version consulted at citation time | Universal |

Current mitigations (InternetArchiveBot, manual archiving) are reactive and incomplete. They treat symptoms, not the underlying structural fragility.

---

## The Two-Layer Solution

```
Problem:   Wikipedia article → URL → Resource  (breaks or drifts silently)

Layer 1 — LinkManager:
           Wikipedia article → URL → LinkManager monitors → detects rot/drift → repairs

Layer 2 — LinkID:
           Wikipedia article → linkid:UUID → Resolver → Current or archived resource (always works)

Bridge — UC-6:
           LinkManager identifies broken legacy URLs → LinkID permanently replaces them
```

### LinkManager
- Monitors all URLs inside Wikipedia articles on a continuous schedule
- Detects link rot (404, dead domains) and content drift (content changed at same URL)
- Automatically heals broken links via archive substitution or redirect detection
- Surfaces drift alerts for editor review via API and maintenance bot integration

### LinkID
- Assigns a stable `linkid:UUID` to each citation at creation time
- The identifier resolves to the current best available version — live, redirected, or archived
- Content snapshots anchored to citation date prevent version opacity
- Deployable fully on WMF infrastructure — no external dependency

LinkID is:
- An open specification (W3C Community Group: https://github.com/WICG/proposals/issues/238)
- Available under a Public Interest License (LPIL) for Wikimedia's use
- Deployable fully on WMF infrastructure (no external dependency required)

---

## Hackathon Goals

### Must (demo-ready by closing showcase)
- [ ] **UC-1** (LinkManager): Live demo of link rot detection and automatic healing
- [ ] **UC-3** (LinkID): Working `{{cite web}}` template extension with `|linkid=` parameter on a MediaWiki sandbox

### Should (working prototype or clear design)
- [ ] **UC-2** (LinkManager): Content drift alerting API design and demo
- [ ] **UC-6** (Combined): Design for bot-assisted migration — LinkManager identifies → LinkID replaces

### Could (discussion + community feedback)
- [ ] **UC-4** (LinkID): Reference archival triggered at registration time
- [ ] **UC-5** (LinkID): Wikidata property proposal for `P_linkid`
- [ ] **UC-7** (Combined): Cross-wiki and interwiki reference resilience model
- [ ] **UC-8** (Combined): Wikipedia as LLM training data — reference health annotation layer for AI training corpora

---

## Use Case Overview

| # | Use Case | Product | Problem |
|---|----------|---------|---------|
| UC-1 | Link Rot Detection & Automated Healing | LinkManager | Link Rot |
| UC-2 | Content Drift Alerting | LinkManager | Content Drift |
| UC-3 | `{{cite web}}` Template Integration | LinkID | Link Rot + Content Drift |
| UC-4 | Reference Archival at Citation Time | LinkID | Link Rot + Content Drift |
| UC-5 | Persistent Reference Identifiers in Wikidata | LinkID | Link Rot + Content Drift |
| UC-6 | Bot-Assisted Migration of Legacy References | Combined | Link Rot + Content Drift |
| UC-7 | Cross-Wiki and Interwiki Reference Resilience | Combined | Link Rot + Content Drift |
| UC-8 | Wikipedia as LLM Training Data — Reference Integrity at AI Scale | Combined | Link Rot + Content Drift |

Full use case details: https://github.com/Link-Genetic-Inc/lid/tree/main/Wikimedia%20Hackathon%202026

---

## What Participants Will Do

This is a hands-on working session, open to anyone interested in:

- **MediaWiki / Lua / PHP developers**: Help prototype the `{{cite web}}` extension (UC-3) and the LinkManager monitoring hook
- **Bot operators**: Discuss the migration bot design (UC-6) and InternetArchiveBot integration path
- **Wikidata contributors**: Explore the `P_linkid` property proposal (UC-5)
- **Community / policy folks**: Discuss governance — who controls the resolver? How does this interact with WMF's data sovereignty requirements?
- **Curious attendees**: Come to the demo, ask hard questions, give feedback

No prior knowledge of LinkID or LinkManager is required. The use cases folder in the repo provides full context.

---

## Resources

- **GitHub** (specs, SDKs, use cases): https://github.com/Link-Genetic-Inc/lid
- **Wikimedia use cases**: https://github.com/Link-Genetic-Inc/lid/tree/main/Wikimedia%20Hackathon%202026
- **Demo** (LinkManager × Wikipedia): https://linkmanager.linkgenetic.com/integrations/wikipedia
- **Loom walkthrough**: https://www.loom.com/share/614350752f0d426ca943db03b4aea24b
- **W3C Community Group**: https://github.com/WICG/proposals/issues/238
- **Resolver** (live): https://linkid.io
- **JS SDK**: `npm install @linkgenetic/client`
- **Python SDK**: `pip install linkid-client`

---

## Looking for Help With

- A MediaWiki sandbox instance to test the `{{cite web}}` and LinkManager integrations
- Feedback from anyone familiar with the Citation Style 1 Lua module
- Introductions to the InternetArchiveBot maintainers
- Anyone who has previously proposed a Wikidata property and can advise on the process for `P_linkid`

---

## Notes on Governance & Deployment

Both LinkManager and LinkID are designed for flexible deployment. For Wikimedia's use, they can run:
- **Fully on WMF infrastructure** — no external resolver or monitoring dependency
- Under the **LPIL (Public Interest License)** — free for Wikimedia, libraries, universities, and government
- With **full data sovereignty** — no network flows leave WMF infrastructure

This is not a product pitch. The goal is to work with the community to define what a trustworthy, open, Wikimedia-governed reference resilience layer should look like.
