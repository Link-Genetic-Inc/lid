# C-4 · AI Training Data Lifecycle

**Products**: LinkManager + LinkID (Combined)  
**Problem**: Link Rot · Content Drift  
**Sector**: AI / Machine Learning  
**Status**: Draft

---

## Problem

AI training data has a reference integrity problem that operates at two levels simultaneously — and neither product alone is sufficient to solve it:

1. **The legacy problem** (LinkManager): existing training corpora contain hundreds of millions of raw URLs, a significant share of which are already broken or drifted. Every training run that ingests this data without verification is learning from a partially corrupt reference layer.

2. **The structural problem** (LinkID): even if all broken references in a current corpus are repaired, the next corpus assembled from raw URLs will have the same problem. Without a persistent identifier layer, reference rot is guaranteed to recur.

The full AI training data lifecycle requires both layers:
- **LinkManager** cleans the existing corpus
- **LinkID** prevents the next corpus from needing cleaning

---

## Solution: LinkManager + LinkID

### Phase 1 — LinkManager: Audit and Clean the Training Corpus

Before a training run, LinkManager produces a full reference health audit of the corpus and applies automated cleaning:

```
Input:  Raw training corpus (Wikipedia snapshot + web crawl)
        84M external references, unknown health status

Output: Cleaned corpus with reference health metadata
        71.8M live references (verified)
         4.2M redirected references (updated)
         5.2M dead references → Wayback snapshots substituted
         1.9M soft 404s → flagged for curator review
         1.1M drifted references → both versions preserved with drift score
```

Every reference in the cleaned corpus has a status label, a timestamp, and (where applicable) an archived snapshot. The training run proceeds on a verified, documented corpus.

### Phase 2 — LinkID: Register and Persist All References

Simultaneously with the cleaning pass, LinkManager registers every live and substituted URL with the LinkID resolver:

```
For each reference in cleaned corpus:
  POST /api/v1/register { url, content_hash, snapshot_url, registered_at }
  → receives linkid:UUID
  → linkid:UUID written into corpus metadata

Corpus now contains:
  raw URL (original, for human readability)
  linkid:UUID (persistent identifier, for machine resolution)
  snapshot_url (archived version at corpus assembly date)
  content_hash (cryptographic proof of content at registration)
```

### Phase 3 — Training on a Verifiable Corpus

The model is trained on a corpus where every reference has:
- A persistent `linkid:` identifier
- A verified status at training time
- A content snapshot for the exact version consulted
- A cryptographic hash for integrity proof

This corpus is **fully reproducible** — any future training run can retrieve the exact same reference content via version-pinned LinkID resolution.

### Phase 4 — Post-Training Monitoring

LinkManager continues to monitor the underlying URLs after training:
- Detects when a training reference breaks or drifts
- Alerts data engineers to affected claims in the model's knowledge base
- Enables targeted corpus updates or re-training on affected documents

Meanwhile, the LinkID resolver handles any inference-time citation verification:
- Users and auditors can verify model citations via `linkid:` resolution
- Drifted or dead references are surfaced with their training-time snapshots

---

## Actors

| Actor | Role |
|-------|------|
| Data Engineer | Runs LinkManager corpus audit; integrates LinkID registration into pipeline |
| Data Curator | Reviews drift alerts and soft-404 flags; makes inclusion/exclusion decisions |
| LinkManager | Audits corpus URLs; substitutes dead references; flags drifted content |
| LinkID Resolver | Registers all corpus references; maintains version-pinned snapshots |
| AI Researcher | Documents corpus provenance using linkid:UUIDs in model cards |
| Auditor / Regulator | Verifies provenance claims via LinkID resolution |
| End User | Can verify model citations at inference time |

---

## Flow

```
PHASE 1 — CORPUS AUDIT (LinkManager):
1. Raw corpus assembled
2. LinkManager bulk-crawls all URLs:
   Live → verified, proceed
   Redirected → update to canonical URL, proceed
   Dead → Wayback query → substitute snapshot or exclude
   Soft 404 → flag for curator review
   Drifted → preserve both versions, attach drift score
3. Health report generated (counts, categories, actions taken)

PHASE 2 — PERSISTENT REGISTRATION (LinkID):
4. For each verified/substituted reference:
   POST /api/v1/register → linkid:UUID + snapshot stored
5. linkid:UUIDs written into corpus alongside raw URLs
6. Content hashes recorded for integrity verification

PHASE 3 — TRAINING:
7. Model trained on verified, linkid:-annotated corpus
8. Training metadata documents: corpus version, health report, registration date

PHASE 4 — MONITORING + INFERENCE:
9. LinkManager monitors corpus URLs post-training (rolling schedule)
10. Drift/rot alerts → data engineers notified → corpus update scoped
11. At inference: model citations resolved via linkid: → status surfaced to user
12. Audit request: retrieve training-time snapshot via ?as-of=YYYY-MM-DD
```

---

## Benefits

- **Complete lifecycle coverage**: from corpus assembly through training to inference and audit
- **No re-cleaning required**: LinkID registration means future training runs inherit persistent references — the same corpus can be used again with no re-audit needed
- **Regulatory compliance**: full provenance chain satisfies EU AI Act transparency requirements and supports model card documentation
- **Hallucination mitigation**: models trained on verified corpora with version-pinned references have a documentable, auditable knowledge basis
- **Reproducibility**: any training run can be exactly reproduced using version-pinned LinkID resolution

---

## Deployment Model

| Phase | Product | Action | Value delivered |
|-------|---------|--------|-----------------|
| 1 | LinkManager | Audit and clean existing corpus | Immediate: eliminates broken references from current training run |
| 2 | LinkID | Register all corpus references | Immediate: adds persistent identifiers and content snapshots |
| 3 | Both | Train on verified, linkid:-annotated corpus | Training: model learns from verified, traceable sources |
| 4 | LinkManager | Monitor corpus URLs post-training | Ongoing: alerts when training references break or drift |
| 4 | LinkID | Serve version-pinned resolution at inference | Ongoing: enables citation verification and audit |

Phase 1 alone delivers significant value with minimal integration effort. Phases 2–4 build on it progressively.

---

## Open Questions

- At what granularity should LinkID registration occur — whole documents, or individual cited passages?
- Should `linkid:` identifiers be surfaced to end users at inference, or remain internal to the pipeline?
- What is the right policy for claims where the linked source has drifted — flag, retrain, or disclaim?
- How does this interact with copyright law — does storing content snapshots for AI training purposes require additional licensing?
- Should a model's training corpus health report be publicly available, or treated as proprietary?

---

## Related

- [LM-5 · Reference Integrity in AI/LLM Training Corpora](../linkmanager/lm-5-ai-training-data.md)
- [LID-5 · Stable References in AI Training Data](../linkid/lid-5-ai-training-data.md)
- [C-1 · Full Research Citation Lifecycle](./c-1-research-lifecycle.md)
