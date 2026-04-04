# UC-5 · Persistent Reference Identifiers in Wikidata

**Category**: Structured Data / Wikidata  
**Priority**: Medium  
**Hackathon Demo**: 🔲 Discussion topic

---

## Problem

Wikidata items use `P854` (reference URL) to link claims to their source. These URLs suffer the same link rot and content drift problems as Wikipedia citations — but the issue is compounded by Wikidata's machine-readable nature: broken reference URLs silently degrade the quality of structured data consumed by thousands of downstream applications.

Additionally, Wikidata has no standard mechanism to record *which version* of a source was consulted when a claim was made, or to detect when a reference URL's content has changed in a way that might invalidate the claim.

---

## Solution with LinkID

Introduce a new Wikidata property — proposed as **`P_linkid`** (pending assignment) — to store LinkIDs alongside existing reference URLs:

```
Q42 (Douglas Adams) 
  → P569 (date of birth): 11 March 1952
    ↳ reference:
        P854 (reference URL): https://example-bio.org/adams
        P_linkid (LinkID):    linkid:7e96f229-21c3-4a3d-a6cf-ef7d8dd70f24
        P813 (retrieved):     2026-01-15
```

The LinkID provides:
- A stable, dereferenceable identifier for the reference independent of URL changes
- A content snapshot anchored to the retrieval date (`P813`)
- A machine-queryable endpoint to check reference health (alive / healed / drifted / dead)

---

## SPARQL Integration

Once LinkIDs are stored in Wikidata, the Wikidata Query Service can surface reference health data:

```sparql
SELECT ?item ?itemLabel ?refUrl ?linkid WHERE {
  ?item p:P569 ?statement.
  ?statement prov:wasDerivedFrom ?ref.
  ?ref pr:P854 ?refUrl.
  ?ref pr:Pxxxxxx ?linkid.   # LinkID property
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
}
```

A companion service could annotate SPARQL results with resolver status — enabling queries like "all Wikidata claims whose reference URL has drifted since citation."

---

## Benefits

- Wikidata's reference infrastructure gains the same resilience as Wikipedia citations
- Structured data consumers (search engines, knowledge graphs, AI training sets) can rely on verifiable, persistent references
- Enables longitudinal studies: "has the source for this claim changed over time?"
- Natural extension of existing Wikidata reference model — `P_linkid` is purely additive

---

## Governance Considerations

- A new Wikidata property requires community consensus via the property proposal process
- The property should be generic enough to accommodate multiple LinkID resolver implementations (not vendor-locked to Link Genetic)
- The resolver endpoint used could be configurable per-statement or per-dataset

---

## Open Questions for Hackathon

- Is the community open to a `P_linkid` property, or should LinkIDs be stored in a different way (e.g. as qualifiers, or in a dedicated reference scheme)?
- Should the Wikidata Query Service natively resolve LinkIDs, or should that remain a third-party layer?
- How does this interact with the existing `P813` (retrieved) and `P1065` (archive URL) properties?

---

## Related

- [UC-1 · Link Rot Detection & Automated Healing](./uc-1-link-rot-detection.md)
- [UC-2 · Content Drift Alerting](./uc-2-content-drift-alerting.md)
