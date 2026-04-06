# Security Policy — Link Genetic GmbH

> **Version 1.0 · March 2026**  
> Contact: [security@linkgenetic.com](mailto:security@linkgenetic.com)

---

## Table of Contents

1. [Vulnerability Disclosure Policy (VDP)](#1-vulnerability-disclosure-policy-vdp)
   - [Scope](#11-scope)
   - [How to Report](#12-how-to-report)
   - [Our Commitments](#13-our-commitments)
   - [Responsible Disclosure Guidelines](#14-responsible-disclosure-guidelines)
   - [Safe Harbor](#15-safe-harbor)
2. [Bug Bounty Program](#2-bug-bounty-program)
   - [Eligible Targets](#21-eligible-targets)
   - [Out of Scope](#22-out-of-scope)
   - [Severity Tiers & Rewards](#23-severity-tiers--rewards)
   - [Eligibility](#24-eligibility)
   - [Submission Process](#25-submission-process)
   - [Legal & Confidentiality](#26-legal--confidentiality)

---

## 1. Vulnerability Disclosure Policy (VDP)

Link Genetic GmbH operates critical web identity infrastructure, including the **LinkID** persistent identifier platform and **LinkManager** services. The security of these systems is fundamental to the trust our users, partners, and customers place in us.

This policy outlines how security researchers and the public can responsibly report security vulnerabilities to us.

### 1.1 Scope

#### In Scope

| Asset | Type | Description |
|---|---|---|
| `linkid.io` | Web / API | Global Resolver Domain |
| `linkid.linkgenetic.com` | Web / API | LinkID — Primary platform |
| `linkmanager.linkgenetic.com` | Web / API | LinkManager — Primary platform |
| `linkgenetic.com` | Web | Website — Primary platform |
| `api.linkgenetic.com` | API | API Gateway — all public endpoints |
| API Services | API | LinkID API, LinkManager API, backend microservices |
| Authentication system | Web / API | Login, OAuth, token endpoints |

#### Out of Scope

- Third-party services and infrastructure not under our control
- Social engineering attacks against Link Genetic staff
- Physical security attacks
- Denial-of-service (DoS / DDoS) attacks
- Automated scanning without prior written approval
- Findings from assets not listed above

### 1.2 How to Report

| Channel | Details |
|---|---|
| **Primary** | [security@linkgenetic.com](mailto:security@linkgenetic.com) |
| **GitHub** | [Report a vulnerability](../../security/advisories/new) button on this repository |
| **Sensitive findings** | Encrypted channel available on request |

**Please include in your report:**

- A clear description of the vulnerability and its potential impact
- Step-by-step reproduction instructions
- Affected URL(s), parameter(s), or component(s)
- Proof of concept or supporting material (screenshots, scripts)
- Your severity assessment (CVSS score if possible)

### 1.3 Our Commitments

Upon receiving a valid report, Link Genetic commits to:

| Milestone | SLA |
|---|---|
| Acknowledge receipt | Within **2 business days** |
| Initial status update | Within **7 business days** of triage |
| Remediate Critical findings | Within **30 days** |
| Remediate High findings | Within **60 days** |
| Notify researcher on resolution | Upon fix deployment |

We will not pursue legal action against researchers acting in good faith under this policy. With your consent, we will credit your contribution in our **Security Hall of Fame**.

### 1.4 Responsible Disclosure Guidelines

Researchers must:

- Only test against accounts and data they own or have explicit permission to access
- Avoid accessing, modifying, or deleting data beyond what is necessary to demonstrate the issue
- Not publicly disclose the vulnerability without our coordination (**90-day embargo**)
- Not perform automated or mass scanning without prior written approval
- Act in good faith to avoid privacy violations, disruption of services, or harm to users

### 1.5 Safe Harbor

Link Genetic considers responsible security research conducted in accordance with this policy to be **authorized activity**. We will not pursue civil or criminal action against researchers who comply with these guidelines, and we do not consider such activity a violation of any applicable computer abuse laws or our terms of service.

If legal action is initiated by a third party, we will make clear to the relevant authorities that your activity was conducted under this policy.

---

## 2. Bug Bounty Program

> ⚠️ **Program Status:** This program is currently in **private/discretionary mode**. We are working toward a formal public launch. All submissions are reviewed and rewarded at Link Genetic's discretion.

This program complements the VDP above and defines reward tiers, scope, and eligibility criteria. As a trust infrastructure company, the integrity and reliability of our systems is paramount — we reward researchers who help us maintain the highest security standards.

### 2.1 Eligible Targets

| Target | Type | Notes |
|---|---|---|
| `linkid.io` | Web / API | Global Resolver Domain |
| `linkid.linkgenetic.com` | Web / API | LinkID — Primary platform · **highest priority** |
| `linkmanager.linkgenetic.com` | Web / API | LinkManager — Primary platform · **highest priority** |
| `linkgenetic.com` | Web | Website — Primary platform · **highest priority** |
| `api.linkgenetic.com` | API | API Gateway — all public endpoints |
| API Services | API | LinkID API, LinkManager API, backend microservices |
| Authentication system | Web / API | Login, OAuth, token endpoints |

### 2.2 Out of Scope

The following vulnerability types are **not eligible for rewards:**

- Self-XSS with no meaningful impact
- Clickjacking on pages without sensitive actions
- Missing HTTP security headers (without demonstrable impact)
- Brute-force attacks without account lockout bypass
- Open redirect without chained impact (e.g., OAuth token theft)
- Theoretical vulnerabilities without a working proof of concept
- Findings from third-party components not under our control
- Automated scan output without manual validation

### 2.3 Severity Tiers & Rewards

Severity is assessed using **CVSS v3.1**, combined with our assessment of actual business impact on Link Genetic's trust infrastructure.

| Severity | CVSS Score | Examples | Reward (CHF) |
|---|---|---|---|
| 🔴 **Critical** | 9.0 – 10.0 | Remote code execution, auth bypass, full data breach | 500 – 2'000 |
| 🟠 **High** | 7.0 – 8.9 | Privilege escalation, significant data exposure, SSRF | 200 – 500 |
| 🟡 **Medium** | 4.0 – 6.9 | Stored XSS, CSRF on sensitive actions, IDOR | 50 – 200 |
| 🟢 **Low** | 0.1 – 3.9 | Info disclosure, minor misconfigurations | 0 – 50 |

> Final reward amounts are at Link Genetic's sole discretion. Duplicate submissions, out-of-scope findings, or violations of the VDP guidelines are not eligible for rewards.

### 2.4 Eligibility

To be eligible for a reward, researchers must:

- Be the **first** to report the vulnerability
- Comply with all guidelines in this policy and the VDP
- Not be a current or former employee, contractor, or affiliate of Link Genetic
- Not be a resident of a country subject to Swiss export restrictions or **SECO sanctions**
- Provide a complete, reproducible report with proof of concept
- Allow a minimum of **90 days** for remediation before public disclosure

### 2.5 Submission Process

```
Step 1 — Submit
  Send your report to security@linkgenetic.com
  For highly sensitive findings, request an encrypted channel

Step 2 — Triage
  Acknowledgement within 2 business days
  Initial severity assessment within 7 business days

Step 3 — Validation
  Security team reproduces and validates the issue
  May request follow-up questions
  Typically 7–21 business days depending on complexity

Step 4 — Remediation
  Fix deployed within VDP timelines
  Researcher notified and may be asked to verify the patch

Step 5 — Reward
  Reward determined upon fix confirmation
  Payment via bank transfer (IBAN) or mutually agreed method
  Processed within 30 days of fix confirmation
```

### 2.6 Legal & Confidentiality

All submissions are treated as confidential. By submitting, you agree:

- Not to publicly disclose the vulnerability without Link Genetic's written consent and a minimum **90-day coordinated disclosure window**
- That Link Genetic may use the information in the report solely for security improvement purposes
- That multiple researchers submitting the same issue are eligible only if the first submission is incomplete; in such cases the reward may be shared

---

*Link Genetic GmbH reserves the right to modify this policy at any time. Changes will be communicated via our website at [linkgenetic.com/security](https://linkgenetic.com/security).*
