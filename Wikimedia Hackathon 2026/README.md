# LinkID & LinkManager for Wikimedia

> **Wikimedia Hackathon 2026 · Milan, May 1–3**
> Phabricator Task: [T422252 – Improving Wikipedia Reference Integrity with Persistent LinkIDs](https://phabricator.wikimedia.org/T422252)

This folder documents use cases for integrating LinkID and LinkManager into the Wikimedia ecosystem, addressing two core failure modes in Wikipedia's reference infrastructure:

| Problem | Description |
|---------|-------------|
| **Link Rot** | URLs that no longer resolve (404, domain expired, server gone) |
| **Content Drift** | URLs that still resolve but whose content has changed or is unrelated to the original citation |

---

## How the Two Products Address These Problems

| | **LinkManager** | **LinkID** |
|---|---|---|
| **What it protects** | Documents and websites — monitors and repairs URLs *inside* existing content (Wikipedia articles, PDFs, web pages) | LinkIDs themselves — a `linkid:` identifier never rots or drifts because the resolver always tracks the current state |
| **Link Rot** | Detects broken URLs in Wikipedia articles; repairs them automatically or proposes fixes | A `linkid:` never breaks — the resolver redirects to the current location |
| **Content Drift** | Detects when content at a cited URL has changed significantly | Resolver surfaces content changes for a registered `linkid:` |
| **Approach** | Reactive + proactive monitoring of existing URLs | Structural prevention — replaces fragile URLs with persistent identifiers |

---

## Use Cases

### LinkManager — Monitoring & Repair of URLs in Wikipedia

> LinkManager monitors URLs inside Wikipedia articles (the "document") and repairs link rot and content drift.

| # | Use Case |
|---|----------|
| [UC-1](./linkmanager/uc-1-link-rot-detection.md) | Link Rot Detection & Automated Healing |
| [UC-2](./linkmanager/uc-2-content-drift-alerting.md) | Content Drift Alerting for Existing Citations |
| [UC-6](./linkmanager/uc-6-bot-assisted-migration.md) | Bot-Assisted Migration of Legacy References |

### LinkID — Persistent Identifiers for Wikipedia Citations

> LinkID replaces fragile URLs with persistent `linkid:` identifiers — so references never rot or drift at the structural level.

| # | Use Case |
|---|----------|
| [UC-3](./linkid/uc-3-cite-web-template.md) | LinkID Integration in the `{{cite web}}` Template |
| [UC-4](./linkid/uc-4-reference-archival.md) | Reference Archival at Citation Time |
| [UC-5](./linkid/uc-5-wikidata-identifiers.md) | Persistent Reference Identifiers in Wikidata |

### Combined — LinkManager + LinkID Working Together

> UC-6 is the bridge: LinkManager identifies broken URLs in legacy articles; LinkID permanently replaces them. UC-7 extends this across language editions and sister projects.

| # | Use Case |
|---|----------|
| [UC-6](./linkmanager/uc-6-bot-assisted-migration.md) | Bot-Assisted Migration (LinkManager detects → LinkID replaces) |
| [UC-7](./combined/uc-7-interwiki-resilience.md) | Cross-Wiki and Interwiki Reference Resilience |

---

## Scope for the Hackathon

During the Wikimedia Hackathon 2026, the focus will be on:

1. **Demonstrating** UC-1 (LinkManager) and UC-3 (LinkID) with a working prototype on a test Wikipedia instance
2. **Discussing** the governance and deployment model with the Wikimedia technical community
3. **Collecting feedback** on the LinkID resolver API and MediaWiki extension concept
4. **Exploring** integration paths with existing infrastructure (InternetArchiveBot, Citoid, Wikidata)

---

## Contact & Resources

- Hackathon task: [phabricator.wikimedia.org/T422252](https://phabricator.wikimedia.org/T422252)
- GitHub: [github.com/Link-Genetic-Inc/lid](https://github.com/Link-Genetic-Inc/lid)
- Demo (LinkManager × Wikipedia): [linkmanager.linkgenetic.com/integrations/wikipedia](https://linkmanager.linkgenetic.com/integrations/wikipedia)
- Loom walkthrough: [loom.com/share/614350752f0d426ca943db03b4aea24b](https://www.loom.com/share/614350752f0d426ca943db03b4aea24b)
- Contact: Christian Nyffenegger · [linkgenetic.com](https://linkgenetic.com)
