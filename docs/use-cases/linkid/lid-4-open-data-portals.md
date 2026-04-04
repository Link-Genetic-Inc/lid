# LID-4 · Stable Dataset Identifiers in Open Data Portals

**Product**: LinkID  
**Sector**: Government  
**Status**: Draft

---

## Problem

Government open data portals publish thousands of datasets — statistical data, geospatial information, public health records, budget data, and environmental measurements. These datasets are referenced by researchers, journalists, NGOs, businesses, and other government bodies.

Dataset URLs are structurally fragile: portals are rebuilt, data catalogues are migrated, APIs are versioned, and file paths change with each platform upgrade. When a dataset URL breaks, every downstream use — every report, every model, every application that cited it — loses its source reference.

This is particularly damaging for:
- **Reproducibility**: researchers cannot re-verify analyses built on cited datasets
- **Accountability**: journalists cannot trace government claims back to their data source
- **Interoperability**: data pipelines that ingest datasets by URL silently fail

**Example**:
```
A health research institute builds an epidemiological model citing:
https://data.gov.xx/api/datasets/population-by-age-2022.csv

The government relaunches its open data portal two years later.
The URL structure changes. The dataset still exists — but at a different URL.
The research institute's published model now cites a dead link.
```

---

## Solution with LinkID

Each dataset published on a government open data portal is assigned a `linkid:` identifier. The identifier resolves to the current canonical URL of the dataset, regardless of platform migrations or URL restructuring.

```
Dataset registered at publication:
  linkid:6f4a9b3e-12d7-4c88-b001-a5f8c2d34567
  → https://data.gov.xx/api/datasets/population-by-age-2022.csv

After portal migration:
  linkid:6f4a9b3e-12d7-4c88-b001-a5f8c2d34567
  → https://opendata.gov.xx/datasets/population/age-2022 (updated mapping)
```

Additionally, the resolver can expose version-aware resolution — returning the specific version of a dataset that existed at a given point in time, enabling reproducibility of time-sensitive analyses.

```
GET /resolve/6f4a9b3e-...?as-of=2023-06-01
→ dataset snapshot from June 2023
```

---

## Actors

| Actor | Role |
|-------|------|
| Data Publisher (Government Agency) | Registers datasets with LinkID at publication time |
| Open Data Portal | Assigns and displays `linkid:` alongside dataset download links |
| LinkID Resolver | Maintains mappings, version history, and dataset snapshots |
| Researcher / Journalist | Cites `linkid:` for reproducible, stable dataset references |
| Data Consumer (Application) | Resolves `linkid:` programmatically via API |
| Portal Administrator | Updates resolver mappings after platform migration |

---

## Flow

```
1. Agency publishes dataset on open data portal
2. Portal calls LinkID API → receives linkid:UUID
3. Portal displays linkid:UUID as a "permanent link" alongside dataset
4. Researcher cites linkid:UUID in published analysis
5. Portal migrates to new platform → administrator updates resolver mapping
6. Downstream citations continue to resolve correctly (transparent to all users)
7. Researcher requests version-specific snapshot:
   GET /resolve/UUID?as-of=2023-06-01 → archived dataset version
```

---

## Benefits

- **Reproducibility**: datasets cited in research remain retrievable at the specific version used
- **Resilience**: portal migrations no longer break downstream citations
- **Accountability**: the provenance chain from claim to data source remains intact
- **Machine-readability**: `linkid:` can be embedded in DCAT, schema.org Dataset, and SPARQL results
- **Versioning**: time-aware resolution enables point-in-time data retrieval

---

## Open Questions

- Should LinkIDs cover the dataset as a whole, or individual dataset versions/releases?
- How should the resolver handle datasets that are withdrawn or classified after publication?
- What is the relationship between LinkIDs and existing dataset identifiers (DOI for datasets, DCAT identifiers)?
- Should version-aware resolution be part of the core LinkID spec or an extension?

---

## Related

- [LID-3 · Persistent Identifiers for Legislative References](./lid-3-legislation-references.md)
- [LM-4 · Reference Compliance in Public Procurement](../linkmanager/lm-4-public-procurement.md)
- [C-3 · Legislative Reference Lifecycle](../combined/c-3-legislation-lifecycle.md)
