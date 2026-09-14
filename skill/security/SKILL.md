---
name: security
description: Security review and secret detection. Use when the user says "security", "audit", "secrets", "vulnerability", "CVE", "is my code secure", or when the /security command is invoked.
---

# Security Review Method

## 1. Secret scan

Patterns to grep (in files AND git history):

- API keys: `sk-`, `AKIA`, `AIza`, `ghp_`, `xoxb-`, `Bearer ` in configs.
- Private keys: `-----BEGIN (RSA|EC|OPENSSH|PGP) PRIVATE KEY-----`.
- Passwords/tokens: `password\s*[:=]`, `token\s*[:=]`, `secret\s*[:=]`, `.env` files committed, connection strings with credentials.
- Auth config: `opencode auth` style credential files, `.npmrc`, `pip.conf`, `.netrc`.

## 2. Dependency audit

- Python: `pip-audit` or `uv audit` against the lock file.
- Node: `npm audit`.
- Report CVEs with severity and remediation version.

## 3. Application code review (OWASP Top 10 lenses)

- Injection (SQL/command/prompt), XSS, CSRF, SSRF, insecure deserialization, path traversal, authz flaws, broken access control, insecure defaults, logging of sensitive data.

## 4. AI/ML specific

- Untrusted `torch.load` / pickle (CVE-2024-5480 class) — never load weights from untrusted sources.
- Prompt injection surface in RAG/agent systems.
- Exposed model endpoints without auth/rate limits.
- Training data provenance and PII in datasets.

## Report

- Severity (critical/high/medium/low), file:line, exploitability, remediation.
- FACT vs INFERENCE labels. Proposal only — the builder implements with approval.