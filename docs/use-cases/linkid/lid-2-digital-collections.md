# LID-2 · Stable References in Library Digital Collections

**Product**: LinkID  
**Sector**: Libraries  
**Status**: Draft

---

## Problem

Libraries maintain digital collections that link to external resources — journal articles, datasets, digitised materials, institutional repositories, and open access publications. These external links are embedded in catalog records, finding aids, reading lists, and subject guides.

The library's own catalog is curated and stable. The external resources it points to are not. When an external URL breaks, the library's carefully maintained record becomes misleading — it implies a resource exists and is reachable, when it does not.

For patrons, this erodes trust. For librarians, it creates a perpetual maintenance burden with no scalable solution under current URL-based linking.

**Example**:
```
A subject guide maintained by a university library links to:
https://open-access-journal.org/volume/12/article/445

The journal transitions to a new publisher. The old URL returns 404.
The subject guide, last updated two years ago, still shows the broken link.
The patron cannot access the resource.
```

---

## Solution with LinkID

When a librarian adds an external link to a catalog record or subject guide, the URL is registered with the LinkID resolver. A `linkid:` identifier is stored in the catalog system alongside (or instead of) the raw URL.

The library's catalog rendering layer resolves LinkIDs transparently — patrons always see a working link, regardless of where the underlying resource has moved.

```
Catalog record (internal):
  identifier: linkid:9c3b2a1f-44e7-4f82-b119-d7c8a0f56789
  original_url: https://open-access-journal.org/volume/12/article/445

Patron view (rendered):
  [Access resource] → resolver → current URL or archived copy
```

---

## Actors

| Actor | Role |
|-------|------|
| Librarian | Adds external links; LinkID assigned at point of cataloging |
| Library Catalog System (ILS/LMS) | Stores `linkid:` identifiers, renders as resolved links |
| LinkID Resolver | Maintains mappings, monitors availability, archives snapshots |
| Patron | Follows links; always reaches a valid resource |
| Collection Manager | Monitors collection-wide link health via resolver API |

---

## Flow

```
1. Librarian adds external URL to catalog record or subject guide
2. Catalog system calls LinkID API → receives linkid:UUID
3. linkid:UUID stored in catalog metadata
4. Patron browses catalog → clicks link
5. Catalog renders linkid:UUID as resolved URL (transparent)
6. Resolver redirects to:
   a. Current live resource
   b. Moved resource (updated mapping)
   c. Archived snapshot (if unavailable)
7. Collection manager queries /api/health for collection-wide status report
```

---

## Benefits

- **Patron experience**: no more dead links in the catalog
- **Librarian efficiency**: link maintenance becomes monitoring, not manual fixing
- **Long-term integrity**: digital collections remain navigable as the web changes
- **Audit trail**: every external link has a verifiable registration date and content snapshot
- **Standards alignment**: compatible with MARC, Dublin Core, and Schema.org metadata schemas

---

## Open Questions

- Which ILS/LMS systems should be prioritised for integration (Ex Libris Alma, Koha, FOLIO)?
- Should LinkID registration be triggered by the cataloger or automated via a batch process for existing records?
- How should the resolver handle resources that are paywalled or access-controlled?
- What is the right retention policy for archived snapshots — especially for copyrighted content?

---

## Related

- [LID-1 · Persistent Citations in Academic Publishing](./lid-1-research-citations.md)
- [LM-2 · Reference Health Monitoring in Library Catalogs](../linkmanager/lm-2-library-catalog.md)
- [C-2 · National Library Reference Infrastructure](../combined/c-2-national-library.md)
