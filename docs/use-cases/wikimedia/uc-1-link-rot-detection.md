# UC-1 · Link Rot Detection & Automated Healing

**Category**: Reference Integrity  
**Priority**: High  
**Hackathon Demo**: ✅ Planned

---

## Problem

When a cited URL returns a 4xx/5xx error or the domain has expired, the reference becomes a dead end for readers and editors. Wikipedia currently relies on periodic bot sweeps (e.g. InternetArchiveBot) to detect and patch broken links — but this is reactive, slow, and loses the original semantic identity of the reference.

**Example**:
```
<ref>{{cite web |url=https://example-journal.org/paper/12345 |title=Study on X}}</ref>
```
Six months later, `example-journal.org` migrates to a new domain. The URL returns 404. The citation is silently broken.

---

## Solution with LinkID

At citation time, the URL is registered with the LinkID resolver. The resolver:
1. Assigns a stable `linkid:` identifier to the reference
2. Stores the original URL, resolved content hash, and snapshot
3. Monitors the URL for availability and content changes

If the URL breaks, the resolver automatically falls back to:
- A redirect (if the resource moved and left a forwarding record)
- A Web Archive snapshot anchored to the original publication date
- A flagged "unavailable" state with metadata for human review

```
linkid:7e96f229-21c3-4a3d-a6cf-ef7d8dd70f24
  → originally: https://example-journal.org/paper/12345
  → fallback:   https://web.archive.org/web/20231015/https://example-journal.org/paper/12345
  → status:     HEALED (auto-redirect to archive)
```

---

## Actors

| Actor | Role |
|-------|------|
| Wikipedia Editor | Creates citation with URL; LinkID is assigned automatically |
| MediaWiki Extension | Intercepts `{{cite web}}` and registers URL with resolver |
| LinkID Resolver | Monitors URL, detects rot, resolves to best available version |
| Reader | Follows reference link; always reaches a valid resource |
| Maintenance Bot | Optionally updates raw wikitext with `linkid:` for transparency |

---

## Flow

```
1. Editor adds {{cite web |url=https://... }}
2. MediaWiki extension calls LinkID API → registers URL → receives linkid:UUID
3. linkid:UUID is stored alongside the citation (in wikitext or page metadata)
4. Reader clicks reference → request hits LinkID resolver
5. Resolver checks live URL:
   a. If alive: redirects to live URL (transparent)
   b. If dead:  redirects to archived snapshot + sets status header
6. Resolver logs resolution event for analytics
```

---

## Benefits

- Zero disruption for editors: workflow unchanged, LinkID assigned silently
- Readers always reach *something* rather than a blank 404
- Audit trail: every resolution event is logged and inspectable
- Complements InternetArchiveBot rather than replacing it

---

## Open Questions for Hackathon

- Should the `linkid:` URI appear visibly in wikitext, or remain invisible (stored in page metadata)?
- What is the right MediaWiki hook to intercept citation rendering?
- Consent/governance: who controls the resolver endpoint used by Wikipedia?

---

## Related

- [UC-3 · `{{cite web}}` Template Integration](./uc-3-cite-web-template.md)
- [UC-4 · Reference Archival at Citation Time](./uc-4-reference-archival.md)
- [UC-6 · Bot-Assisted Migration of Legacy References](./uc-6-bot-assisted-migration.md)
