# LM-4 · Reference Compliance in Public Procurement

**Product**: LinkManager  
**Sector**: Government  
**Status**: Draft

---

## Problem

Public procurement documents — tender specifications, contract notices, evaluation criteria, and awarded contract records — frequently reference external standards, regulations, technical specifications, and supplier documentation. These references define compliance requirements: a supplier must conform to what the document says it must conform to.

When a referenced URL breaks, the compliance requirement becomes ambiguous. Which version of the standard applied? What did the specification actually say at the time of award? In contested procurement proceedings, this ambiguity has legal and financial consequences.

Additionally, procurement portals must publish awarded contract information that remains accessible and verifiable for statutory audit periods — often 7–10 years. Over that timeframe, significant link decay is almost certain without active management.

**Example**:
```
A contract notice for IT infrastructure references a cybersecurity standard at:
https://standards-agency.gov/cybersecurity/framework-v3.pdf

The contract is awarded. Two years later, during an audit, the
referenced standard URL is broken. The auditor cannot verify
what compliance requirements the contractor was held to.
The procurement authority faces challenge.
```

---

## Solution with LinkManager

LinkManager monitors all external references in procurement documents throughout the statutory retention period. It ensures that every referenced standard, regulation, or specification remains accessible — either at its current URL or via a verified archived snapshot — for the full audit lifecycle.

### At Publication
- LinkManager scans the document and records all external URLs
- Each URL is immediately archived (snapshot taken)
- A link health baseline is established

### During Contract Lifecycle
- Continuous monitoring of all referenced URLs
- Broken links detected and repaired (archive substitution) without altering the original document's stated reference
- Audit log maintained: what did each URL contain at each point in time?

### At Audit
- Auditor can query LinkManager for the state of any referenced URL at any historical point
- Certified snapshots available as evidence: "this is what the standard said at the time of contract award"

---

## Actors

| Actor | Role |
|-------|------|
| Procurement Officer | Publishes tender/contract documents; LinkManager monitors automatically |
| Contracting Authority | Receives alerts for broken links in active contract documents |
| Auditor | Queries LinkManager for historical URL state and certified snapshots |
| LinkManager | Monitors URLs, archives content, maintains audit log |
| Supplier / Contractor | Benefits from clear, verifiable compliance requirements |
| Legal Counsel | Uses LinkManager audit log in procurement challenge proceedings |

---

## Flow

```
1. Procurement document published
2. LinkManager scans document → extracts all external URLs
3. Immediate archival snapshot taken for each URL
4. Monitoring begins: weekly checks throughout contract lifecycle
5. Broken link detected:
   a. Archive snapshot confirmed → audit log updated with substitution
   b. No snapshot found → procurement officer alerted; manual intervention
6. Contract reaches end of statutory retention period:
   a. Full audit log exported and archived with contract record
   b. Snapshots retained for full statutory period
7. Audit query:
   GET /audit/UUID?as-of=2023-04-15
   → returns certified snapshot + chain of custody log
```

---

## Benefits

- **Legal certainty**: compliance requirements remain verifiable throughout the contract lifecycle and beyond
- **Audit readiness**: complete chain of custody for all referenced documents available on demand
- **Risk reduction**: broken links in active contracts identified and remediated before they create ambiguity
- **Statutory compliance**: supports public records and audit obligations across EU and national procurement frameworks
- **Evidence integrity**: cryptographic hashing proves snapshots have not been altered

---

## Open Questions

- What is the appropriate statutory retention period for LinkManager audit logs — 7 years, 10 years, or longer?
- How should LinkManager handle references to documents that are formally superseded by a new version during the contract period?
- Should certified snapshots have legal admissibility — and if so, what certification process is required?
- How does this interact with existing e-procurement platform requirements (EU TED, national portals)?

---

## Related

- [LM-3 · Link Integrity in Government Policy Documents](./lm-3-policy-documents.md)
- [LID-3 · Persistent Identifiers for Legislative References](../linkid/lid-3-legislation-references.md)
- [LID-4 · Stable Dataset Identifiers in Open Data Portals](../linkid/lid-4-open-data-portals.md)
