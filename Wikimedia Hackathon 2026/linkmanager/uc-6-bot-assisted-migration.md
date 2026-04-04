# UC-6 · Bot-Assisted Migration of Legacy References

**Products**: LinkManager + LinkID (Combined)  
**Problems**: Link Rot · Content Drift  
**Priority**: Medium  
**Hackathon Demo**: 🔲 Stretch goal

---

## Problem

Wikipedia has hundreds of millions of existing citations using raw, fragile URLs — with no persistent identifier and no monitoring. Even with LinkID deployed for all new citations, the legacy corpus remains vulnerable. And even with LinkManager monitoring URLs reactively, a healed archive URL is still a static fix — the next time the URL breaks, the same repair cycle repeats.

A scalable, permanent solution for legacy references requires both products working together:

1. **LinkManager** identifies which legacy citations are broken, at risk, or already drifted
2. **LinkID** permanently replaces the fragile raw URL with a persistent `linkid:` — so future breaks are handled automatically by the resolver

This is the migration bridge between the reactive world (LinkManager) and the structural solution (LinkID).

---

## Solution: LinkManager + LinkID

### Phase 1 — LinkManager: Identify & Prioritise

LinkManager scans the Wikipedia article corpus and produces a prioritised inventory of citations needing migration:

| Priority | Criteria |
|----------|----------|
| 1 (highest) | Citations already broken (404, dead) |
| 2 | Citations with detected content drift |
| 3 | Citations in Featured Articles and Good Articles |
| 4 | Citations with high reader traffic |
| 5 | All remaining citations (long-tail) |

### Phase 2 — LinkID: Register & Replace

A MediaWiki bot processes the prioritised list:

1. For each citation URL, calls the LinkID registration API
2. Receives a `linkid:UUID` + content snapshot
3. Edits the article to add `|linkid=linkid:UUID` to the citation template
4. Optionally populates `|archive-url=` and `|archive-date=` from the snapshot

```
Bot workflow:
FOR EACH article (LinkManager priority order):
  FOR EACH {{cite web}} flagged by LinkManager:
    url = extract |url= parameter
    linkid = POST /api/v1/register { url }         ← LinkID
    ADD |linkid=linkid:UUID to template
    IF snapshot available:
      ADD |archive-url= and |archive-date=
  SAVE edit: "Bot: migrated legacy citations to LinkID (UC-6, T422252)"
```

### After Migration

Once a citation has a `linkid:`, future URL changes are handled automatically by the LinkID resolver — no further bot intervention needed. LinkManager continues to monitor the underlying URLs to keep resolver mappings current.

---

## Actors

| Actor | Role |
|-------|------|
| LinkManager | Scans corpus; identifies and prioritises citations needing migration |
| LinkID API | Registers URLs; returns `linkid:UUID` + snapshot |
| Migration Bot | Reads LinkManager output; calls LinkID API; edits Wikipedia articles |
| Wikipedia Editor | Reviews and approves bot edits where required |
| LinkID Resolver | Handles all future resolution for migrated citations |

---

## Flow

```
PHASE 1 — LINKMANAGER:
1. LinkManager ingests Wikipedia article corpus
2. Crawls all cited URLs → detects broken, drifted, at-risk citations
3. Outputs prioritised migration queue

PHASE 2 — LINKID + BOT:
4. Bot reads migration queue (highest priority first)
5. For each citation URL:
   a. POST /api/v1/register → linkid:UUID + snapshot
   b. Article edited: |linkid= added; |archive-url= populated if available
6. Edit saved with standard bot summary
7. LinkManager continues monitoring underlying URLs
   → updates LinkID resolver mappings if URLs change further
```

---

## Benefits

- **Permanent fix**: once migrated to `linkid:`, future URL changes handled by resolver automatically
- **Prioritised**: LinkManager ensures the most critical citations are migrated first
- **No reader disruption**: migration is additive — existing `|url=` retained as fallback
- **Closes the loop**: combines reactive repair (LinkManager) with structural prevention (LinkID)
- **Scalable**: bot can process millions of citations systematically

---

## Relationship to Other Use Cases

| Use Case | Role |
|----------|------|
| UC-1 (LinkManager) | Detects and heals broken URLs reactively — inputs the migration priority queue |
| UC-2 (LinkManager) | Detects content drift — flags citations most urgently needing LinkID migration |
| UC-3 (LinkID) | Handles new citations going forward — UC-6 brings legacy citations up to the same standard |

---

## Open Questions for Hackathon

- What is the bot approval process at English Wikipedia for this type of additive citation edit?
- Should the bot run on Wikimedia Cloud Services (Toolforge)?
- Rate limits: how many LinkID registrations per day is feasible without burdening the resolver?
- Should this be a new bot or a patch to InternetArchiveBot?
- Should LinkManager's migration queue be exposed as a public API for third-party bots?

---

## Related

- [UC-1 · Link Rot Detection & Automated Healing](./uc-1-link-rot-detection.md)
- [UC-2 · Content Drift Alerting](./uc-2-content-drift-alerting.md)
- [UC-3 · LinkID Integration in `{{cite web}}`](../linkid/uc-3-cite-web-template.md)
- [UC-7 · Cross-Wiki and Interwiki Reference Resilience](../combined/uc-7-interwiki-resilience.md)
