# LinkID Use Cases for Wikimedia

> **Wikimedia Hackathon 2026 · Milan, May 1–3**
> Phabricator Task: [T422252 – Improving Wikipedia Reference Integrity with Persistent LinkIDs](https://phabricator.wikimedia.org/T422252)

This folder documents concrete use cases for integrating LinkID into the Wikimedia ecosystem. Each use case addresses a specific failure mode in Wikipedia's reference infrastructure and describes how a persistent identifier layer can resolve it.

## The Core Problem

Wikipedia's reliability depends on its references — yet a significant share of those references are broken or silently misleading:

- **Link Rot**: URLs that no longer resolve (404, domain expired, server gone)
- **Content Drift**: URLs that still resolve but now point to changed or unrelated content
- **Version Opacity**: No mechanism to anchor a citation to the specific version of a resource that was consulted

These are not edge cases. Studies have shown that tens of millions of Wikipedia references are affected. The problem compounds over time.

## How LinkID Helps

```
Traditional:  Wikipedia article → URL → Resource  (breaks or drifts silently)
With LinkID:  Wikipedia article → LinkID → Resolver → Current or archived resource
```

A LinkID decouples the *identity* of a reference from its *physical location*. The resolver always returns the best available version — live, redirected, or archived — and surfaces metadata about content changes since the original citation.

## Use Cases

| # | Use Case | Status |
|---|----------|--------|
| [UC-1](./uc-1-link-rot-detection.md) | Link Rot Detection & Automated Healing | Draft |
| [UC-2](./uc-2-content-drift-alerting.md) | Content Drift Alerting for Existing Citations | Draft |
| [UC-3](./uc-3-cite-web-template.md) | LinkID Integration in the `{{cite web}}` Template | Draft |
| [UC-4](./uc-4-reference-archival.md) | Reference Archival at Citation Time | Draft |
| [UC-5](./uc-5-wikidata-identifiers.md) | Persistent Reference Identifiers in Wikidata | Draft |
| [UC-6](./uc-6-bot-assisted-migration.md) | Bot-Assisted Migration of Legacy References | Draft |
| [UC-7](./uc-7-interwiki-resilience.md) | Cross-Wiki and Interwiki Reference Resilience | Draft |

## Scope for the Hackathon

During the Wikimedia Hackathon 2026, the focus will be on:

1. **Demonstrating** UC-1 and UC-3 with a working prototype on a test Wikipedia instance
2. **Discussing** the governance and deployment model with the Wikimedia technical community
3. **Collecting feedback** on the LinkID resolver API and MediaWiki extension concept
4. **Exploring** integration paths with existing infrastructure (InternetArchiveBot, Citoid, Wikidata)

## Contact & Contributing

- Hackathon task: [phabricator.wikimedia.org/T422252](https://phabricator.wikimedia.org/T422252)
- Project: [github.com/Link-Genetic-Inc/lid](https://github.com/Link-Genetic-Inc/lid)
- Demo: [LinkManager × Wikipedia integration](https://linkmanager.linkgenetic.com/integrations/wikipedia) · [Loom walkthrough](https://www.loom.com/share/614350752f0d426ca943db03b4aea24b)
- Contact: Christian Nyffenegger · [linkgenetic.com](https://linkgenetic.com)

Contributions, questions, and counter-proposals are welcome — open an issue or join the `#wmhack` channel during the hackathon.
