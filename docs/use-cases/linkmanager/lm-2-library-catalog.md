# LM-2 · Reference Health Monitoring in Library Catalogs

**Product**: LinkManager  
**Sector**: Libraries  
**Status**: Draft

---

## Problem

Modern library catalogs contain tens of thousands of records linking to external digital resources — e-journals, open access repositories, digitised collections, and licensed databases. Librarians invest significant effort in creating and curating these records. But once created, links are rarely re-checked systematically.

When a link breaks, it is typically discovered by a patron who reports it. The librarian then manually investigates and repairs it. This reactive model does not scale: a library with 50,000 external links cannot rely on patron reports as its primary quality assurance mechanism.

The result is a catalog that appears complete and authoritative but silently degrades over time — eroding patron trust and undermining the library's core mission of providing reliable access to knowledge.

**Example**:
```
A public library's catalog contains 12,000 records with external links,
added over 15 years by dozens of catalogers. No systematic health
monitoring exists. A patron survey reveals that roughly 1 in 8 links
fails to resolve — but the catalog shows no indication of this.
```

---

## Solution with LinkManager

LinkManager integrates with the library's catalog system to provide continuous health monitoring of all external links. It surfaces broken links in a librarian dashboard, proposes repairs, and tracks the catalog's link health over time.

### Monitoring
- Scheduled crawls of all external URLs in the catalog
- Per-link status tracking: live, redirected, archived, dead
- Content drift detection: URL resolves but content has changed significantly

### Dashboard
Librarians see:
- An overall link health score for the catalog
- A prioritised list of broken links (by patron traffic, recency, collection importance)
- Suggested repairs for each broken link (updated URL, archive substitute, or "requires review")
- Batch repair tools for systematic fixes

### Reporting
- Monthly health reports for collection managers
- Trend analysis: is link rot accelerating or slowing?
- Collection-level breakdown: which subject areas have the highest link rot rates?

---

## Actors

| Actor | Role |
|-------|------|
| Cataloger | Adds external links; LinkManager begins monitoring automatically |
| Librarian | Reviews dashboard, approves or applies repairs |
| Collection Manager | Reviews health reports, sets monitoring priorities |
| LinkManager | Crawls catalog URLs, classifies failures, proposes repairs |
| Patron | Benefits from maintained link integrity |

---

## Flow

```
1. LinkManager connects to catalog via API or OAI-PMH
2. URL inventory extracted from all records with external links
3. Scheduled crawls run (configurable: daily, weekly, monthly)
4. For each URL:
   a. Live → no action
   b. Redirected → log new URL; propose catalog update
   c. Archived → propose archive URL substitution
   d. Dead → flag in dashboard with priority score
   e. Drifted → flag for human review
5. Librarian reviews dashboard:
   a. Accepts proposed repairs → applied to catalog record
   b. Rejects → marks as reviewed, snoozes alert
6. Monthly health report generated and distributed to collection managers
```

---

## Benefits

- **Patron trust**: catalog links reliably resolve — broken links no longer reach patrons undetected
- **Cataloger efficiency**: maintenance burden shifts from reactive to systematic and manageable
- **Collection intelligence**: health metrics reveal which collections are most at risk
- **ILS compatibility**: designed to integrate with Ex Libris Alma, Koha, FOLIO, and other major platforms
- **Prioritisation**: high-traffic records are checked and repaired first

---

## Open Questions

- What crawl frequency is appropriate for a large public library catalog without triggering rate limits on external servers?
- How should LinkManager handle links to licensed content that requires authentication?
- Should patron-reported broken links feed directly into the LinkManager dashboard?
- What is the right metric for a "link health score" — pure availability, or weighted by patron traffic?

---

## Related

- [LM-1 · Broken Link Detection in Institutional Repositories](./lm-1-institutional-repository.md)
- [LID-2 · Stable References in Library Digital Collections](../linkid/lid-2-digital-collections.md)
- [C-2 · National Library Reference Infrastructure](../combined/c-2-national-library.md)
