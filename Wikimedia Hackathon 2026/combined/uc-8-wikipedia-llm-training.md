# UC-8 · Wikipedia as LLM Training Data — Reference Integrity at AI Scale

**Products**: LinkManager + LinkID (Combined)  
**Problems**: Link Rot · Content Drift  
**Priority**: Medium  
**Hackathon Demo**: 🔲 Discussion topic

---

## Problem

Wikipedia is one of the most important training sources for Large Language Models. It is present in virtually every major LLM training corpus — GPT, LLaMA, Gemini, and others all incorporate Wikipedia data in substantial volumes.

Wikipedia's references are therefore not just a quality issue for human readers — they are a **data integrity issue for AI systems at global scale**.

When an LLM is trained on a Wikipedia snapshot containing broken or drifted references, the model learns that certain claims are "cited and verified" — even though the cited source no longer exists, or no longer says what it once said. This is a structural contributor to AI hallucination that operates at the data layer, before training even begins.

**The scale is significant:**

```
English Wikipedia alone:
  ~6.7 million articles
  ~84 million external references
  ~6–8% broken (link rot)           → ~5–6 million broken references per training snapshot
  ~1–2% significantly drifted        → ~1 million drifted references per training snapshot

Every LLM trained on Wikipedia inherits this reference decay.
```

---

## Why This Matters for the Wikimedia Community

This is not only an AI company's problem — it is Wikimedia's problem too:

- Wikipedia's reputation as a reliable source underpins its value as training data. If LLMs trained on Wikipedia produce hallucinations that trace back to broken Wikipedia references, this reflects on Wikipedia's credibility.
- Wikimedia's mission is the free sharing of knowledge. Knowledge that cannot be verified — because the references supporting it are gone — is not freely accessible in any meaningful sense.
- The Wikimedia Foundation has a direct interest in ensuring that AI systems built on Wikipedia data represent that knowledge accurately and with full provenance.

---

## Solution: LinkManager + LinkID at Training-Data Scale

### LinkManager — clean Wikipedia before it enters training corpora

LinkManager can be run against Wikipedia snapshots (the same Wikimedia dumps used by AI companies for training) to produce a **reference health layer**:

```
Wikipedia EN dump 2024-01:
  84M references audited
  5.2M dead → Wayback snapshots substituted
  1.1M drifted → flagged with drift score and both content versions
  Output: health-annotated Wikipedia dump, suitable for clean training
```

This annotated dump can be published by Wikimedia as a companion to the standard Wikipedia dumps — giving AI companies a verified, clean reference layer as a public good.

### LinkID — persistent identifiers in Wikipedia references

As Wikipedia citations are migrated to `linkid:` (see UC-3 and UC-6), every reference in the encyclopedia gains a stable, version-pinned identifier. Wikipedia snapshots used for AI training would then carry `linkid:` identifiers that:

- Remain resolvable indefinitely (no more broken references in future training corpora)
- Carry content snapshots anchored to the date of citation
- Enable version-pinned retrieval: AI systems can always access the exact version of a source that Wikipedia cited

```
Wikipedia article (future state):
  {{cite web |url=... |linkid=linkid:UUID |date=2024-01-15}}

LLM training corpus entry:
  claim: "..."
  source: linkid:UUID
  snapshot: https://archive.linkid.io/UUID/20240115
  hash: sha256:a3f9...
  status: VERIFIED_AT_TRAINING
```

---

## Actors

| Actor | Role |
|-------|------|
| Wikimedia Foundation | Publishes health-annotated Wikipedia dumps as a public good |
| AI Company / Researcher | Ingests clean, linkid:-annotated Wikipedia dumps for training |
| LinkManager | Audits Wikipedia dumps; produces reference health layer |
| LinkID Resolver | Provides version-pinned resolution for Wikipedia citations at training time |
| Wikipedia Editor | Benefits: citations are more credible and verifiable in AI-generated content |
| End User | Can verify AI-generated claims that cite Wikipedia via linkid: |

---

## Flow

```
NEAR-TERM (LinkManager only):
1. LinkManager runs against each Wikipedia dump release
2. Reference health layer produced (dead / drifted / live per citation)
3. Annotated dump published alongside standard Wikipedia dumps at dumps.wikimedia.org
4. AI companies ingest clean dump → training data has verified references

LONGER-TERM (LinkID integration):
5. Wikipedia citations progressively migrated to linkid: (via UC-3 + UC-6)
6. Wikipedia dumps include linkid:UUIDs per citation
7. AI training corpora carry persistent, version-pinned references
8. LLMs trained on this data can surface linkid: at inference
9. Users can verify AI citations via linkid: resolution
```

---

## Benefits

- **AI hallucination reduction**: models trained on verified, linkid:-annotated Wikipedia data have a documentable, auditable knowledge basis
- **Wikimedia credibility**: Wikipedia's value as a training source is strengthened — cleaner references mean better-quality AI outputs attributable to Wikipedia
- **Public good**: a health-annotated Wikipedia dump is a resource the entire AI research community benefits from
- **Transparency**: AI companies can document their use of Wikipedia with full provenance, satisfying emerging regulatory requirements (EU AI Act)
- **Feedback loop**: if AI companies surface which Wikipedia references were most frequently broken in their training data, this feeds back into Wikipedia's maintenance priorities

---

## Connection to Existing Wikimedia Infrastructure

This use case connects directly to work already underway:

- **InternetArchiveBot** (Cyberpower678): already detects and repairs broken Wikipedia references — the exact input LinkManager needs to scale further
- **Wikimedia dumps**: already published at dumps.wikimedia.org — a health annotation layer is a natural extension
- **ORES / Lift Wing**: Wikimedia's existing ML infrastructure for article quality — reference health is a natural quality signal to add

---

## Open Questions for Hackathon

- Is Wikimedia Foundation open to publishing a reference-health-annotated Wikipedia dump alongside standard dumps?
- What is the right format for reference health metadata in a Wikipedia dump — additional XML fields, a companion JSON file, or inline wikitext annotations?
- Should this be a Wikimedia-operated service, or a community tool running on Wikimedia Cloud?
- How should the Wikimedia community respond when AI companies produce hallucinations traceable to broken Wikipedia references?
- Does publishing a health-annotated dump create any legal or editorial obligations for Wikimedia?

---

## Related

- [UC-1 · Link Rot Detection & Automated Healing](../linkmanager/uc-1-link-rot-detection.md)
- [UC-2 · Content Drift Alerting](../linkmanager/uc-2-content-drift-alerting.md)
- [UC-3 · LinkID Integration in `{{cite web}}`](../linkid/uc-3-cite-web-template.md)
- [UC-6 · Bot-Assisted Migration](../linkmanager/uc-6-bot-assisted-migration.md)
- [C-4 · AI Training Data Lifecycle (general)](../../docs/use-cases/combined/c-4-ai-training-lifecycle.md)
