# Explainer: LinkID – Persistent, Never-Break Identifiers for the Web

**Authors**: Link Genetic GmbH
**Status**: Independent proposal for community discussion, not a W3C standard.
The current submitted URI proposal is
[draft-linkgenetic-linkid-uri-01](https://datatracker.ietf.org/doc/draft-linkgenetic-linkid-uri/01/).

---

## Problem

URLs are fragile. Content moves, domains expire, formats change. As a result, hyperlinks across the Web frequently break, leading to the widespread “404 Not Found” problem.
This undermines trust, accessibility, long-term preservation, and even sustainability: broken links force re-searching, duplicate storage, and wasted bandwidth.

Existing persistent identifier systems (e.g., DOI, Handle, ARK) address some of these challenges but are mostly scoped to specific domains (academic publishing, libraries). They are not widely adopted as a **general Web standard** for all resources.

---

## Goals

* Provide a **persistent identifier** whose maintained, authorized mapping can survive URL changes; no identifier guarantees that a resource remains available.
* Offer a **simple syntax** (e.g., `linkid:` scheme or HTTP-based `https://w3id.org/linkid/...`).
* Enable **resolvers** that map stable identifiers to current destinations using open, semantic, and AI-supported methods.
* Ensure compatibility with existing Web infrastructure (HTTP, DNS, browsers, archives).
* Support **sustainability claims** by quantifying avoided re-searching and duplication.

---

## Non-Goals

* Hosting or storing the actual content.
* Replacing existing persistent ID systems (DOI, ARK, Handle), but rather complementing and interlinking with them.
* Enforcing one central registry; federated/multi-stakeholder approaches are encouraged.

---

## Proposed Solution

* **Identifier Syntax**:

  * Current URI proposal: `linkid:<hyphenated UUID>`, with UUIDv4 for new allocations.
  * An HTTPS resolver URL is an access mechanism, not a second identifier.
  * Earlier hash and `w3id.org` namespace options are historical design ideas,
    not the current URI contract or an announced w3id.org deployment.
* **Resolver Module**:

  * The public SDK contract is JSON from `GET /api/public/resolve/{uuid}`.
    Separate browser routes may redirect to a target.
  * Detection and repair proposals are separate from approval and mapping
    updates. A change requires the applicable creator/governance authority;
    automated detection is not automatic permission to repair.
  * Maintains audit trails and optional CO₂-impact data.
* **Ecosystem Components**:

 * Registry with versioned mappings, available under open or commercial license.
  * Client libraries (JavaScript, Java, Python) for easy integration.
  * APIs for CMS, archives, and corporate systems.

---

## Security & Privacy Considerations

* **Data minimization**: identifiers carry no personal information.
* **Integrity**: verify applicable signatures and expected trust roots; a reachable URL or valid signature alone does not establish authorship or truth. An interoperable signature profile remains separate work.
* **Abuse prevention**: resolvers must handle malicious redirects, phishing attempts, and provide safe-browsing checks.
* **Long-term trust**: governance under open standards with clear patent licensing terms.

---

## Alternatives Considered

* **Use only DOIs** – not feasible outside publishing, limited governance.
* **ARK/Handle** – strong in archival contexts but less mainstream on the Web.
* **HTTP 301 redirect chains** – brittle, often break without central stewardship.

---

## Stakeholders & Adoption

* **Browsers**: optional native resolution for `linkid:` scheme.
* **Content creators**: embed `LinkIDs` in documents, PDFs, websites.
* **Libraries & archives**: align with DOI, ARK, Handle communities.
* **Industry & governments**: ensure long-term referenceability of policies, contracts, knowledge bases.
* **Sustainability actors**: measure avoided CO₂ impact of broken links.

---

## References

* [W3C TAG Design Principles](https://www.w3.org/TR/design-principles/)
* [RFC 3986 – Uniform Resource Identifier (URI): Generic Syntax](https://www.rfc-editor.org/rfc/rfc3986)
* [RFC 7595 – Guidelines and Registration Procedures for URI Schemes](https://www.rfc-editor.org/rfc/rfc7595)
* [w3id.org Permanent Identifier Community Group](https://w3id.org/)
