# LinkID – Persistent Identifiers for the Web

[![WICG Proposal](https://img.shields.io/badge/WICG-Proposal-blue)](https://github.com/WICG/proposals/issues/238)
[![IANA URI Scheme](https://img.shields.io/badge/IANA-linkid%3A%20URI%20Scheme-orange)](https://www.iana.org/assignments/uri-schemes/prov/linkid)
[![License: Apache-2.0](https://img.shields.io/badge/License-Apache--2.0-green)](LICENSE)
[![CI](https://github.com/Link-Genetic-Inc/lid/actions/workflows/ci.yml/badge.svg)](https://github.com/Link-Genetic-Inc/lid/actions/workflows/ci.yml)
[![Live Demo](https://img.shields.io/badge/Live-Hover%20Card%20Demo-176b5e)](https://link-genetic-inc.github.io/lid/demo/)

LinkID is a persistent identifier system that decouples the identity of a hyperlink from the physical address of its target resource. It addresses **Link Rot** (broken links) and supports detection of **Content Drift** (changed content at the same URL). Continued resolution depends on maintained mappings, available destinations and authorized recovery; an identifier alone cannot guarantee availability or authenticity.

## Live Hover Card Demo

**[Open the interactive LinkID Hover Card Demo](https://link-genetic-inc.github.io/lid/demo/)** to see stability, trust, and metadata previews on registered external links. The page also includes the copy-ready website integration script.

## How It Works

Traditional hyperlinks break when URLs change. LinkID assigns each hyperlink relationship a unique, location-independent identifier (LinkID) that remains valid regardless of where the target resource moves or how its content changes.

```
Traditional:  Document → URL → Resource (breaks when URL changes)
LinkID:       Document → LinkID → Resolver → Authorized current target or explicit status
```

## Repository Structure

```
lid/
├── sdk/              # Client libraries
│   ├── js/           # JavaScript/TypeScript – npm: @linkgenetic/client
│   ├── python/       # Python – pip: linkid-client
│   └── java/         # Java – Maven: com.linkgenetic:linkid-client
├── spec/             # Current URI draft, architecture notes and live website demo
├── draft/            # Historical Internet-Draft revision -00
├── docs/             # Contributing guidelines, Code of Conduct
└── tests/            # Conformance tests
```

## Quick Start

### JavaScript / TypeScript

```bash
npm install @linkgenetic/client
```

```typescript
import { LinkIDClient } from '@linkgenetic/client';

const client = new LinkIDClient({ resolverUrl: 'https://linkid.io' });
const result = await client.resolve('linkid:7e96f229-21c3-4a3d-a6cf-ef7d8dd70f24');
if (result.type === 'metadata') {
  console.log(result.data); // public response includes target_url
}
```

### Python

```bash
pip install linkid-client
```

```python
from linkid import LinkIdClient

client = LinkIdClient()
result = client.resolve("linkid:7e96f229-21c3-4a3d-a6cf-ef7d8dd70f24")
print(result.data["target_url"])  # current location of the resource
```

### Java

```xml
<dependency>
    <groupId>com.linkgenetic</groupId>
    <artifactId>linkid-client</artifactId>
    <version>1.0.1</version>
</dependency>
```

```java
LinkIdClient client = LinkIdClient.builder().build();
LinkIdClient.MetadataResolution result = (LinkIdClient.MetadataResolution)
    client.resolve("linkid:7e96f229-21c3-4a3d-a6cf-ef7d8dd70f24");
System.out.println(result.metadata().get("target_url").asText());
```

## Use Cases

- **Enterprise documents** – Embed LinkIDs in PDF, Word, and other documents. Links survive server migrations, domain changes, and content restructuring.
- **Web publishing** – Replace fragile URLs with persistent LinkIDs. Maintained mappings can direct readers to the authorized current version of referenced content.
- **Archives and libraries** – Maintain long-term reference integrity with time-aware resolution and archived versions.
- **QR codes and print media** – LinkIDs in printed materials resolve to current resources even years after publication.
- **API integrations** – Register and manage LinkIDs programmatically via REST API.
- **Wikipedia & Wikimedia** – Persistent reference identifiers for Wikipedia citations, solving link rot and content drift at scale. See [Wikimedia Hackathon 2026](Wikimedia%20Hackathon%202026/README.md) for detailed use cases.

See [`docs/use-cases/`](docs/use-cases/README.md) for the full use case library covering LinkID, LinkManager, and combined deployments across Academia, Libraries, and Government.

## Features

Explore the LinkID integration surfaces:

- **Hover Card Preview** — add stability, trust, and metadata previews to registered external links with one script tag. [Try the live demo](https://link-genetic-inc.github.io/lid/demo/).
- **Browser Extensions** — create, resolve, check, and explicitly recover LinkIDs in Chrome, Edge, Firefox, and Safari.
- **Microsoft Office Integration** — use LinkID with Word, Excel, PowerPoint, and Outlook through host-specific add-ins.
- **SDKs and APIs** — integrate public resolution through JavaScript/TypeScript, Python, Java, REST APIs, and developer tools.

See [LinkID Features](FEATURES.md) for integration examples and product guides.

## Licensing

Licensed under Apache-2.0 (see LICENSE). Patent rights for implementations of the LinkID specification: see PATENTS.md.

Each client SDK in `sdk/js`, `sdk/python`, and `sdk/java` includes its own
Apache-2.0 license file. Version 1.0.1 is publicly available from
[npm](https://www.npmjs.com/package/@linkgenetic/client),
[PyPI](https://pypi.org/project/linkid-client/), and
[Maven Central](https://central.sonatype.com/artifact/com.linkgenetic/linkid-client/1.0.1).
The public SDK v1 is resolve-only and uses the unauthenticated
`https://linkid.io/api/public/resolve/{uuid}` endpoint.

## Contributing

We welcome contributions! Please read [CONTRIBUTING.md](docs/CONTRIBUTING.md) and sign our Contributor License Agreement (CLA) before submitting pull requests.

Contributions are welcome for:

- Client SDK libraries (bug fixes, new language bindings)
- Documentation and translations
- Conformance tests
- Specification editorial improvements

## Patent Notice

Patent rights for implementations of the LinkID specification are addressed in [PATENTS.md](PATENTS.md).

## Specifications

- [LinkID architecture notes](https://link-genetic-inc.github.io/lid/) — independent, non-normative proposals; not a W3C standard
- [Official submitted IETF Internet-Draft (-01)](https://datatracker.ietf.org/doc/draft-linkgenetic-linkid-uri/01/)
- [Editable URI draft working copy](spec/draft-linkgenetic-linkid-uri-01.md) — includes post-submission clarifications
- [IANA `linkid:` URI Scheme Registration](https://www.iana.org/assignments/uri-schemes/prov/linkid)

## Standards Activity

- **[IETF 127 — San Francisco, 14–20 November 2026](https://www.ietf.org/meeting/127/)** — [DISPATCH agenda](https://datatracker.ietf.org/meeting/127/materials/agenda-127-dispatch-00): *The LinkID URI Scheme and Resolution Model*, Christian Nyffenegger (remote). The session is **16 November, 09:00–11:00 PST / 18:00–20:00 CET**; this is the session window, not an individual presentation start time. [LinkID presentation resources](https://linkid.linkgenetic.com/ietf-127).
  - Current PDFs, **14 November 2026, 08:24**: [Presentation — 6 slides](docs/ietf-127/LinkID-IETF127-DISPATCH-Submission-2026-11-14-0824.pdf) · [FAQ — 13 slides](docs/ietf-127/LinkID-IETF127-DISPATCH-FAQ-2026-11-14-0824.pdf).
    These are presentation materials, not a new Internet-Draft revision or evidence of an IETF submission or approval.
- [WICG Proposal: LinkID](https://github.com/WICG/proposals/issues/238) – Web Incubator Community Group proposal
- [TPAC 2025 Breakout Session](https://www.w3.org/events/meetings/ef18fde3-f3f0-498a-addf-d47f33716014/) – LinkID presentation at W3C TPAC 2025, Kobe
- [TPAC 2025 Session Proposal](https://github.com/w3c/tpac2025-breakouts/issues/83) – Original session proposal and discussion
- [Wikimedia Hackathon 2026](Wikimedia%20Hackathon%202026/README.md) – Improving Wikipedia Reference Integrity with Persistent LinkIDs · Milan, May 1–3 2026 · [⚓ T422252](https://phabricator.wikimedia.org/T422252)

The IETF document is an **individual Internet-Draft**, not an RFC or an adopted
Working Group specification. The WICG proposal, TPAC presentation and provisional
IANA registration do not establish W3C or IETF endorsement. IETF participation
does not change the scope of the URI proposal.

## Why LinkID? The Broken Links Problem

Research shows that link rot is a systemic problem across the Web:

- [When Online Content Disappears](https://www.pewresearch.org/data-labs/2024/05/17/when-online-content-disappears/) – Pew Research Center (2024): 38% of web pages from 2013 are no longer accessible

## Links

- [Link Genetic GmbH](https://linkgenetic.com) – Company website
- [LinkManager](https://linkmanager.linkgenetic.com) – AI-powered broken link detection and repair
- [LinkID Portal](https://linkid.linkgenetic.com) – LinkID management portal
- [Developer Portal](https://linkid.linkgenetic.com/developers) – API documentation, SDKs, and integration resources
- [LinkID Research Publications](https://linkgenetic.com/publications) - Link Genetic Research Publications
