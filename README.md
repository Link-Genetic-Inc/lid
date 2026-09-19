# LinkID – Persistent Identifiers for the Web

[![W3C Community Group](https://img.shields.io/badge/W3C-Community%20Group-blue)](https://github.com/WICG/proposals/issues/238)
[![IANA URI Scheme](https://img.shields.io/badge/IANA-linkid%3A%20URI%20Scheme-orange)](https://www.iana.org/assignments/uri-schemes/prov/linkid)
[![License: LCL](https://img.shields.io/badge/License-LCL%20v1.0-green)](LICENSE)
[![CI](https://github.com/Link-Genetic-Inc/lid/actions/workflows/ci.yml/badge.svg)](https://github.com/Link-Genetic-Inc/lid/actions/workflows/ci.yml)

LinkID is a persistent identifier system that decouples the identity of a hyperlink from the physical address of its target resource. It solves both **Link Rot** (broken links) and **Content Drift** (changed content at same URL).

## How It Works

Traditional hyperlinks break when URLs change. LinkID assigns each hyperlink relationship a unique, location-independent identifier (LinkID) that remains valid regardless of where the target resource moves or how its content changes.

```
Traditional:  Document → URL → Resource (breaks when URL changes)
LinkID:       Document → LinkID → Resolver → Current Resource (always works)
```

## Repository Structure

```
lid/
├── sdk/              # Client libraries
│   ├── js/           # JavaScript/TypeScript – npm: @linkgenetic/client
│   ├── python/       # Python – pip: linkid-client
│   └── java/         # Java – Maven: com.linkgenetic:linkid-client
├── spec/             # W3C Specification
├── draft/            # IETF Internet-Draft (URI scheme)
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
console.log(result.data.target_url); // current location of the resource
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
- **Web publishing** – Replace fragile URLs with persistent LinkIDs. Readers always reach the current version of referenced content.
- **Archives and libraries** – Maintain long-term reference integrity with time-aware resolution and archived versions.
- **QR codes and print media** – LinkIDs in printed materials resolve to current resources even years after publication.
- **API integrations** – Register and manage LinkIDs programmatically via REST API.
- **Wikipedia & Wikimedia** – Persistent reference identifiers for Wikipedia citations, solving link rot and content drift at scale. See [Wikimedia Hackathon 2026](Wikimedia%20Hackathon%202026/README.md) for detailed use cases.

See [`docs/use-cases/`](docs/use-cases/README.md) for the full use case library covering LinkID, LinkManager, and combined deployments across Academia, Libraries, and Government.

## Licensing

This project uses a Triple License model:

| License | For | Cost |
|---------|-----|------|
| **LCL** (Community License) | Non-commercial use, evaluation, research | Free |
| **LPIL** (Public Interest License) | Universities, libraries, government, NGOs | Free |
| **LEL** (Enterprise License) | Commercial use | [Contact us](mailto:licensing@linkgenetic.com) |

The repository root remains under LCL. The client SDK source in `sdk/js`,
`sdk/python`, and `sdk/java` is separately licensed under Apache-2.0 and each
SDK includes its own license file. Version 1.0.1 is publicly available from
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

LinkID technology is protected by patent application CH P220889 and international applications derived therefrom. Use of the client SDK libraries does not require a patent license. For details on patent licensing, see our [licensing page](https://linkgenetic.com/licenses).

## Specifications

- [W3C LinkID Specification](spec/index.html)
- [IETF Internet-Draft: LinkID URI Scheme](draft/draft-linkgenetic-linkid-uri-00.md)
- [IANA `linkid:` URI Scheme Registration](https://www.iana.org/assignments/uri-schemes/prov/linkid)

## Standards Activity

- [WICG Proposal: LinkID](https://github.com/WICG/proposals/issues/238) – Web Incubator Community Group proposal
- [TPAC 2025 Breakout Session](https://www.w3.org/events/meetings/ef18fde3-f3f0-498a-addf-d47f33716014/) – LinkID presentation at W3C TPAC 2025, Kobe
- [TPAC 2025 Session Proposal](https://github.com/w3c/tpac2025-breakouts/issues/83) – Original session proposal and discussion
- [Wikimedia Hackathon 2026](Wikimedia%20Hackathon%202026/README.md) – Improving Wikipedia Reference Integrity with Persistent LinkIDs · Milan, May 1–3 2026 · [⚓ T422252](https://phabricator.wikimedia.org/T422252)

## Why LinkID? The Broken Links Problem

Research shows that link rot is a systemic problem across the Web:

- [When Online Content Disappears](https://www.pewresearch.org/data-labs/2024/05/17/when-online-content-disappears/) – Pew Research Center (2024): 38% of web pages from 2013 are no longer accessible

## Links

- [Link Genetic GmbH](https://linkgenetic.com) – Company website
- [LinkManager](https://linkmanager.linkgenetic.com) – AI-powered broken link detection and repair
- [LinkID Portal](https://linkid.linkgenetic.com) – LinkID management portal
- [LinkID Research Publications](https://linkgenetic.com/publications) - Link Genetic Research Publications
