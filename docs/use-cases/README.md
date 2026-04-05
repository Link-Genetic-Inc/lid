# LinkID & LinkManager — Use Cases

This folder documents concrete use cases for LinkID and LinkManager across sectors. Use cases are organized by product layer:

| Folder | Description |
|--------|-------------|
| [`linkid/`](./linkid/) | LinkID as a standalone persistent identifier layer |
| [`linkmanager/`](./linkmanager/) | LinkManager as a standalone broken-link detection and repair tool |
| [`combined/`](./combined/) | LinkID + LinkManager working together |

Sector-specific use cases are also available:

| Context | Location |
|---------|----------|
| Wikipedia & Wikimedia | [`/Wikimedia Hackathon 2026/`](../../Wikimedia%20Hackathon%202026/README.md) |

---

## Sectors Covered

- **Academia & Libraries** — research citations, institutional repositories, digital collections, interlibrary references
- **Government & Public Sector** — legislation, open data portals, policy documents, procurement
- **AI / Machine Learning** — training corpus integrity, LLM provenance, hallucination mitigation

---

## Use Case Index

### LinkID

| # | Use Case | Sector |
|---|----------|--------|
| [LID-1](./linkid/lid-1-research-citations.md) | Persistent Citations in Academic Publishing | Academia |
| [LID-2](./linkid/lid-2-digital-collections.md) | Stable References in Library Digital Collections | Libraries |
| [LID-3](./linkid/lid-3-legislation-references.md) | Persistent Identifiers for Legislative References | Government |
| [LID-4](./linkid/lid-4-open-data-portals.md) | Stable Dataset Identifiers in Open Data Portals | Government |
| [LID-5](./linkid/lid-5-ai-training-data.md) | Stable References in AI/LLM Training Data | AI / ML |

### LinkManager

| # | Use Case | Sector |
|---|----------|--------|
| [LM-1](./linkmanager/lm-1-institutional-repository.md) | Broken Link Detection in Institutional Repositories | Academia |
| [LM-2](./linkmanager/lm-2-library-catalog.md) | Reference Health Monitoring in Library Catalogs | Libraries |
| [LM-3](./linkmanager/lm-3-policy-documents.md) | Link Integrity in Government Policy Documents | Government |
| [LM-4](./linkmanager/lm-4-public-procurement.md) | Reference Compliance in Public Procurement | Government |
| [LM-5](./linkmanager/lm-5-ai-training-data.md) | Reference Integrity in AI/LLM Training Corpora | AI / ML |

### Combined (LinkID + LinkManager)

| # | Use Case | Sector |
|---|----------|--------|
| [C-1](./combined/c-1-research-lifecycle.md) | Full Research Citation Lifecycle | Academia |
| [C-2](./combined/c-2-national-library.md) | National Library Reference Infrastructure | Libraries |
| [C-3](./combined/c-3-legislation-lifecycle.md) | Legislative Reference Lifecycle | Government |
| [C-4](./combined/c-4-ai-training-lifecycle.md) | AI Training Data Lifecycle | AI / ML |
