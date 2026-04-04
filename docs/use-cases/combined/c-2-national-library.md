# C-2 · National Library Reference Infrastructure

**Products**: LinkID + LinkManager  
**Sector**: Libraries  
**Status**: Draft

---

## Problem

A national library operates at a scale and with a mandate that amplifies every link integrity challenge:

- **Scale**: millions of catalog records, finding aids, and digital collection items with external links
- **Mandate**: the national library is expected to be the authoritative, permanent reference point for the nation's knowledge heritage — broken links undermine this mission directly
- **Longevity**: records created decades ago must remain navigable; records created today must remain navigable for decades to come
- **Inter-institutional reach**: the national library's catalog is used by universities, public libraries, schools, and researchers across the country — link failures propagate to all of them

No reactive or manual approach is viable at this scale. A national library needs an infrastructure layer, not a maintenance process.

---

## Solution: LinkID + LinkManager

The national library deploys LinkID and LinkManager as complementary infrastructure layers:

**LinkID** provides persistent identifiers for all external references — ensuring that links created today remain valid regardless of how the web changes over the coming decades.

**LinkManager** provides active monitoring and repair for the existing catalog — the millions of records created before LinkID, whose links are already decaying.

Together, they form a **national reference infrastructure** that can be extended to member libraries across the country.

### National Resolver Node

The national library operates its own LinkID resolver node — ensuring data sovereignty and long-term institutional control. Member libraries (universities, public libraries) resolve identifiers through the national node, with no dependency on commercial resolvers.

```
Member library catalog record:
  linkid:8b2f4a9c-33d1-4e55-a007-b9c0d1e23456

Resolution:
  → national resolver node (operated by national library)
  → current URL or archived snapshot
  → resolution event logged for national catalog analytics
```

### Shared Monitoring

LinkManager monitoring can be offered as a service to member libraries — a national library monitoring consortium where smaller institutions benefit from centralised detection and repair infrastructure without bearing the full operational cost themselves.

---

## Actors

| Actor | Role |
|-------|------|
| National Library Cataloger | Adds records; LinkID assigned automatically |
| National Library Digital Team | Operates resolver node; oversees LinkManager deployment |
| Member Library | Resolves LinkIDs via national node; benefits from shared monitoring |
| Researcher / Patron | Accesses catalog from any member institution; always reaches valid resources |
| LinkID Resolver (national node) | Maintains mappings; serves resolution requests for all member libraries |
| LinkManager | Monitors national catalog URLs; surfaces repairs to digital team |
| National Archive | Provides archival snapshots for resources that cannot be recovered otherwise |

---

## Flow

```
CATALOGING (LinkID):
1. Cataloger adds external URL to record
2. Catalog system → national LinkID resolver → linkid:UUID assigned
3. linkid:UUID stored in MARC/Dublin Core/BIBFRAME record
4. Member libraries inherit linkid:UUID via Z39.50 or shared catalog

MONITORING (LinkManager):
1. LinkManager ingests full catalog URL inventory
2. Scheduled crawls detect broken links across all records
3. National digital team reviews dashboard by collection / member library
4. Repairs proposed and approved centrally; propagated to member library catalogs

MEMBER LIBRARY RESOLUTION:
1. Patron at member library clicks catalog link
2. Request hits national resolver node
3. Resolver returns current URL or archived snapshot
4. Resolution event logged for national analytics
```

---

## Benefits

- **National mandate fulfilled**: the authoritative reference point for national knowledge heritage remains navigable
- **Data sovereignty**: resolver operated by the national library — no external commercial dependency
- **Consortium model**: smaller member libraries gain link integrity infrastructure at marginal cost
- **Interoperability**: LinkIDs compatible with BIBFRAME, Schema.org, and international library standards (IFLA LRM)
- **Long-term planning**: resolver governance and sustainability planned at the institutional level, not dependent on a commercial vendor's continuity

---

## Deployment Considerations

| Consideration | Detail |
|---------------|--------|
| **Resolver hosting** | On-premise within national library infrastructure |
| **License** | LPIL (Public Interest License) — free for national libraries |
| **Integration** | MARC21, BIBFRAME, Dublin Core, OAI-PMH |
| **Member library onboarding** | Z39.50 / SRU integration; shared catalog update protocol |
| **Governance** | National library as resolver operator; consortium steering committee |

---

## Open Questions

- Should the national resolver node federate with international library resolver networks (OCLC, national library alliances)?
- What is the right governance model for a library consortium resolver — national library as sole operator, or a multi-institution steering body?
- How should the resolver handle records from member libraries that disagree on the canonical URL for a shared resource?
- What BIBFRAME / Schema.org property should carry the `linkid:` identifier in linked data representations?

---

## Related

- [LID-2 · Stable References in Library Digital Collections](../linkid/lid-2-digital-collections.md)
- [LM-2 · Reference Health Monitoring in Library Catalogs](../linkmanager/lm-2-library-catalog.md)
- [C-1 · Full Research Citation Lifecycle](./c-1-research-lifecycle.md)
