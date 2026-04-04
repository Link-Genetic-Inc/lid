# UC-2 · Content Drift Alerting for Existing Citations

**Category**: Reference Integrity  
**Priority**: High  
**Hackathon Demo**: 🔲 Stretch goal

---

## Problem

A URL may remain reachable for years while the content at that address changes substantially — or entirely. A Wikipedia article cites a source for a specific claim; later, the same URL hosts unrelated content, a retracted version, or even a contradicting statement. The citation *looks* valid but is semantically broken.

This is harder to detect than link rot because HTTP returns `200 OK`. Neither editors, bots, nor readers have an easy mechanism to notice the drift.

**Example**:
```
A 2019 Wikipedia article cites https://health-institute.org/report/obesity-rates
to support a specific statistical claim.

In 2024, the institute restructures its site. The URL now points to a
general overview page with no statistics — but still returns 200 OK.
The citation is silently misleading.
```

---

## Solution with LinkID

When a LinkID is registered, the resolver stores a **content fingerprint** (hash of the canonical text content) of the resource at registration time. Periodically, the resolver re-fetches the resource and compares:

- **Hash match**: content unchanged — no action
- **Minor diff** (< threshold): flagged as "potentially updated" — logged
- **Major diff** (> threshold): flagged as "content drift detected" — alert generated
- **Semantic drift** (optional, AI-assisted): meaning has changed relative to the original claim

Editors and bots can query the resolver for drift alerts and decide whether to update, revert, or archive the citation.

```
GET /api/v1/resolve/7e96f229-21c3-4a3d-a6cf-ef7d8dd70f24/status

{
  "linkid": "linkid:7e96f229-...",
  "status": "DRIFT_DETECTED",
  "original_hash": "sha256:a3f9...",
  "current_hash":  "sha256:b72c...",
  "drift_score": 0.83,
  "registered_at": "2019-04-12T10:30:00Z",
  "checked_at":    "2026-03-01T08:00:00Z",
  "archived_url":  "https://web.archive.org/web/20190412/..."
}
```

---

## Actors

| Actor | Role |
|-------|------|
| LinkID Resolver | Monitors registered resources, computes drift scores |
| Wikipedia Maintenance Bot | Queries resolver for drift alerts, tags affected articles |
| Wikipedia Editor | Reviews flagged citations and decides on corrective action |
| Reader | May see a "citation health" indicator on the reference |

---

## Flow

```
1. URL registered at citation time (see UC-1)
2. Resolver re-checks URL on schedule (e.g. monthly)
3. Drift score computed:
   a. score < 0.2 → no action
   b. score 0.2–0.6 → logged, available via API
   c. score > 0.6 → "DRIFT_DETECTED" status set
4. Maintenance bot queries /api/drift-alerts
5. Bot adds {{citation needs review}} tag to affected Wikipedia articles
6. Editors review and update citations as needed
```

---

## Benefits

- Surfaces a class of reference failure that is currently invisible
- Enables proactive reference maintenance rather than reader-reported errors
- Drift score API is open — third-party tools and bots can build on it
- Archived snapshots serve as ground truth for what the source said at citation time

---

## Open Questions for Hackathon

- What threshold defines "significant" content drift in the context of Wikipedia citations?
- Should drift detection be purely syntactic (hash/diff) or include semantic analysis?
- Who receives drift alerts — the original editor, the article watchlist, a dedicated maintenance project?
- Privacy: does storing content hashes of external resources raise any policy concerns for WMF?

---

## Related

- [UC-1 · Link Rot Detection & Automated Healing](./uc-1-link-rot-detection.md)
- [UC-4 · Reference Archival at Citation Time](./uc-4-reference-archival.md)
