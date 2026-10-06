Workgroup:  
Network Working Group

Internet-Draft:  
draft-linkgenetic-linkid-uri-01

Published:  
5 October 2026

Intended Status:  
Standards Track

Expires:  
8 April 2027

Author:  
C. Nyffenegger

Link Genetic GmbH

# The LinkID URI Scheme and Resolution Model

## Abstract

This document specifies the "linkid" URI scheme and a resolution model for persistent, location-independent identifiers. A LinkID consists of the scheme name followed by a UUID and identifies a resource independently of its current network location. Resolution maps the LinkID to a current actionable URI using one or more resolvers. Resource names, locations, versions and operator relationships are associated data, not part of the identifier. The document defines syntax, comparison, resolution semantics and an HTTPS binding, and requests an update of the existing IANA URI scheme registration.

## About This Document

This note is to be removed before publishing as an RFC.

This is an individual submission. Discussion takes place on the DISPATCH mailing list (dispatch@ietf.org). Source and issue tracking: <https://github.com/Link-Genetic-Inc/lid>.

## Status of This Memo

This Internet-Draft is submitted in full conformance with the provisions of BCP 78 and BCP 79.

Internet-Drafts are working documents of the Internet Engineering Task Force (IETF). Note that other groups may also distribute working documents as Internet-Drafts. The list of current Internet-Drafts is at <https://datatracker.ietf.org/drafts/current/>.

Internet-Drafts are draft documents valid for a maximum of six months and may be updated, replaced, or obsoleted by other documents at any time. It is inappropriate to use Internet-Drafts as reference material or to cite them other than as "work in progress."

This Internet-Draft will expire on 8 April 2027.

## Copyright Notice

Copyright (c) 2026 IETF Trust and the persons identified as the document authors. All rights reserved.

This document is subject to BCP 78 and the IETF Trust's Legal Provisions Relating to IETF Documents (<https://trustee.ietf.org/license-info>) in effect on the date of publication of this document. Please review these documents carefully, as they describe your rights and restrictions with respect to this document. Code Components extracted from this document must include Revised BSD License text as described in Section 4.e of the Trust Legal Provisions and are provided without warranty as described in the Revised BSD License.

## Table of Contents

