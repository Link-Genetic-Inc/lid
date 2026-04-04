# C-3 · Legislative Reference Lifecycle

**Products**: LinkID + LinkManager  
**Sector**: Government  
**Status**: Draft

---

## Problem

Legislation has a uniquely demanding reference integrity requirement: it must be verifiable not just today, but for as long as the law is in force — and often for decades after repeal. A reference in a law enacted in 2010 must be accessible and provably unchanged in 2040.

This requires two things that no current system provides together:

1. **Prospective integrity** (LinkID): references in legislation enacted today must remain resolvable indefinitely
2. **Retrospective repair** (LinkManager): references in existing legislation — decades of enacted law — are already decaying and need systematic monitoring and repair

The stakes are higher than in most other sectors. Broken references in legislation do not just inconvenience readers — they undermine legal certainty, impede compliance, and compromise democratic accountability.

---

## Solution: LinkID + LinkManager

### New Legislation (LinkID)

Every external reference in newly drafted legislation is assigned a `linkid:` identifier at the drafting stage. The identifier is embedded in the structured XML of the bill and carried through to the enacted text.

```xml
<!-- LegalDocML / Akoma Ntoso with LinkID -->
<ref href="linkid:2e8d3c1a-91f4-4b77-a503-c6d7e8f90123"
     showAs="WHO Technical Standard 2024">
  WHO Technical Standard on Infectious Disease Reporting (2024)
</ref>
```

The resolver guarantees that this reference remains accessible throughout the law's lifetime — automatically redirecting to the current location of the document, or to a verified archived copy.

### Existing Legislation (LinkManager)

LinkManager monitors all external URLs in the existing legislative corpus — every enacted law, regulation, and statutory instrument on the national gazette or official portal.

When a link breaks:
- The Internet Archive is queried for a snapshot taken near the date of enactment
- If found: an archive substitute is proposed, with a certified chain of custody
- If not found: the responsible ministry is alerted; an emergency archival request is filed

### The Legislative Reference Archive

The combination of LinkID and LinkManager creates a **Legislative Reference Archive**: a verified, time-stamped record of what every external reference in every law contained at the moment of enactment. This archive serves as the authoritative source for legal interpretation and compliance verification.

```
Query: what did Article 4(2) of Regulation 2021/XXX cite, as enacted?
Answer: linkid:UUID → snapshot dated 2021-03-15 → certified hash → content
```

---

## Actors

| Actor | Role |
|-------|------|
| Legislative Drafter | Assigns LinkIDs to references during drafting |
| Official Gazette / Publication System | Embeds LinkIDs in published legislation; triggers monitoring |
| Ministry / Regulatory Agency | Receives alerts for broken links in their legislation; approves repairs |
| Parliament / Legislative Archive | Maintains the Legislative Reference Archive; governs resolver |
| LinkID Resolver | Maintains reference mappings; serves resolution requests |
| LinkManager | Monitors all legislative corpus URLs; detects failures; proposes repairs |
| Court / Legal Practitioner | Queries Legislative Reference Archive for certified snapshots |
| Citizen | Can follow and verify references in enacted law |

---

## Flow

```
NEW LEGISLATION (LinkID):
1. Drafter cites external source
2. Drafting system → LinkID API → linkid:UUID assigned + snapshot taken
3. Bill enacted → linkid:UUID in official gazette XML
4. Source URL breaks → resolver auto-updates mapping → citizens unaffected
5. LinkManager monitors source URL → confirms resolver mapping is current

EXISTING LEGISLATION (LinkManager):
1. LinkManager ingests legislative corpus via official gazette API / sitemap
2. URL inventory extracted from all enacted texts
3. Scheduled monitoring: weekly checks
4. Broken link detected:
   a. Wayback Machine queried for snapshot near enactment date
   b. Snapshot found → certified archive entry created in Legislative Reference Archive
   c. No snapshot → ministry alerted; emergency archival request filed
5. Legislative Reference Archive updated with repair record

LEGAL / AUDIT QUERY:
1. Practitioner queries: what did linkid:UUID contain on 2021-03-15?
2. Legislative Reference Archive returns:
   - Certified snapshot content
   - SHA-256 hash (proves integrity)
   - Chain of custody log
   - Original enactment date and gazette reference
```

---

## Benefits

- **Legal certainty**: legislative references verifiable for the full lifetime of the law
- **Democratic accountability**: citizens can always follow the evidence base for enacted law
- **Compliance clarity**: regulated entities can verify what standards they are required to meet
- **Judicial reliability**: courts can access certified snapshots for interpretive purposes
- **Sovereignty**: resolver and archive operated by parliament or national archive — no commercial dependency

---

## Deployment Considerations

| Consideration | Detail |
|---------------|--------|
| **Resolver hosting** | Parliament or national archive infrastructure |
| **Archive governance** | Parliamentary archive as custodian of Legislative Reference Archive |
| **License** | LPIL — free for government and parliament |
| **XML integration** | Akoma Ntoso, LegalDocML, EUR-Lex (ELI/ECLI compatible) |
| **Retention** | Indefinite — legislative references must survive the law |
| **Certification** | Cryptographic hashing + chain of custody for all snapshots |

---

## Open Questions

- What body should govern the Legislative Reference Archive — the parliament, the national archive, or a joint committee?
- How should the system handle references to international law or EU directives, which are governed by external bodies?
- What legal status should certified snapshots have — are they admissible as evidence in court proceedings?
- How does this interact with existing EU legal identifier systems (ELI, ECLI) and the EUR-Lex platform?
- Should the resolver expose a public API for citizen and journalist access, or be restricted to official users?

---

## Related

- [LID-3 · Persistent Identifiers for Legislative References](../linkid/lid-3-legislation-references.md)
- [LM-3 · Link Integrity in Government Policy Documents](../linkmanager/lm-3-policy-documents.md)
- [LM-4 · Reference Compliance in Public Procurement](../linkmanager/lm-4-public-procurement.md)
