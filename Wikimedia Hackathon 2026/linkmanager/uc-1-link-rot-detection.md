# UC-1 · Link Rot Detection & Automated Healing

**Product**: LinkManager  
**Problem**: Link Rot  
**Priority**: High  
**Hackathon Demo**: ✅ Planned

---

## Problem

Wikipedia articles are documents containing hundreds of millions of cited URLs. When a cited URL returns a 4xx/5xx error or the domain expires, the reference becomes a dead end for readers and editors. Wikipedia currently relies on periodic bot sweeps (e.g. InternetArchiveBot) to detect and patch broken links — but this is reactive, slow, and incomplete.

**Example**:
```
<ref>{{cite web |url=https://example-journal.org/paper/12345 |title=Study on X}}</ref>
```
Six months later, `example-journal.org` migrates to a new domain. The URL returns 404.
The citation is silently broken. Readers hit a dead end. Editors may never notice.

---

## Solution with LinkManager

LinkManager monitors all URLs inside Wikipedia articles (treating each article as a document). It continuously checks the availability of every cited URL and — when a URL breaks — automatically attempts to heal it.

### Detection
LinkManager crawls all cited URLs on a configurable schedule:
- HTTP status checks (404, 410, 5xx, timeout)
- Redirect chain analysis (permanent vs. temporary, redirect loops)
- Soft 404 detection (page loads but citation target is missing)

### Healing
When link rot is detected, LinkManager attempts repair in order:

| Step | Action |
|------|--------|
| 1 | Check if resource moved — follow redirect chain to new URL |
| 2 | Query Internet Archive for a snapshot near the original citation date |
| 3 | If snapshot found → substitute archive URL (automatic or editor-confirmed) |
| 4 | If no snapshot → flag in maintenance dashboard for human review |

```
URL: https://example-journal.org/paper/12345  →  STATUS: 404

LinkManager healing:
  Step 1: redirect check → no forwarding record found
  Step 2: Wayback Machine query → snapshot found: 2023-10-15
  Step 3: archive URL substituted → {{cite web |url=... |archive-url=... |archive-date=2023-10-15}}
  Step 4: Wikipedia article updated; edit logged
```

---

## Actors

| Actor | Role |
|-------|------|
| Wikipedia Editor | Authors citations; LinkManager monitors them automatically |
| LinkManager | Crawls article URLs, detects rot, proposes or applies repairs |
| Internet Archive | Source for archived snapshots used in healing |
| Maintenance Bot | Applies approved repairs to Wikipedia articles at scale |
| Reader | Always reaches a valid resource — healing is transparent |

---

## Flow

```
1. LinkManager ingests URL inventory from Wikipedia (via API or sitemap)
2. Scheduled crawl checks each cited URL:
   a. Live → no action
   b. Redirected → log new URL; propose article update
   c. Dead → attempt healing (archive substitution)
   d. Unrecoverable → flag for editor review
3. Approved repairs applied to Wikipedia article wikitext:
   {{cite web |url=original |archive-url=wayback-url |archive-date=YYYY-MM-DD}}
4. Edit logged with summary: "LinkManager: healed broken citation (UC-1)"
5. Monthly health report: broken links detected, healed, and pending review
```

---

## Benefits

- Proactive monitoring — broken links caught before readers encounter them
- Automatic healing — archive substitution applied without editor intervention
- Complements InternetArchiveBot — more frequent monitoring, richer repair logic
- Full audit trail — every detection and repair event logged with timestamp

---

## Relationship to LinkID (UC-3)

LinkManager heals existing broken URLs **reactively**. LinkID (UC-3) prevents future rot **structurally** by assigning a persistent `linkid:` identifier at citation time. The two are complementary:

- **LinkManager**: repairs the existing corpus as URLs break
- **LinkID**: ensures new citations never break in the first place
- **UC-6**: the migration bridge — LinkManager identifies vulnerable URLs; LinkID permanently replaces them

---

## Open Questions for Hackathon

- What crawl frequency is appropriate for Wikipedia's scale without burdening external servers?
- Should healed citations be applied automatically or always require editor confirmation?
- How should LinkManager interact with the existing InternetArchiveBot — separate tool or integrated patch?
- What is the right MediaWiki hook for applying repairs programmatically?

---

## Related

- [UC-2 · Content Drift Alerting](./uc-2-content-drift-alerting.md)
- [UC-6 · Bot-Assisted Migration](./uc-6-bot-assisted-migration.md)
- [UC-3 · LinkID Integration in `{{cite web}}`](../linkid/uc-3-cite-web-template.md)
