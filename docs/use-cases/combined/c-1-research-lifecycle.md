# C-1 · Full Research Citation Lifecycle

**Products**: LinkID + LinkManager  
**Sector**: Academia  
**Status**: Draft

---

## Problem

Research citation integrity has two distinct failure modes that require different solutions:

1. **Future-proofing** (LinkID): new citations need persistent identifiers so they remain resolvable indefinitely
2. **Legacy repair** (LinkManager): existing citations in published papers, theses, and repositories are already broken and need systematic detection and repair

Neither solution alone is sufficient. A journal that only deploys LinkID for new submissions still has decades of back-catalogue with decaying citations. A repository that only deploys LinkManager is constantly repairing damage rather than preventing it.

The full research citation lifecycle requires both layers working together.

---

## Solution: LinkID + LinkManager

### At Submission (LinkID)
When a new paper is submitted, all cited URLs are registered with the LinkID resolver. Each receives a `linkid:` identifier embedded in the paper's reference list. Future readers always reach a valid resource.

### In the Repository (LinkManager)
LinkManager continuously monitors:
- **New papers**: the underlying URLs behind their LinkIDs (the resolver handles resolution, but the source URL must remain monitorable)
- **Legacy papers**: all outgoing URLs in the existing back-catalogue, including pre-LinkID submissions

When a source URL breaks:
- For **LinkID-registered** citations: the resolver mapping is updated automatically → readers are unaffected
- For **legacy** citations: LinkManager proposes a repair (updated URL or archive substitute) for librarian/editor review

### Combined Value
```
New citation:
  Author cites URL → LinkID assigned → linkid:UUID in paper
  Reader clicks → resolver → always valid (LinkID handles this)
  URL breaks → resolver auto-updates mapping → reader still unaffected
  LinkManager monitors → confirms resolver mapping is current

Legacy citation:
  Old paper cites raw URL (no LinkID)
  URL breaks → LinkManager detects → proposes repair
  Librarian approves → raw URL updated in record
  (Optionally: LinkID retroactively assigned to repaired URL)
```

---

## Actors

| Actor | Role |
|-------|------|
| Author | Submits paper; LinkIDs assigned automatically |
| Journal / Platform | Integrates LinkID at submission; deploys LinkManager for monitoring |
| Librarian / Repository Manager | Reviews LinkManager dashboard; approves legacy repairs |
| LinkID Resolver | Maintains mappings for new submissions; auto-updates on URL changes |
| LinkManager | Monitors all URLs (new and legacy); detects failures; proposes repairs |
| Researcher / Reader | Always reaches valid resources — new or legacy |

---

## Flow

```
NEW SUBMISSIONS:
1. Author submits paper with URLs
2. Submission system → LinkID API → linkid:UUIDs assigned
3. Paper published with linkid:UUIDs
4. Source URL breaks → resolver auto-updates → reader unaffected
5. LinkManager monitors source URL → confirms resolver mapping

LEGACY BACK-CATALOGUE:
1. LinkManager ingests URL inventory from repository (OAI-PMH/API)
2. Crawl detects broken URLs in legacy papers
3. For each broken URL:
   a. Archive snapshot found → proposes substitution
   b. No snapshot → flags for manual review
4. Librarian approves repair → record updated
5. Optionally: LinkID retroactively assigned to repaired URL
   → future breaks handled automatically going forward
```

---

## Benefits

- **Complete coverage**: new and legacy citations protected under a single framework
- **Graduated adoption**: institutions can start with LinkManager for legacy repair, then add LinkID for new submissions
- **No reader disruption**: broken links resolved before patrons encounter them
- **Retroactive upgrade path**: legacy citations can be progressively migrated to LinkID
- **Institutional metrics**: single dashboard showing citation health across the entire collection — new and legacy

---

## Deployment Model

| Phase | Product | Action |
|-------|---------|--------|
| 1 | LinkManager | Deploy for legacy back-catalogue monitoring and repair |
| 2 | LinkID | Integrate into submission workflow for new papers |
| 3 | LinkID + LinkManager | Run together; legacy citations progressively migrated to LinkID |

Phase 1 delivers immediate value with no changes to author workflow.
Phase 2 prevents future decay.
Phase 3 closes the loop entirely.

---

## Open Questions

- At what point in the submission workflow should LinkID registration occur — at submission, at acceptance, or at publication?
- Should retroactive LinkID assignment for repaired legacy citations be automatic or require author/editor consent?
- How should the system handle citations to resources that have been formally retracted?
- What metrics should an institution track to measure the success of a combined deployment?

---

## Related

- [LID-1 · Persistent Citations in Academic Publishing](../linkid/lid-1-research-citations.md)
- [LM-1 · Broken Link Detection in Institutional Repositories](../linkmanager/lm-1-institutional-repository.md)
- [C-2 · National Library Reference Infrastructure](./c-2-national-library.md)
