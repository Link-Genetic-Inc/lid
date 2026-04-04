# UC-2 · Content Drift Alerting for Existing Citations

**Product**: LinkManager  
**Problem**: Content Drift  
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

## Solution with LinkManager

LinkManager monitors not just the *availability* of cited URLs, but also their *content*. When a URL inside a Wikipedia article still resolves but its content has changed significantly, LinkManager raises an alert.

### How Drift is Detected

When LinkManager first indexes a cited URL, it stores a **content fingerprint** (hash of the canonical text content). On each subsequent crawl, it re-fetches the resource and computes a **drift score**:

| Drift Score | Status | Action |
|-------------|--------|--------|
| < 0.2 | Content unchanged | No action |
| 0.2 – 0.6 | Minor update | Logged; available via dashboard |
| > 0.6 | **DRIFT\_DETECTED** | Alert generated; article flagged |

```
URL: https://health-institute.org/report/obesity-rates  →  STATUS: 200 OK

LinkManager drift check:
  original_hash: sha256:a3f9...  (indexed 2019-04-12)
  current_hash:  sha256:b72c...  (checked 2026-03-01)
  drift_score:   0.83
  status:        DRIFT_DETECTED
  action:        {{citation needs review}} tag added to article
```

### Drift Alert API

Maintenance bots and editors can query LinkManager's drift alerts programmatically:

```
GET /api/v1/articles/{article}/citations/drift-alerts

[
  {
    "url": "https://health-institute.org/report/obesity-rates",
    "drift_score": 0.83,
    "first_indexed": "2019-04-12",
    "last_checked": "2026-03-01",
    "archived_url": "https://web.archive.org/web/20190412/..."
  }
]
```

---

## Actors

| Actor | Role |
|-------|------|
| LinkManager | Monitors content at all cited URLs in Wikipedia articles; computes drift scores |
| Wikipedia Maintenance Bot | Queries LinkManager drift API; tags affected articles |
| Wikipedia Editor | Reviews flagged citations; decides whether to update, revert, or archive |
| Reader | May see a "citation health" indicator on the reference |

---

## Flow

```
1. LinkManager indexes cited URL → stores content fingerprint
2. Scheduled re-crawl (e.g. monthly):
   a. URL re-fetched → new content hash computed
   b. Drift score calculated
3. Drift score thresholds applied:
   a. score < 0.2 → no action
   b. score 0.2–0.6 → logged in dashboard
   c. score > 0.6 → DRIFT_DETECTED status set
4. Maintenance bot queries /api/drift-alerts
5. Bot adds {{citation needs review}} to affected Wikipedia articles
6. Editor reviews:
   a. Source still valid → dismiss alert
   b. Source has drifted → update citation or substitute archive URL
```

---

## Benefits

- Surfaces a class of reference failure that is currently invisible to all existing tools
- Enables proactive reference maintenance rather than reader-reported errors
- Drift alert API is open — third-party tools and bots can build on it
- Archived snapshots serve as ground truth for what the source said at citation time

---

## Relationship to LinkID (UC-4)

LinkManager detects content drift in existing cited URLs **reactively**. LinkID (UC-4) prevents drift **structurally** — by anchoring a `linkid:` identifier to the specific content snapshot at citation time. If the content at the URL changes, the LinkID resolver can surface this and always return the original version.

- **LinkManager**: monitors existing URLs in Wikipedia articles; alerts on drift
- **LinkID**: anchors new citations to a specific content version; drift is surfaced via resolver status

---

## Open Questions for Hackathon

- What threshold defines "significant" content drift in the context of Wikipedia citations?
- Should drift detection be purely syntactic (hash/diff) or include semantic analysis (AI-assisted)?
- Who receives drift alerts — the original editor, the article watchlist, or a dedicated maintenance project?
- Does storing content fingerprints of external resources raise policy concerns for WMF?

---

## Related

- [UC-1 · Link Rot Detection & Automated Healing](./uc-1-link-rot-detection.md)
- [UC-6 · Bot-Assisted Migration](./uc-6-bot-assisted-migration.md)
- [UC-4 · Reference Archival at Citation Time](../linkid/uc-4-reference-archival.md)
