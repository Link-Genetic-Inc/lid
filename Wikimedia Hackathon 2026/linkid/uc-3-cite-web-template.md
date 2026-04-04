# UC-3 · LinkID Integration in the `{{cite web}}` Template

**Product**: LinkID  
**Problems**: Link Rot · Content Drift  
**Priority**: High  
**Hackathon Demo**: ✅ Planned

---

## Problem

`{{cite web}}` is one of the most widely used templates on English Wikipedia, invoked hundreds of millions of times across articles. It currently accepts a `|url=` parameter with no persistence guarantee. There is no standardized mechanism to:

- Register a URL for monitoring at citation time
- Store a content snapshot anchored to the moment of citation
- Express a persistent identifier alongside or instead of a raw URL

The absence of this mechanism means that every new citation created today is a new fragility added to Wikipedia's knowledge base.

---

## Solution with LinkID

Extend `{{cite web}}` (and related templates: `{{cite news}}`, `{{cite journal}}`, `{{cite report}}`) with an optional `|linkid=` parameter:

```wikitext
{{cite web
 |url     = https://example.org/article
 |title   = Study on X
 |date    = 2026-01-15
 |linkid  = linkid:7e96f229-21c3-4a3d-a6cf-ef7d8dd70f24
}}
```

When `|linkid=` is present, the template renderer resolves the LinkID to the current best available URL at read time, rather than rendering the raw `|url=` directly.

### Auto-registration Workflow (optional enhancement)

A MediaWiki extension or Citoid integration could automatically register the URL and populate `|linkid=` when an editor submits a new citation — making the process entirely transparent.

```
Editor adds URL in Visual Editor citation dialog
  → Citoid fetches metadata (as today)
  → Extension calls LinkID API: POST /api/v1/register { url: "https://..." }
  → API returns linkid:UUID
  → Template saved with |linkid=linkid:UUID
  → |url= retained as human-readable fallback
```

---

## Template Parameter Design

| Parameter | Description | Example |
|-----------|-------------|---------|
| `\|linkid=` | Persistent LinkID for this reference | `linkid:7e96f229-...` |
| `\|url=` | Original URL (retained as fallback and for display) | `https://example.org/...` |
| `\|linkid-status=` | Optional: surfaced by bot after drift/rot detection | `healed`, `drifted` |

The `|linkid=` parameter is purely additive — no change to existing template behavior when absent.

---

## Rendering Behavior

| Scenario | Rendered link |
|----------|--------------|
| `\|linkid=` present, resource alive | Resolves via LinkID → live URL (transparent to reader) |
| `\|linkid=` present, resource moved | Resolves via LinkID → redirect (transparent) |
| `\|linkid=` present, resource dead | Resolves via LinkID → archived snapshot |
| `\|linkid=` absent | Existing behavior (raw `\|url=` rendered directly) |

---

## Actors

| Actor | Role |
|-------|------|
| Wikipedia Editor | Uses `{{cite web}}` as today; optionally adds `\|linkid=` |
| Citoid / VisualEditor | Can auto-populate `\|linkid=` at citation creation time |
| Template Module (Lua) | Resolves LinkID at render time or passes it to the HTML layer |
| Reader | Sees a reliable reference link; optionally sees a health indicator |
| Maintenance Bot | Can backfill `\|linkid=` on existing citations |

---

## Implementation Notes

The minimal viable implementation for the hackathon requires:

1. **A MediaWiki Lua module** that, when `|linkid=` is present, generates an `<a href="https://linkid.io/resolve/UUID">` link instead of the raw URL
2. **A test installation** on a MediaWiki sandbox to demonstrate end-to-end resolution
3. Optionally: a **userscript** in the Visual Editor that calls the LinkID API on URL entry

No changes to existing templates are required for the demo — the module can be tested in isolation.

---

## Open Questions for Hackathon

- Should resolution happen server-side (Lua/PHP) or client-side (JS)?  Server-side is cleaner but requires MediaWiki to make outbound HTTP calls.
- Is there an existing MediaWiki hook that fires when a citation URL is rendered?
- What is the policy process for adding a new parameter to high-traffic templates like `{{cite web}}`?
- Should `|linkid=` be added to the Citation Style 1 module or handled by a separate extension?

---

## Related

- [UC-1 · Link Rot Detection & Automated Healing](../linkmanager/uc-1-link-rot-detection.md)
- [UC-4 · Reference Archival at Citation Time](./uc-4-reference-archival.md)
- [UC-6 · Bot-Assisted Migration of Legacy References](../linkmanager/uc-6-bot-assisted-migration.md)
