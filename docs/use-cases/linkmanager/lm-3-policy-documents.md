# LM-3 · Link Integrity in Government Policy Documents

**Product**: LinkManager  
**Sector**: Government  
**Status**: Draft

---

## Problem

Government policy documents — white papers, impact assessments, consultation responses, ministerial guidance, and regulatory notices — routinely link to evidence bases, cited studies, referenced standards, and supporting data. These links are part of the policy's public justification.

Governments publish thousands of such documents each year. They are rarely updated after publication. Links within them break silently as cited resources move or disappear. Citizens, journalists, and oversight bodies attempting to scrutinise a policy's evidence base encounter dead ends.

This is an accountability problem as much as a technical one: the public record of *why* a policy was enacted becomes unverifiable.

**Example**:
```
A government impact assessment published in 2020 cites 43 external sources.
By 2024, 9 of those links are broken — including the primary economic
study used to justify a major spending decision.
A parliamentary committee attempting to review the policy
cannot access the original evidence.
```

---

## Solution with LinkManager

LinkManager monitors all external links across a government's published document corpus. It detects broken links, archives the referenced content, and surfaces failures for remediation by document owners or a central digital team.

### Scope
- Policy documents, white papers, impact assessments
- Ministerial guidance and regulatory notices
- Consultation documents and government responses
- Published correspondence and official statements

### Detection & Archival
For each broken link, LinkManager:
1. Checks the Internet Archive for a snapshot near the document's publication date
2. If found: proposes an archive URL as a substitute
3. If not found: flags for manual review and triggers an urgent archival request to the Wayback Machine

### Integration
LinkManager integrates with government document management systems (e.g. GOV.UK, EUR-Lex, national gazette platforms) to:
- Monitor documents as they are published
- Surface broken links via a central dashboard for the government digital team
- Generate periodic link health reports by department or policy area

---

## Actors

| Actor | Role |
|-------|------|
| Policy Author | Publishes document; LinkManager begins monitoring automatically |
| Government Digital Team | Reviews central dashboard, coordinates repairs across departments |
| Department Communications | Receives alerts for broken links in their published documents |
| LinkManager | Monitors URLs, archives content, proposes repairs |
| Parliamentary Committee / Oversight Body | Benefits from maintained accessibility of policy evidence |
| Citizen / Journalist | Can follow references in published policy documents |

---

## Flow

```
1. Government document published (with external URLs)
2. LinkManager ingests document URLs via integration or sitemap crawl
3. Monitoring begins immediately at publication
4. Broken link detected:
   a. Wayback Machine queried for snapshot near publication date
   b. If snapshot found → proposed repair: substitute archive URL
   c. If no snapshot → urgent archival request submitted to Wayback Machine
   d. Department alerted via dashboard
5. Government digital team reviews alert:
   a. Accepts archive substitute → document updated (or annotation added)
   b. Escalates to document owner for replacement source
6. Monthly report: broken link counts by department, document age, policy area
```

---

## Benefits

- **Accountability**: the evidence base for government decisions remains publicly accessible
- **Oversight**: parliamentary committees and journalists can follow policy references
- **Proactive archival**: resources are archived at publication time, before they disappear
- **Departmental visibility**: departments can see the link health of their own published corpus
- **Compliance**: supports freedom of information obligations and public records requirements

---

## Open Questions

- Should governments proactively archive all linked resources at publication time, or only on detection of failure?
- What is the appropriate authority for updating a published policy document — the originating department, or a central digital team?
- How should LinkManager handle links to foreign government or international organisation documents?
- Does adding archive URLs to published documents constitute an amendment that requires formal notice?

---

## Related

- [LM-4 · Reference Compliance in Public Procurement](./lm-4-public-procurement.md)
- [LID-3 · Persistent Identifiers for Legislative References](../linkid/lid-3-legislation-references.md)
- [C-3 · Legislative Reference Lifecycle](../combined/c-3-legislation-lifecycle.md)
