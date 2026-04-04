# LID-3 · Persistent Identifiers for Legislative References

**Product**: LinkID  
**Sector**: Government  
**Status**: Draft

---

## Problem

Legislation, regulations, and official government documents routinely reference external sources — scientific reports, technical standards, EU directives, international treaties, agency guidance documents, and statistical data. These references are part of the legal record: they justify decisions, establish evidentiary bases, and define compliance requirements.

When referenced URLs break, the legal integrity of the document is undermined. Judges, lawyers, regulators, and citizens attempting to interpret a law cannot verify the basis on which it was enacted. In some jurisdictions, this creates genuine legal uncertainty.

Government websites are restructured with every change of administration. Ministries are renamed, merged, or dissolved. Domains change. The documents survive — but their URLs do not.

**Example**:
```
A regulation enacted in 2019 cites a technical standard at:
https://standards-body.gov/technical/EN-ISO-12345-2018.pdf

In 2023, the standards body migrates to a new platform.
The URL no longer resolves. Legal practitioners cannot access
the normative reference that defines compliance requirements.
```

---

## Solution with LinkID

Each external reference in a legislative document is assigned a `linkid:` identifier at the time of drafting or enactment. The identifier is embedded in the machine-readable version of the legislation (e.g., Akoma Ntoso XML, LegalDocML) and rendered as a stable link in published formats.

```xml
<!-- Akoma Ntoso with LinkID -->
<ref href="linkid:2e8d3c1a-91f4-4b77-a503-c6d7e8f90123"
     showAs="EN-ISO-12345-2018 Technical Standard">
  EN-ISO-12345-2018
</ref>
```

The resolver guarantees that the reference remains accessible — to the original document if available, or to a verified archived copy otherwise.

---

## Actors

| Actor | Role |
|-------|------|
| Legislative Drafter | Embeds LinkIDs in legislation at drafting stage |
| Official Gazette / Publication System | Renders `linkid:` as stable hyperlinks in published text |
| LinkID Resolver | Maintains mappings, monitors availability, archives snapshots |
| Legal Practitioner / Citizen | Follows references; always reaches the cited document |
| Parliamentary Archive | Uses LinkIDs to maintain long-term citability of legislative record |

---

## Flow

```
1. Drafter cites external source in legislation text
2. Drafting system calls LinkID API → receives linkid:UUID
3. linkid:UUID embedded in structured legislation XML
4. Official gazette publishes legislation with resolved links
5. Reader follows reference → resolver redirects to:
   a. Current official document (if available)
   b. Archived certified copy (if moved or removed)
6. Resolver provides status metadata:
   - registration date (= date of enactment reference)
   - content hash (cryptographic proof of original document)
   - archive URL (Wayback Machine or national archive)
```

---

## Benefits

- **Legal certainty**: normative references remain verifiable over decades
- **Transparency**: citizens and practitioners can always access the basis for legislative decisions
- **Archival alignment**: works alongside national digital archives and parliamentary records
- **Machine-readable**: compatible with Akoma Ntoso, LegalDocML, and EU legislation standards (ELI, ECLI)
- **Sovereignty**: resolver can be operated by national archive or parliament — no external dependency

---

## Open Questions

- Which legislative XML standards should be prioritised for LinkID integration (Akoma Ntoso, LegalDocML, EUR-Lex)?
- Who operates the resolver for government use — the national archive, the parliament, or a shared EU infrastructure?
- How should conflicts be handled when a referenced standard is formally superseded (not just the URL changes, but the normative content)?
- What is the relationship between LinkIDs and existing European legal identifiers (ELI, ECLI)?

---

## Related

- [LID-4 · Stable Dataset Identifiers in Open Data Portals](./lid-4-open-data-portals.md)
- [LM-3 · Link Integrity in Government Policy Documents](../linkmanager/lm-3-policy-documents.md)
- [C-3 · Legislative Reference Lifecycle](../combined/c-3-legislation-lifecycle.md)
