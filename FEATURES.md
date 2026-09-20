# LinkID Features

LinkID combines persistent identifiers with developer tools and integrations that bring reliable links into websites, browsers, and everyday documents.

## Hover Card Preview

Add LinkID stability, trust, and metadata previews to external links on your website with one script tag:

```html
<script src="https://linkid.io/embed/linkid-hover.js"></script>
```

Add the script once, preferably immediately before the closing `</body>` tag. It automatically discovers external HTTP(S) links, looks up matching LinkIDs, and displays a card when a registered LinkID is available. Original destinations are not rewritten. Dynamically added links are detected automatically.

Optional configuration:

```html
<script
  src="https://linkid.io/embed/linkid-hover.js"
  data-theme="dark"
  data-concurrency="4"
  data-cache="60">
</script>
```

> GitHub README files do not execute custom JavaScript. Use this embed on websites and web applications that allow third-party scripts.

[Open the Hover Card developer guidance](https://linkid.linkgenetic.com/developers#hover-card-guidance)

## Browser Extensions

LinkID browser extensions support controlled LinkID workflows inside Chrome, Microsoft Edge, Firefox, and Safari. Operators can create, resolve, check, and explicitly recover links without silently rewriting pages or uploading entire bookmark collections.

Key capabilities include:

- LinkID creation and resolution from the active browser workflow
- Explicit link and bookmark recovery actions
- Local-first bookmark checks
- Account-bound browser pairing without distributing API keys
- Packages and installation guidance for supported browsers

[Open the Browser Extension operations guide](https://linkid.linkgenetic.com/browser-extension)

## Microsoft Office Integration

LinkID add-ins bring persistent-link workflows into Microsoft 365 with host-specific safeguards:

- **Word** — create and inspect LinkIDs from a selected URL
- **Excel** — work with a selected URL cell and bounded range analysis
- **PowerPoint** — create LinkIDs from a selected linked shape
- **Outlook** — resolve or inspect explicit message URLs without changing messages or drafts

The Office integration supports controlled local installation and centralized Microsoft 365 Admin Center deployment using host-specific XML manifests. Authentication uses managed browser pairing; API keys are not placed in manifests.

[Open the Microsoft Office integration guide](https://linkid.linkgenetic.com/office-plugins)

## SDKs and APIs

The public resolve-only SDKs are available for JavaScript/TypeScript, Python, and Java. The Developer Portal also documents REST APIs, the MCP server for AI assistants, connectors, global resolution, and semantic-web resources.

[Open the Developer Portal](https://linkid.linkgenetic.com/developers)
