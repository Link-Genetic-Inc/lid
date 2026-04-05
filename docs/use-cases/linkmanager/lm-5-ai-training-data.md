# LM-5 · Reference Integrity in AI/LLM Training Corpora

**Product**: LinkManager  
**Problem**: Link Rot · Content Drift  
**Sector**: AI / Machine Learning  
**Status**: Draft

---

## Problem

Large Language Models (LLMs) are trained on vast corpora of web content — including Wikipedia, Common Crawl, and curated document collections. These corpora contain hundreds of millions of hyperlinks and citations. A significant share of those links are broken or point to content that has changed since the training data was collected.

The consequences are compounding and largely invisible:

- **Broken references** in training data mean the model learns that certain claims are supported by sources that no longer exist — or never existed at the time of training
- **Content drift** means the model may have learned a claim as "cited and verified" when the source has since been retracted, updated, or replaced with entirely different content
- **Version opacity** means there is no way to verify which version of a source the model actually learned from — making provenance claims impossible

This is not a marginal data quality issue. It is a structural flaw in how AI systems ingest and represent knowledge — and it compounds silently with every training run.

**Example**:
```
A Wikipedia article cited in a 2022 training corpus contains:
  <ref>{{cite web |url=https://health-institute.org/report/study-2021}}</ref>

By the time the model is trained, the URL returns 404.
The model learns the claim as "sourced" — but the source is gone.
In 2024, the model confidently reproduces the claim with no valid basis.
```

---

## Solution with LinkManager

LinkManager monitors the URLs in AI training corpora — treating each document as a collection of references that must be verified before and during training data curation.

### Pre-training corpus audit
Before a training run, LinkManager crawls all URLs in the corpus and produces a **reference health report**:

```
Corpus: Wikipedia EN snapshot 2024-01
Total external references: 84,231,400
  Live:            71,840,200  (85.3%)
  Redirected:       4,210,300  ( 5.0%)
  Dead (404/410):   5,180,900  ( 6.1%)
  Soft 404:         1,890,000  ( 2.2%)
  Content drifted:  1,110,000  ( 1.3%)

Recommended action:
  Dead + Soft 404 → substitute Wayback snapshot or flag for exclusion
  Drifted → flag for human review before inclusion in training set
```

### Corpus cleaning pipeline
LinkManager integrates into the data pipeline:

```
Raw corpus
  → LinkManager crawl: classify each URL (live / dead / drifted)
  → Dead links: substitute archived snapshot URL (with date)
  → Drifted links: flag with drift score and both versions (original + current)
  → Clean corpus: all references verified, versioned, and traceable
  → Training run
```

### Ongoing monitoring
For continuously updated training corpora (e.g. RAG systems, knowledge bases):
- LinkManager monitors reference URLs on a rolling schedule
- Alerts when a previously valid training reference breaks or drifts
- Enables targeted re-training or knowledge base updates on affected claims

---

## Actors

| Actor | Role |
|-------|------|
| AI/ML Engineer | Integrates LinkManager into training data pipeline |
| Data Curator | Reviews drift alerts; decides to include, exclude, or substitute references |
| LinkManager | Crawls corpus URLs; classifies failures; produces health reports |
| Internet Archive | Source for archived snapshots used to substitute dead references |
| AI Model | Trained on a corpus with verified, traceable references |

---

## Flow

```
PRE-TRAINING:
1. Training corpus assembled (e.g. Wikipedia snapshot + Common Crawl subset)
2. LinkManager ingests URL inventory from corpus
3. Bulk crawl: each URL classified (live / redirected / dead / soft-404 / drifted)
4. Dead URLs → Wayback Machine query → snapshot substituted if available
5. Drifted URLs → flagged with drift score + both content versions
6. Clean corpus produced with reference health metadata per document
7. Training run proceeds on verified corpus

POST-TRAINING / RAG:
8. LinkManager monitors reference URLs on rolling schedule
9. Alert triggered when training reference breaks or drifts
10. Affected claims identified in model knowledge base
11. Targeted update or re-training triggered
```

---

## Benefits

- **Provenance**: every claim in the training corpus has a verifiable, time-stamped reference
- **Reliability**: models trained on clean corpora make fewer unsupported or hallucinated claims
- **Auditability**: health report documents which references were live, substituted, or excluded at training time
- **Compliance**: increasingly required by AI governance frameworks (EU AI Act, model cards)
- **RAG integrity**: retrieval-augmented systems stay accurate as referenced content changes

---

## Relationship to the AI Hallucination Problem

A significant share of LLM hallucinations are not fabrications — they are claims that were once supported by a valid source that has since disappeared or changed. LinkManager addresses this at the data layer, before the model ever learns the claim.

```
Without LinkManager:
  Broken reference → model learns unsupported claim → hallucination at inference

With LinkManager:
  Broken reference → detected → substituted or excluded → model never learns unsupported claim
```

---

## Open Questions

- What is the right policy for dead references with no archive: exclude the claim, flag it, or include with a "reference unavailable" annotation?
- Should drift detection be applied to the source document at training time, or continuously post-training?
- How should reference health metadata be surfaced in model cards and training documentation?
- Does substituting an archived snapshot (rather than the live URL) introduce its own bias — anchoring the model to a historical version of a source?

---

## Related

- [LID-5 · Stable References in AI Training Data](../linkid/lid-5-ai-training-data.md)
- [C-4 · AI Training Data Lifecycle](../combined/c-4-ai-training-lifecycle.md)
- [LM-1 · Broken Link Detection in Institutional Repositories](./lm-1-institutional-repository.md)
