# UC-4 · Reference Archival at Citation Time

**Product**: LinkID  
**Problems**: Link Rot · Content Drift  
**Priority**: Medium  
**Hackathon Demo**: 🔲 Stretch goal

---

## Problem

Wikipedia editors are encouraged to archive cited URLs (e.g. via the Wayback Machine) but this is largely manual and inconsistent. Even when an archive exists, the `|archive-url=` and `|archive-date=` parameters must be populated by hand — and the archive snapshot may not correspond to the version the editor actually consulted.

The result is that most citations have no archived copy, and those that do may have an archive timestamp that doesn't match the claim being cited.

---

## Solution with LinkID

When a LinkID is registered, the resolver **immediately triggers an archival snapshot** at registration time:

1. The live resource is fetched and stored in the LinkID resolver's internal archive
2. Simultaneously, a save request is sent to the Internet Archive (Wayback Machine)
3. Both snapshot URLs are stored with the LinkID record

This means that every registered citation has:
- A **resolver-managed snapshot** under LinkID governance
- An **independent Wayback Machine copy** as a public backup
- A **content hash** to prove integrity

```json
{
  "linkid": "linkid:7e96f229-21c3-4a3d-a6cf-ef7d8dd70f24",
  "original_url": "https://example.org/article",
  "registered_at": "2026-05-02T14:22:00Z",
  "snapshots": [
    {
      "type": "linkid-internal",
      "url": "https://archive.resolver.linkgenetic.com/snap/7e96f229/20260502",
      "hash": "sha256:a3f9..."
    },
    {
      "type": "wayback",
      "url": "https://web.archive.org/web/20260502142200/https://example.org/article",
      "hash": "sha256:a3f9..."
    }
  ]
}
```

---

## Benefits over Current Practice

| Current practice | With LinkID |
|-----------------|-------------|
| Archive is optional and manual | Archive is automatic at registration |
| Archive timestamp may not match citation date | Snapshot timestamp is precisely the moment of citation |
| `\|archive-url=` must be filled manually | Template can derive archive URL from LinkID metadata |
| Only one archive copy | Multiple redundant copies |
| No content hash | SHA-256 hash proves integrity |

---

## Integration with `{{cite web}}`

The `|linkid=` parameter (see UC-3) allows templates to auto-surface the archive link:

```wikitext
{{cite web
 |url    = https://example.org/article
 |title  = Study on X
 |linkid = linkid:7e96f229-21c3-4a3d-a6cf-ef7d8dd70f24
}}
```

Rendered output would automatically include a `[archived]` link pointing to the Wayback snapshot stored at registration time — without requiring the editor to manually add `|archive-url=` or `|archive-date=`.

---

## On-Premise Deployment Note

For Wikimedia's deployment, the archival layer can run fully on WMF infrastructure:
- No dependency on the Link Genetic resolver
- Snapshots stored in WMF's own object storage
- Resolver logic open-sourced under LPIL (Public Interest License)

This satisfies the **data sovereignty** requirements discussed with Wikimedia CH.

---

## Open Questions for Hackathon

- Should the LinkID resolver integrate with the Internet Archive Availability API or trigger saves independently?
- What is the right long-term storage model for WMF — S3-compatible object storage, HDFS, or defer to IA?
- How should conflicting snapshots (LinkID vs. existing Wayback copy) be surfaced to editors?

---

## Related

- [UC-1 · Link Rot Detection & Automated Healing](../linkmanager/uc-1-link-rot-detection.md)
- [UC-2 · Content Drift Alerting](../linkmanager/uc-2-content-drift-alerting.md)
- [UC-3 · `{{cite web}}` Template Integration](./uc-3-cite-web-template.md)
