# LM-1 · Broken Link Detection in Institutional Repositories

**Product**: LinkManager  
**Sector**: Academia  
**Status**: Draft

---

## Problem

Institutional repositories (IRs) host thousands of research outputs — theses, preprints, datasets, technical reports. Each item typically includes outgoing links: references to related work, cited datasets, supplementary materials, and external tools. Over time, these links decay.

Most IR platforms have no active link monitoring. Broken links are discovered accidentally — by a patron who reports an error, or by a researcher who cannot replicate a study. There is no systematic, scalable process for detecting and repairing link rot across a repository of tens of thousands of items.

The administrative burden of manual checking is prohibitive. And without a detection system, the problem compounds silently year after year.

**Example**:
```
A thesis deposited in 2018 contains 120 references, 34 of which
include URLs. By 2025, 11 of those URLs are broken. The IR platform
has no mechanism to detect this. Readers encounter errors
with no explanation or alternative.
```

---

## Solution with LinkManager

LinkManager continuously monitors all outgoing links across the institutional repository. It detects broken links, classifies the failure type, and proposes or applies repairs — automatically where possible, with human review where needed.

### Detection
LinkManager crawls all URLs in the repository on a configurable schedule, checking:
- HTTP status (404, 410, 5xx, timeout)
- Redirect chains (temporary vs. permanent, redirect loops)
- Content availability (soft 404 — page loads but content is missing)

### Classification
Each broken link is classified by failure type:

| Type | Description | Suggested Action |
|------|-------------|-----------------|
| `MOVED` | Resource exists at a new URL | Auto-update link |
| `ARCHIVED` | Resource unavailable; Wayback copy exists | Substitute archive URL |
| `DEAD` | Resource gone, no archive found | Flag for manual review |
| `SOFT_404` | Page loads but content missing | Flag for human verification |
| `PAYWALLED` | Previously open, now behind paywall | Flag with note |

### Repair
- **Automatic**: confirmed moves and archive substitutions applied without human intervention
- **Assisted**: proposed repairs surfaced in a review dashboard for librarian approval
- **Batch**: repair actions applied across all items sharing the same broken URL

---

## Actors

| Actor | Role |
|-------|------|
| Repository Administrator | Configures LinkManager, reviews dashboard, approves batch repairs |
| Librarian | Reviews flagged items, applies manual fixes where needed |
| LinkManager | Crawls URLs, classifies failures, proposes/applies repairs |
| Internet Archive | Source for archived snapshots used in repair |
| Researcher / Patron | Benefits from maintained link integrity without visibility into the process |

---

## Flow

```
1. LinkManager ingests repository URL inventory (via OAI-PMH, REST API, or sitemap)
2. Crawl runs on schedule (e.g. weekly):
   a. Each URL checked for availability and content
   b. Failures classified by type
3. For MOVED links: resolver confirms new URL → auto-repair applied
4. For ARCHIVED links: Wayback API consulted → archive URL substituted
5. For DEAD / SOFT_404: item flagged in dashboard for librarian review
6. Monthly report generated: link health score, repairs applied, items needing attention
7. Repository metadata updated with repaired URLs
```

---

## Benefits

- **Proactive maintenance**: broken links caught and repaired before patrons encounter them
- **Scale**: thousands of URLs monitored automatically — no manual checking required
- **Audit trail**: every detection and repair event logged with timestamp and rationale
- **Repository reputation**: link integrity score becomes a quality signal for the institution
- **Integration**: works with existing IR platforms (DSpace, EPrints, Invenio, Figshare)

---

## Open Questions

- What crawl frequency is appropriate without placing undue load on external servers?
- How should LinkManager handle links to paywalled content that was previously open access?
- What is the right escalation path when a broken link cannot be repaired automatically?
- Should repair actions be applied directly to repository metadata, or proposed as edit suggestions?

---

## Related

- [LM-2 · Reference Health Monitoring in Library Catalogs](./lm-2-library-catalog.md)
- [LID-1 · Persistent Citations in Academic Publishing](../linkid/lid-1-research-citations.md)
- [C-1 · Full Research Citation Lifecycle](../combined/c-1-research-lifecycle.md)
