# LID-5 · Stable References in AI/LLM Training Data

**Product**: LinkID  
**Problem**: Link Rot · Content Drift  
**Sector**: AI / Machine Learning  
**Status**: Draft

---

## Problem

When an LLM is trained on a corpus containing raw URLs, those URLs are a liability. They encode a physical address at a point in time — not the identity of the source. As the web changes, the training data's reference layer silently decays.

The deeper problem is not just that links break — it is that there is no mechanism in a standard URL-based corpus to:
- Know which version of a source was present at training time
- Verify that the source a model cites still says what the model says it says
- Trace a model's claim back to a specific, versioned, retrievable document

This is the **provenance gap** in AI training data — and it is structural, not incidental.

---

## Solution with LinkID

LinkID addresses the provenance gap at the source — by replacing raw URLs in training data with persistent identifiers that carry version information and remain resolvable indefinitely.

### At corpus preparation time
When a training corpus is assembled, each external reference is registered with the LinkID resolver:

```
Raw corpus URL:  https://health-institute.org/report/study-2021
                 ↓ LinkID registration
linkid:4f8c2a1e-93b5-4d77-a001-e7f9c0d12345
  registered_at: 2024-01-15T09:00:00Z
  content_hash:  sha256:a3f9...
  snapshot_url:  https://web.archive.org/web/20240115/...
  status:        LIVE
```

The training corpus stores the `linkid:` alongside (or instead of) the raw URL.

### At inference and citation time
When a model generates a response citing a source, it can surface the `linkid:` — which the resolver can verify:

```
Model output:
  "According to [linkid:4f8c2a1e-...], the study found..."

Resolver response:
  status: LIVE (URL still resolves, content unchanged)
  OR
  status: DRIFTED (URL resolves, but content has changed since training)
  OR
  status: ARCHIVED (URL dead, archived copy available at training-time snapshot)
```

This enables **real-time provenance verification** at inference — a capability no URL-based system can provide.

### Version-pinned resolution
LinkID supports time-anchored resolution — retrieving the version of a source that was present at a specific date:

```
GET https://linkid.io/resolve/4f8c2a1e-...?as-of=2024-01-15
→ returns the exact content snapshot present at corpus assembly time
```

This makes training data references fully reproducible — enabling model audits, challenge responses, and compliance documentation.

---

## Actors

| Actor | Role |
|-------|------|
| Data Engineer | Registers corpus URLs with LinkID at assembly time; stores linkid:UUIDs in corpus |
| AI Researcher | Uses linkid: in model cards and training documentation for provenance |
| LinkID Resolver | Maintains URL mappings and content snapshots; serves version-pinned resolution |
| Auditor / Regulator | Verifies model provenance claims using linkid: resolution |
| End User | Can verify that a model's citation still supports the claim made |

---

## Flow

```
CORPUS ASSEMBLY:
1. Training corpus assembled from web sources
2. For each document with external references:
   a. URL submitted to LinkID API
   b. linkid:UUID returned + content snapshot stored
   c. linkid:UUID written into corpus metadata alongside raw URL
3. Corpus includes reference health baseline at assembly date

TRAINING:
4. Model trained on corpus with linkid:UUIDs in reference metadata
5. Model learns to associate claims with linkid: identifiers (not raw URLs)

INFERENCE:
6. Model generates response citing a source
7. Client resolves linkid:UUID → verifies current status
8. If LIVE: citation verified
   If DRIFTED: user alerted that source content has changed since training
   If ARCHIVED: user directed to training-time snapshot

AUDIT:
9. Auditor requests: what did linkid:UUID contain at training time?
10. Resolver returns: certified snapshot + SHA-256 hash + registration timestamp
```

---

## Benefits

- **Provenance**: every training reference has a stable, verifiable identity — not just an address
- **Reproducibility**: training runs can be fully reproduced with version-pinned source retrieval
- **Hallucination reduction**: models can distinguish "source exists and says X" from "source no longer exists"
- **Compliance**: supports EU AI Act Article 53 transparency requirements and model card documentation
- **Citation verification**: downstream users and auditors can verify model citations at any time

---

## The Provenance Gap Closed

```
Without LinkID:
  Training corpus → raw URL → model learns claim → URL breaks
  → claim unverifiable → potential hallucination at inference
  → no audit trail

With LinkID:
  Training corpus → linkid:UUID → model learns claim
  → linkid: always resolvable → claim verifiable at inference
  → full audit trail: what source said, when, with cryptographic proof
```

---

## Open Questions

- Should `linkid:` identifiers be surfaced in model outputs (citations) or remain internal to the training pipeline?
- How should models handle claims where the linked source has drifted — does the model need retraining, or is a disclaimer sufficient?
- What is the right granularity for LinkID registration — the whole document, or specific sections cited?
- How does this interact with copyright — does storing a content snapshot at training time require additional licensing?

---

## Related

- [LM-5 · Reference Integrity in AI/LLM Training Corpora](../linkmanager/lm-5-ai-training-data.md)
- [C-4 · AI Training Data Lifecycle](../combined/c-4-ai-training-lifecycle.md)
- [LID-1 · Persistent Citations in Academic Publishing](./lid-1-research-citations.md)
