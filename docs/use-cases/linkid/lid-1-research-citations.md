# LID-1 · Persistent Citations in Academic Publishing

**Product**: LinkID  
**Sector**: Academia  
**Status**: Draft

---

## Problem

Academic papers cite hundreds of sources. Over time, those sources move — journals restructure their URLs, preprint servers migrate, institutional pages are retired. A published paper's reference list begins to decay the moment it is published.

This is not a marginal problem. Studies consistently show that a significant percentage of URLs cited in academic papers are unreachable within five years of publication. For researchers attempting to reproduce results or trace an intellectual lineage, a broken citation is a closed door.

Existing solutions (DOIs, handles) work well for formally published content but leave a large share of cited resources uncovered: grey literature, datasets, blog posts, institutional reports, working papers, government publications, and web-based tools.

**Example**:
```
A 2021 paper cites a methodology document hosted at:
https://methodology-institute.org/docs/v2/framework.pdf

By 2025, the institute has restructured its website.
The URL returns 404. The methodology cannot be retrieved.
Reproduction of the study is compromised.
```

---

## Solution with LinkID

At submission or publication time, all cited URLs are registered with a LinkID resolver. Each receives a stable `linkid:` identifier that is embedded in the paper's reference list alongside (or instead of) the raw URL.

```
Traditional:
  [12] Smith et al. (2021). Framework v2. https://methodology-institute.org/docs/v2/framework.pdf

With LinkID:
  [12] Smith et al. (2021). Framework v2. linkid:4a7f1c2d-88b3-4e91-a002-f3c9d0e12345
       → resolver redirects to current location or archived snapshot
```

The resolver:
1. Maintains the mapping from `linkid:UUID` to the current URL
2. Stores a content snapshot at registration time
3. Detects if the resource moves and updates the mapping
4. Falls back to the snapshot if the resource becomes unavailable

---

## Actors

| Actor | Role |
|-------|------|
| Author | Submits paper; LinkIDs assigned automatically at submission |
| Journal / Preprint Platform | Integrates LinkID registration into submission workflow |
| LinkID Resolver | Maintains mappings, monitors availability, provides fallback |
| Researcher / Reader | Follows citations; always reaches a valid resource |
| Librarian | Can query resolver for citation health across a collection |

---

## Flow

```
1. Author submits paper with reference list containing URLs
2. Journal submission system calls LinkID API for each URL
3. Resolver registers URLs, creates snapshots, returns linkid:UUIDs
4. Published paper includes linkid:UUIDs in reference list
5. Reader clicks citation → LinkID resolver resolves to:
   a. Current live URL (if available)
   b. Updated URL (if resource moved)
   c. Archived snapshot (if resource unavailable)
6. Resolver logs resolution event; citation health is auditable
```

---

## Benefits

- **Reproducibility**: cited resources remain accessible long after publication
- **Coverage**: fills the gap left by DOIs — covers any web resource, not just formally published content
- **Transparency**: resolver status (live / moved / archived) is machine-queryable
- **Compatibility**: `linkid:` coexists with DOIs and handles — not a replacement
- **Decentralised**: institutions can run their own resolver nodes

---

## Open Questions

- Should LinkID registration be mandatory at submission, optional, or author-initiated?
- What is the right governance model for the resolver used by academic publishers?
- How should LinkIDs appear in citation formats (APA, MLA, Vancouver, BibTeX)?
- Who bears responsibility for resolver uptime — publisher, institution, or a shared infrastructure?

---

## Related

- [LID-2 · Stable References in Library Digital Collections](./lid-2-digital-collections.md)
- [C-1 · Full Research Citation Lifecycle (LinkID + LinkManager)](../combined/c-1-research-lifecycle.md)
- [LM-1 · Broken Link Detection in Institutional Repositories](../linkmanager/lm-1-institutional-repository.md)
