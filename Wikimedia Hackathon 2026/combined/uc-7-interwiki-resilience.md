# UC-7 · Cross-Wiki and Interwiki Reference Resilience

**Products**: LinkManager + LinkID (Combined)  
**Problems**: Link Rot · Content Drift  
**Priority**: Low–Medium  
**Hackathon Demo**: 🔲 Discussion topic

---

## Problem

Wikipedia exists in over 300 languages. Many smaller-language Wikipedias reuse references from English Wikipedia or from each other — often by manually copying URLs. When the source URL breaks, the same reference failure propagates silently across multiple language editions, each of which must independently detect and repair it.

Furthermore, Wikimedia sister projects (Wikisource, Wikivoyage, Wiktionary, Wikinews) all use references but have different citation conventions and no shared reference health infrastructure.

---

## Solution with LinkID

Because a LinkID is language- and platform-agnostic, the same `linkid:UUID` can be shared across:
- Multiple language editions of Wikipedia
- Sister projects (Wikisource, Wikivoyage, etc.)
- External consumers of Wikimedia content (mirrors, re-users, AI training datasets)

A single registration event covers the reference for all reuse contexts:

```
English Wikipedia:   {{cite web |url=https://... |linkid=linkid:7e96f229-...}}
French Wikipedia:    {{cite web |url=https://... |linkid=linkid:7e96f229-...}}
German Wikipedia:    {{cite web |url=https://... |linkid=linkid:7e96f229-...}}
Wikisource:          <ref linkid="linkid:7e96f229-...">...</ref>
```

If the source URL breaks or drifts, a single resolver fix propagates automatically to *all* usages — without requiring bot runs on each language edition separately.

---

## Cross-Wiki Reference Deduplication

A secondary benefit: if two language editions independently cite the same source, comparing their `|linkid=` values can reveal that they reference the same underlying resource — enabling:

- Shared reference quality signals across Wikis
- Detection of translation chains (FR article cites same source as EN article → likely a translation)
- A global reference health dashboard across the entire Wikimedia ecosystem

---

## Integration with Abstract Wikipedia / Wikifunctions

[Abstract Wikipedia](https://meta.wikimedia.org/wiki/Abstract_Wikipedia) aims to generate Wikipedia articles in any language from a single structured content layer. References in that layer would naturally benefit from persistent identifiers — a `linkid:` reference is inherently language-neutral and can be rendered into any language edition's citation format.

---

## Actors

| Actor | Role |
|-------|------|
| Any Wikipedia editor (any language) | Adds `\|linkid=` to a citation once; all wikis benefit |
| LinkID Resolver | Single source of truth for reference health across all wikis |
| Cross-wiki bot | Can detect shared references and propagate LinkIDs to other editions |
| Abstract Wikipedia layer | Stores LinkIDs as part of language-neutral content representation |

---

## Open Questions for Hackathon

- Is there existing infrastructure for cross-wiki reference sharing that LinkID could plug into?
- How does this interact with the Cognate extension used for cross-wiki Wiktionary entries?
- What governance body would own the "canonical" LinkID for a shared reference across wikis?
- Could Wikidata serve as the registry for cross-wiki shared LinkIDs (building on UC-5)?

---

## Related

- [UC-5 · Persistent Reference Identifiers in Wikidata](../linkid/uc-5-wikidata-identifiers.md)
- [UC-3 · `{{cite web}}` Template Integration](../linkid/uc-3-cite-web-template.md)
