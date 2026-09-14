---
description: READ ONLY. Perform a security review: secret scan, dependency audit, application security analysis. Reports findings, modifies nothing.
agent: security
---

Perform a security review of this project using the security skill:

1. **Secret scan** — grep files and git history for API keys, tokens, private keys, passwords, committed .env files.
2. **Dependency audit** — check lockfiles (uv.lock, pyproject.toml, requirements.txt, package-lock.json) for known CVEs. Report severity + remediation version.
3. **Application security** — OWASP lenses: injection, XSS/CSRF/SSRF, insecure deserialization (torch.load/pickle on untrusted input), path traversal, authz.
4. **AI-specific** — prompt injection surfaces, exposed model endpoints without auth, model/dataset provenance issues, PII in data paths.
5. **Infra** — Dockerfiles, compose, CI YAML: hardcoded credentials, exposed ports, privileged containers.

Report per finding: severity (critical/high/medium/low), file:line, description, exploitability, remediation. Distinguish FACT from INFERENCE. End with a prioritized remediation list (proposal only — builder implements with approval).