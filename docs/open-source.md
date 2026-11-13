# LinkID Open-Source Initiative

### Link Genetic GmbH – Switzerland
*Stay Unbroken. The Future Is Unbroken and Trustful.*

---

## Purpose

The **LinkID Persistent Identifier** is designed to become an **open,
interoperable, and community-driven standard** for resilient hyperlinks.
Our objective is long-term **traceability and maintained resolution** for
references on websites, in documents and in archives. Persistence requires
ongoing stewardship, available targets and authorized mapping changes; it is
not a guarantee that every destination will remain available forever.

---

## Scope of the Open-Source Release

| Category | Status | Description |
|-----------|--------|-------------|
| **Core Specification** | Open | `linkid:` namespace definition, resolution algorithm, metadata schema |
| **Client SDK Libraries** | Open | JavaScript/TypeScript, Python, Java client libraries |
| **Contract Tests** | Open | Isolated tests for the public resolve-only SDK contract; not certification of federation |
| **IETF Internet-Draft** | Open | URI scheme definition |
| **Server Implementations** | Licensed | Available under Enterprise License (LEL) or Public Interest License (LPIL) |
| **Advanced Resolver (AI)** | Licensed | AI-based semantic repair and analytics engine |
| **Commercial SaaS** | Licensed | LinkManager, Enterprise Resolver, LinkGenetic Cloud |
| **Trademarks / Branding** | Protected | "LinkID", "Link Genetic", and related marks |

---

## License

The repository root and all three client SDKs use **Apache-2.0**; each SDK also
includes its license file. SDK **1.0.1** is published on npm, PyPI and Maven
Central. The public SDKs provide unauthenticated resolution, not minting,
editing or deletion.

- Apache-2.0 permits use of the covered repository code in non-commercial,
  public-interest and commercial projects, subject to its terms.
- Link Genetic's proprietary hosted platform and server code are not included
  in this repository. Enterprise (LEL) and Public Interest (LPIL) licensing
  concern separately supplied products and agreements, not an additional
  restriction on Apache-2.0 repository code.
- Earlier descriptions of LCL / triple licensing are historical and do not
  replace the current `LICENSE` or `PATENTS.md`.

For full license terms, see the [LICENSE](../LICENSE) file.

---

## How to Contribute

- Fork the repository and submit pull requests
- Discuss ideas via GitHub Issues or Discussions
- **Sign the Contributor License Agreement (CLA) before your first PR**
- Follow our [Contribution Guide](CONTRIBUTING.md)

Contributions are welcome for client SDK libraries, documentation,
conformance tests, and specification editorial improvements.

---

## Patent Notice

Patent application **CH P220889** is an application, not a statement that a
patent has been granted. The existing [Patent Promise](../PATENTS.md) applies
to Necessary Claims for implementations of its explicitly Covered
Specifications, including open-source and commercial implementations, under
the Promise's terms. It does not license the proprietary platform or unrelated
features. No licensing or patent grant is changed by this documentation update.

For details: https://linkgenetic.com/licenses

---

## Reference Documents

- [Independent LinkID architecture notes](../spec/index.html)
- [Official IETF Internet-Draft (-01)](https://datatracker.ietf.org/doc/draft-linkgenetic-linkid-uri/01/)
- [Editable URI draft working copy](../spec/draft-linkgenetic-linkid-uri-01.md)
- [Historical revision -00](../draft/draft-linkgenetic-linkid-uri-00.md)
- [Namespace Registration (IANA linkid)](https://www.iana.org/assignments/uri-schemes/prov/linkid)

---

## Vision

By releasing the LinkID client libraries and specification under an open
license, we aim to foster collaboration among universities, governments,
and enterprises to build the next generation of **resilient web
infrastructure**.

> Every link should live forever.
> **Stay Unbroken.**