- [1](#section-1).  [Introduction](#name-introduction)

- [2](#section-2).  [Conventions and Terminology](#name-conventions-and-terminology)

- [3](#section-3).  [URI Scheme Syntax](#name-uri-scheme-syntax)

  - [3.1](#section-3.1).  [Opacity](#name-opacity)

  - [3.2](#section-3.2).  [Example](#name-example)

- [4](#section-4).  [Identifier Semantics](#name-identifier-semantics)

- [5](#section-5).  [Resolution Model](#name-resolution-model)

  - [5.1](#section-5.1).  [Resolver Selection](#name-resolver-selection)

  - [5.2](#section-5.2).  [Resolution Result](#name-resolution-result)

  - [5.3](#section-5.3).  [HTTPS Binding](#name-https-binding)

- [6](#section-6).  [Resolution States](#name-resolution-states)

- [7](#section-7).  [Allocation and Governance](#name-allocation-and-governance)

- [8](#section-8).  [Relationship to Existing Identifier Systems](#name-relationship-to-existing-id)

- [9](#section-9).  [Interoperability Considerations](#name-interoperability-considerat)

  - [9.1](#section-9.1).  [Existing Uses of "LinkId"](#name-existing-uses-of-linkid)

  - [9.2](#section-9.2).  [Contextual Recognition](#name-contextual-recognition)

  - [9.3](#section-9.3).  [Independent Implementations](#name-independent-implementations)

- [10](#section-10). [Use Cases](#name-use-cases)

- [11](#section-11). [Caching and Failure Handling](#name-caching-and-failure-handlin)

- [12](#section-12). [Security Considerations](#name-security-considerations)

- [13](#section-13). [Privacy Considerations](#name-privacy-considerations)

- [14](#section-14). [IANA Considerations](#name-iana-considerations)

- [15](#section-15). [References](#name-references)

  - [15.1](#section-15.1).  [Normative References](#name-normative-references)

  - [15.2](#section-15.2).  [Informative References](#name-informative-references)

- [Appendix A](#appendix-A).  [Implementation Status](#name-implementation-status)

- [Appendix B](#appendix-B).  [Open Issues](#name-open-issues)

- [](#appendix-C)[Changes since -00](#name-changes-since-00)

- [](#appendix-D)[Acknowledgments](#name-acknowledgments)

- [](#appendix-E)[Author's Address](#name-authors-address)

## 1. Introduction

Hyperlinks commonly couple resource identity to a current network location. When domains, paths, repositories, content-management systems or hosting infrastructure change, references fail even though the referenced resource may still exist.

LinkID separates persistent identity from mutable location. The core invariant is: identity is persistent, location is mutable, and resolution is the controlled mapping between the two.

Persistence is not a purely technical property. HTTP(S) URIs can be highly persistent when managed responsibly, and any persistent identifier system can fail if the organization behind it disappears. This document therefore does not claim that indirection alone guarantees persistence. It aims to ensure that a LinkID and its authorized mapping survive changes of custody and hosting, by separating identifier syntax from resolver operation.

LinkID does not replace HTTP(S) or existing persistent identifier systems; see [Section 8](#related).

## 2. Conventions and Terminology

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "NOT RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in BCP 14 \[[RFC2119](#RFC2119)\] \[[RFC8174](#RFC8174)\] when, and only when, they appear in all capitals, as shown here.

LinkID:  
A persistent identifier expressed using the "linkid" URI scheme.

Identifier authority:  
The party authorized to maintain a LinkID's mapping and associated records. Authority is established independently of the UUID text; it is not encoded in the identifier.

Resolver:  
A service or software component that maps a LinkID to a resolution result.

Resolution result:  
The authorized current mapping and lifecycle status for a LinkID returned by a resolver ([Section 5.2](#result)).

Actionable URI:  
A URI in a resolution result that a client can use to access or interact with the identified resource.

## 3. URI Scheme Syntax

The syntax is specified using ABNF \[[RFC5234](#RFC5234)\]; HEXDIG is imported from that specification. The UUID text representation is defined by \[[RFC9562](#RFC9562)\].

    linkid-URI = "linkid:" uuid
    uuid       = 8HEXDIG "-" 4HEXDIG "-" 4HEXDIG "-"
                 4HEXDIG "-" 12HEXDIG

A LinkID URI has no authority, namespace, path, query or fragment component. Whitespace, percent-encoded characters, braces and suffixes are not permitted.

The scheme name is case-insensitive \[[RFC3986](#RFC3986)\], and UUID hexadecimal text is case-insensitive \[[RFC9562](#RFC9562)\]. Producers MUST emit the complete URI in lowercase. Consumers MUST accept either case. Two LinkIDs are equivalent if and only if their UUID values are equal. Lowercasing a conforming LinkID yields its canonical form. Canonicalization MUST NOT turn a non-conforming string into a LinkID by discarding characters.

Matching the grammar does not establish that the UUID was allocated, that a resource exists, or who controls it.

### 3.1. Opacity

The UUID is opaque. Clients MUST NOT infer a resource type, name, location, owner or resolver from it.

### 3.2. Example

    linkid:00c538ea-846b-47a6-a3d4-70a9ebd29d7c

An associated target could be https://example.org/handbook/2026/section-3; after an authorized migration, https://example.org/manual/section-3. The LinkID remains unchanged. Independently identified resources, such as a document, a passage of it, or an image, each have their own UUID. Names are metadata, not identifier suffixes. Query parameters or fragments needed by a target belong to the target URI.

## 4. Identifier Semantics

A LinkID identifies a resource; it does not encode the resource's network location. Once assigned, a LinkID MUST NOT be reassigned to an unrelated resource. The actionable URI associated with a LinkID MAY change without changing the LinkID.

One LinkID has one persistent identity. Multiple target addresses, historical addresses, language or format variants, and authorized fallback addresses can be associated with it without creating alternative identifier forms. Changing an address or transferring stewardship does not create a new identity; a resource version that is identified separately receives its own UUID.

A resolver MUST NOT select an unrelated resource merely because it is reachable. Automatic recovery does not override the authority governing the original mapping.

Successful resolution establishes the currently authorized mapping. It does not establish that destination content is safe, correct, trustworthy or unchanged.

## 5. Resolution Model

A client resolves a LinkID by validating it against [Section 3](#syntax), selecting a resolver, requesting the resolution result, validating that result, applying local policy, and returning or navigating to the actionable URI.

A LinkID MUST NOT depend semantically on a single resolver operator: the meaning of a LinkID does not change when the resolver that serves it changes.

### 5.1. Resolver Selection

Clients use trusted resolvers designated by local, enterprise or application configuration. The UUID does not indicate an operator or resolver. Implementations MAY ship with default resolvers but MUST allow users or administrators to configure alternatives.

A change of resolver MUST NOT change an assigned UUID or authorize a new mapping. Use of an alternative resolver does not prove that it holds an authoritative record for a LinkID. Interoperable discovery of the authoritative resolver for a given LinkID is not defined in this revision; see [Appendix B](#open).

### 5.2. Resolution Result

A resolution result conveys at least the LinkID, its lifecycle status ([Section 6](#states)) and, where applicable, the actionable URI. A client MUST verify that the returned identifier matches the requested UUID before using a target. A client MUST NOT treat a mapping as active merely because a response was successful or a target is present; it MUST check the status and local policy before navigation. Unrecognized members MUST be ignored and MUST NOT grant authority.

### 5.3. HTTPS Binding

A resolver exposes a resolution endpoint identified by a URI Template \[[RFC6570](#RFC6570)\] using the "https" scheme and containing the variable "identifier", for example:

    https://resolver.example/resolve/{identifier}

The client expands the template with the complete LinkID and issues an HTTP GET request \[[RFC9110](#RFC9110)\] with "Accept: application/json". On success the resolver returns 200 (OK) and a JSON object \[[RFC8259](#RFC8259)\] with the following members:

id (string, REQUIRED):  
The canonical LinkID.

status (string, REQUIRED):  
The lifecycle status. Values defined in [Section 6](#states) SHOULD be used.

target_url (string or null, REQUIRED):  
The actionable URI, or null if none is authorized.

    {
      "id": "linkid:00c538ea-846b-47a6-a3d4-70a9ebd29d7c",
      "status": "active",
      "target_url": "https://example.org/resource"
    }

Error responses are JSON objects with an "error" member:

| HTTP status | error              | Meaning                                         |
|-------------|--------------------|-------------------------------------------------|
| 400         | invalid_identifier | Input does not conform to [Section 3](#syntax). |
| 404         | not_found          | No record for the LinkID (unknown).             |
| 410         | gone               | Record withdrawn or erased.                     |

[Table 1](#table-1): [Error Responses](#name-error-responses)

Clients MUST NOT interpret an HTML page, a transport failure or an intermediary error as a resolution result. A server error is not evidence that a LinkID is unknown.

Resolvers MAY offer separate interactive endpoints that redirect browsers to an actionable URI. LinkID resolution MUST NOT be defined solely as an HTTP redirect service, and an HTTPS resolver URI MUST NOT be treated as the LinkID itself.

Public resolvers MUST use HTTPS with validation of the server identity. This does not imply that public lookup requires user authentication.

## 6. Resolution States

Resolvers SHOULD distinguish the following conditions where applicable.

| State                   | Meaning                                        | Navigation                             |
|-------------------------|------------------------------------------------|----------------------------------------|
| active                  | Current mapping is valid.                      | Use an authorized target.              |
| unknown                 | No record for the LinkID.                      | Do not guess a target.                 |
| inactive                | Assigned, no current location.                 | None.                                  |
| deprecated              | Identity superseded.                           | Only an explicitly authorized mapping. |
| revoked                 | Withdrawn by the identifier authority.         | None.                                  |
| tombstoned              | Resource no longer exists; identity preserved. | No replacement assumed.                |
| temporarily-unavailable | Resolution currently not possible.             | Do not infer unknown.                  |
| policy-denied           | Refused by policy.                             | Do not bypass policy.                  |
| integrity-failure       | Record failed validation.                      | Do not use the record.                 |

[Table 2](#table-2): [Resolution States](#name-resolution-states-2)

An unknown LinkID MUST NOT be redirected to unrelated content. A revoked or tombstoned LinkID MUST NOT be reassigned.

## 7. Allocation and Governance

New LinkIDs MUST use UUID version 4 as defined in [Section 5.4](https://rfc-editor.org/rfc/rfc9562#section-5.4) of \[[RFC9562](#RFC9562)\], with the random bits generated by a cryptographically secure random source. Random generation allows allocation by independent parties without coordination. Implementations MUST NOT knowingly allocate an assigned UUID to an unrelated resource; a detected collision MUST NOT overwrite the existing identity. Previously assigned identifiers MUST NOT be renumbered to satisfy this rule.

Registration agencies, enterprises and resolver operators can have separate responsibilities and allocation policies. These are administrative relationships associated with records, not subdivisions of the identifier.

A transfer of stewardship or hosting MUST NOT change an assigned UUID. It requires authorization and preservation of mapping provenance; changing a resolver address alone does not transfer control. Where continuity cannot be established, resolution fails safely rather than granting an unrelated operator authority. A service interruption does not prove that the resource has ceased to exist.

DOI, ARK, URN and Handle identifiers retain their own syntax and governance. An association with them is held in metadata or targets, not embedded in the LinkID.

Accreditation of resolver operators, service levels and dispute resolution are outside the scope of this document.

## 8. Relationship to Existing Identifier Systems

URNs \[[RFC8141](#RFC8141)\]:  
URNs provide persistent names within registered namespaces but do not define a general resolution mechanism. LinkID combines a persistent identifier with a defined resolution model.

Handle System and DOI \[[RFC3650](#RFC3650)\] \[[ISO26324](#ISO26324)\]:  
DOIs resolve through the Handle System. LinkID does not replace DOI names or governance; a LinkID can be associated with a DOI-identified resource through its targets or metadata.

ARK \[[ARK](#ARK)\]:  
ARKs encode a Name Assigning Authority Number and use organization-operated resolvers. A LinkID does not encode an assigning authority.

PURL \[[PURL](#PURL)\]:  
PURLs are HTTP URIs redirected by a PURL server and bound to its domain. A LinkID is not bound to a resolver's domain.

## 9. Interoperability Considerations

### 9.1. Existing Uses of "LinkId"

The string "LinkId" is used in existing specifications independently of this scheme. For example, \[[MS-ASDOC](#MS-ASDOC)\] defines a "LinkId" XML element that carries a document link, such as a UNC file path. Such uses are unrelated to the "linkid" URI scheme.

A LinkID is recognized by the scheme component ([Section 3.1](https://rfc-editor.org/rfc/rfc3986#section-3.1) of \[[RFC3986](#RFC3986)\]) and validated against [Section 3](#syntax). The string "LinkId" in any non-scheme position does not constitute a LinkID and MUST NOT be interpreted as one.

### 9.2. Contextual Recognition

Because scheme names are case-insensitive, a field label followed by a value (for example "LinkId: 4711") can be mistaken for a linkid URI by a generic parser. Therefore:

- Implementations MUST NOT treat a string as a LinkID unless it appears in a context that expects a URI and conforms to [Section 3](#syntax).
- Implementations SHOULD NOT scan free text for LinkIDs without such a context.
- A string beginning with "linkid:" in any case that does not conform to [Section 3](#syntax) MUST be rejected and MUST NOT be passed to a resolver.

Documentation and user interfaces SHOULD refer to "LinkID URIs" or "linkid: URIs".

### 9.3. Independent Implementations

A conforming client needs a URI validator, resolver configuration, an HTTPS client and a JSON parser. A conforming resolver needs authorized records and the binding in [Section 5.3](#https). Neither requires a particular operator's hostname, SDK or software. Technical compatibility does not confer authority over existing LinkIDs.

## 10. Use Cases

Use cases include Web and domain migration; long-lived documents (PDF, office formats) with embedded references; enterprise knowledge systems; government, legal and public-record references; scientific publications and datasets; archives and custody transfer; machine-to-machine references; and tombstoning of resources that no longer exist.

## 11. Caching and Failure Handling

Resolution results MAY be cached according to HTTP caching \[[RFC9111](#RFC9111)\]. Cached results MUST NOT be treated as authoritative after their freshness lifetime. HTTP freshness is not an assertion about identifier lifetime or destination health.

Clients and resolvers MUST detect and bound resolution and redirect loops. Failures MUST fail safely: a client MUST NOT guess a destination for an unknown LinkID.

## 12. Security Considerations

LinkID resolution introduces an indirection layer. Unauthorized modification of a mapping redirects every reference using the affected LinkID. Interfaces for updating records MUST be strongly authenticated and access controlled, and changes SHOULD be auditable.

Public resolvers MUST protect against resolver impersonation, mapping hijacking, open redirects, phishing, malicious destination schemes, denial of service, replay of stale records, identifier enumeration and resolution loops. Clients SHOULD restrict the schemes of actionable URIs they follow (for example to "https").

Resolvers that fetch or inspect destinations MUST defend against server-side request forgery, including requests to loopback, link-local, cloud metadata and internal addresses, and MUST account for redirects and DNS rebinding.

Misconfigured or compromised resolver configuration can misdirect lookups even though the LinkID is unchanged. Discovering an endpoint or a public key does not establish authority over an identifier. High-assurance deployments SHOULD protect the integrity of resolution results cryptographically; a common format is an open issue ([Appendix B](#open)).

## 13. Privacy Considerations

Resolution requests reveal interest in particular resources. Resolver operators SHOULD minimize collection and retention of personal data and SHOULD publish their logging and retention policies. Public resolution SHOULD NOT require user authentication unless required by the resource or applicable policy.

A LinkID contains no credentials or resource names, but can become a correlatable reference when linked to personal information. Operators SHOULD NOT place secrets in public metadata or unnecessarily forward client information to targets.

## 14. IANA Considerations

The "linkid" URI scheme is registered in the "Uniform Resource Identifier (URI) Schemes" registry with Provisional status. This document requests that IANA update the registration as follows, in accordance with \[[RFC7595](#RFC7595)\]. The syntax below narrows the previously registered syntax to the UUID form.

Scheme name:  
linkid

Status:  
Permanent

URI scheme syntax:  
See [Section 3](#syntax).

URI scheme semantics:  
See [Section 4](#semantics) and [Section 5](#resolution).

Encoding considerations:  
ASCII only; no percent-encoding within the identifier.

Applications/protocols:  
Persistent identification and resolution of Web, document, archival, scientific, government, enterprise and machine-to-machine resources.

Interoperability considerations:  
See [Section 9](#interop).

Security considerations:  
See [Section 12](#security).

Contact:  
Christian Nyffenegger \<christian.nyffenegger@linkgenetic.com\>

Change controller:  
IETF \<iesg@ietf.org\>

Reference:  
This document

No other IANA action is requested.

## 15. References

### 15.1. Normative References

\[RFC2119\]  
Bradner, S., "Key words for use in RFCs to Indicate Requirement Levels", RFC 2119, BCP 14, DOI 10.17487/RFC2119, March 1997, \<<https://www.rfc-editor.org/info/rfc2119>\>.

\[RFC3986\]  
Berners-Lee, T., Fielding, R., and L. Masinter, "Uniform Resource Identifier (URI): Generic Syntax", RFC 3986, STD 66, DOI 10.17487/RFC3986, January 2005, \<<https://www.rfc-editor.org/info/rfc3986>\>.

\[RFC5234\]  
Crocker, D. and P. Overell, "Augmented BNF for Syntax Specifications: ABNF", RFC 5234, STD 68, DOI 10.17487/RFC5234, January 2008, \<<https://www.rfc-editor.org/info/rfc5234>\>.

\[RFC6570\]  
Gregorio, J., Fielding, R., Hadley, M., Nottingham, M., and D. Orchard, "URI Template", RFC 6570, DOI 10.17487/RFC6570, March 2012, \<<https://www.rfc-editor.org/info/rfc6570>\>.

\[RFC7595\]  
Thaler, D., Hansen, T., and T. Hardie, "Guidelines and Registration Procedures for URI Schemes", RFC 7595, BCP 35, DOI 10.17487/RFC7595, June 2015, \<<https://www.rfc-editor.org/info/rfc7595>\>.

\[RFC8174\]  
Leiba, B., "Ambiguity of Uppercase vs Lowercase in RFC 2119 Key Words", RFC 8174, BCP 14, DOI 10.17487/RFC8174, May 2017, \<<https://www.rfc-editor.org/info/rfc8174>\>.

\[RFC8259\]  
Bray, T., "The JavaScript Object Notation (JSON) Data Interchange Format", RFC 8259, STD 90, DOI 10.17487/RFC8259, December 2017, \<<https://www.rfc-editor.org/info/rfc8259>\>.

\[RFC9110\]  
Fielding, R., Nottingham, M., and J. Reschke, "HTTP Semantics", RFC 9110, STD 97, DOI 10.17487/RFC9110, June 2022, \<<https://www.rfc-editor.org/info/rfc9110>\>.

\[RFC9111\]  
Fielding, R., Nottingham, M., and J. Reschke, "HTTP Caching", RFC 9111, STD 98, DOI 10.17487/RFC9111, June 2022, \<<https://www.rfc-editor.org/info/rfc9111>\>.

\[RFC9562\]  
Davis, K., Peabody, B., and P. Leach, "Universally Unique IDentifiers (UUIDs)", RFC 9562, DOI 10.17487/RFC9562, May 2024, \<<https://www.rfc-editor.org/info/rfc9562>\>.

### 15.2. Informative References

\[ARK\]  
Kunze, J. and E. Bermès, "The ARK Identifier Scheme", Work in Progress, Internet-Draft, draft-kunze-ark, \<<https://datatracker.ietf.org/doc/draft-kunze-ark/>\>.

\[ISO26324\]  
ISO, "Information and documentation - Digital object identifier system", ISO 26324.

\[MS-ASDOC\]  
Microsoft Corporation, "\[MS-ASDOC\]: Exchange ActiveSync: Document Class Protocol", \<<https://learn.microsoft.com/en-us/openspecs/exchange_server_protocols/ms-asdoc/>\>.

\[PURL\]  
Internet Archive, "Persistent URL Service", \<<https://purl.archive.org/>\>.

\[RFC3650\]  
Sun, S., Lannom, L., and B. Boesch, "Handle System Overview", RFC 3650, DOI 10.17487/RFC3650, November 2003, \<<https://www.rfc-editor.org/info/rfc3650>\>.

\[RFC7942\]  
Sheffer, Y. and A. Farrel, "Improving Awareness of Running Code: The Implementation Status Section", BCP 205, RFC 7942, DOI 10.17487/RFC7942, July 2016, \<<https://www.rfc-editor.org/info/rfc7942>\>.

\[RFC8141\]  
Saint-Andre, P. and J. Klensin, "Uniform Resource Names (URNs)", RFC 8141, DOI 10.17487/RFC8141, April 2017, \<<https://www.rfc-editor.org/info/rfc8141>\>.

\[RFC8615\]  
Nottingham, M., "Well-Known Uniform Resource Identifiers (URIs)", RFC 8615, DOI 10.17487/RFC8615, May 2019, \<<https://www.rfc-editor.org/info/rfc8615>\>.

## Appendix A. Implementation Status

This section is to be removed before publishing as an RFC.

This section records the status of known implementations at the time of posting, following \[[RFC7942](#RFC7942)\]. The description is provided for the information of reviewers; inclusion does not imply endorsement by the IETF.

Organization:  
Link Genetic GmbH

Implementation:  
LinkID platform, resolver and SDKs (<https://github.com/Link-Genetic-Inc/lid>)

Licensing:  
See the repository.

Contact:  
christian.nyffenegger@linkgenetic.com

Coverage and maturity:

- Allocation: new identifiers are generated as UUID version 4. Some historically allocated records predate this revision's syntax and are retained without renumbering.
- Resolution: a public JSON endpoint, /api/public/resolve/{identifier}, implements the binding in [Section 5.3](#https) including the members id, status and target_url and the 400/404/410 error responses. It additionally returns implementation-specific members (scheme, uuid, last_verified_at, registration_agency, version) and accepts some legacy input forms for compatibility. Separate browser routes redirect to targets.
- Multiple targets: the data model supports multiple, historical, language-specific and fallback targets per LinkID. A consistent target-selection algorithm across endpoints is not yet defined.
- Discovery and integrity: implementation-specific resolver descriptors and a signed record format exist under /.well-known/ paths. They are not registered under \[[RFC8615](#RFC8615)\] and are not part of this specification.
- Federation: independently operated, interoperating resolvers have not yet been demonstrated.

## Appendix B. Open Issues

The author seeks community input on:

1.  Interoperable discovery of the authoritative resolver for a LinkID, given that the UUID carries no authority information (for example: configuration only, operator descriptors, a shared directory, or replication).
2.  A signature format for resolution results and how clients establish trust in identifier-authority keys.
3.  Which multi-target and lifecycle information should be exposed in an interoperable response, and how target selection (language, format, priority, fallback) should be described.
4.  Representation of stewardship transfer and lifecycle history.
5.  Transition handling for identifiers allocated under the broader syntax of the existing provisional registration and revision -00.
6.  Which governance and operational aspects belong in an IETF specification and which in a separate operational framework.

## Changes since -00

This section is to be removed before publishing as an RFC.

- Narrowed the syntax to "linkid:" followed by a UUID; removed non-UUID examples.
- Required UUID version 4 for new allocations, without renumbering existing identifiers.
- Separated identity from names, targets, versions, fallbacks and operator relationships.
- Defined resolver selection, the resolution result and an HTTPS binding aligned with the existing implementation.
- Added allocation, stewardship transfer and continuity rules.
- Added relationship to URN, Handle/DOI, ARK and PURL.
- Added interoperability considerations on existing uses of "LinkId" and contextual recognition (URI review feedback).
- Changed the change controller to the IETF.
- Added Implementation Status and Open Issues appendices; updated contact address and references.

## Acknowledgments

The author thanks Ted Hardie for the URI review, and the participants in the uri-review and DISPATCH discussions and in the W3C TPAC 2025 breakout session for their feedback.

## Author's Address

Christian Nyffenegger

Link Genetic GmbH

Leugrueb 21

CH-8126 Zumikon

Switzerland

Email: <christian.nyffenegger@linkgenetic.com>

URI: [https://www.linkgenetic.com](https://www.linkgenetic.com)
