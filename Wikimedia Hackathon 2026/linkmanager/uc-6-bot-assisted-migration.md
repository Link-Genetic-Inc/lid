# UC-6 · Bot-Assisted Migration of Legacy References

**Category**: Maintenance Tooling  
**Priority**: Medium  
**Hackathon Demo**: 🔲 Stretch goal

---

## Problem

Wikipedia has hundreds of millions of existing citations that predate any persistent identifier system. Even with a perfect LinkID integration for *new* citations, the legacy corpus remains fragile. A scalable mechanism is needed to retroactively bring existing citations under persistent identifier governance.

---

## Solution with LinkID

A MediaWiki bot (extending or complementing InternetArchiveBot) can work through existing articles and:

1. Find all `{{cite web}}`, `{{cite news}}`, `{{cite journal}}` etc. without a `|linkid=`
2. For each citation URL, call the LinkID registration API
3. Retrieve the assigned `linkid:UUID`
4. Edit the article to add `|linkid=linkid:UUID` to the citation template
5. Optionally: populate `|archive-url=` and `|archive-date=` from the resolver's snapshot metadata

This is a purely additive edit — no existing content is removed or changed.

### Prioritization Strategy

Given the scale (hundreds of millions of citations), the bot should prioritize:

| Priority | Criteria |
|----------|----------|
| 1 (highest) | Citations already flagged as broken (by existing bots) |
| 2 | Citations in Featured Articles and Good Articles |
| 3 | Citations with high reader traffic (based on page view data) |
| 4 | Citations in articles tagged with maintenance templates |
| 5 | All remaining citations (long-tail) |

---

## Bot Workflow

```
FOR EACH article (prioritized):
  FOR EACH {{cite web}} without |linkid=:
    url = extract |url= parameter
    IF url is valid HTTP/HTTPS:
      linkid = POST /api/v1/register { url }
      ADD |linkid=linkid:UUID to template
      IF snapshot available:
        ADD |archive-url= and |archive-date= (if not already present)
    WAIT rate_limit_interval
  SAVE article edit with summary:
    "Bot: added LinkIDs for reference resilience (see [[T422252]])"
```

---

## Relationship to InternetArchiveBot

[InternetArchiveBot](https://en.wikipedia.org/wiki/User:InternetArchiveBot) already:
- Detects dead links
- Adds `|archive-url=` from the Wayback Machine

LinkID migration bot would:
- Register URLs *before* they die (proactive)
- Add a persistent `|linkid=` rather than a static archive URL
- Enable future drift detection (not just 404 detection)

The two bots are complementary. An ideal long-term solution would integrate LinkID registration directly into InternetArchiveBot.

---

## On-Premise / Sovereignty Note

The bot registration calls can point to a WMF-hosted resolver, ensuring all LinkID data stays within Wikimedia infrastructure. The Link Genetic resolver is not required.

---

## Open Questions for Hackathon

- What is the bot approval process at English Wikipedia for this type of additive citation edit?
- Should the bot run on Wikimedia Cloud Services (Toolforge)?
- Rate limits: how many citation registrations per day is feasible without burdening the resolver?
- Should this be a new bot, or a patch to InternetArchiveBot?

---

## Related

- [UC-1 · Link Rot Detection & Automated Healing](./uc-1-link-rot-detection.md)
- [UC-3 · `{{cite web}}` Template Integration](./uc-3-cite-web-template.md)
- [UC-4 · Reference Archival at Citation Time](./uc-4-reference-archival.md)
