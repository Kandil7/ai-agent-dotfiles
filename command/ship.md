---
description: Prepare for deployment/shipping: run tests, lint, build, review the release checklist, verify container readiness. Does not commit or push unless asked.
agent: mlops
---

Prepare this project for shipping: $ARGUMENTS

Run the ship checklist:

1. **Tests** — full test suite + lint + typecheck pass (run them; do not assume).
2. **Build** — the project's build step works (python build, npm build, docker build, etc.).
3. **Diff review** — scan the diff for: secrets, debug code, leftover TODOs, large binaries, accidental D:\AI paths or checkpoints in Git.
4. **Dependencies** — pinned and audited (uv lock, npm lock); known CVEs flagged.
5. **Security quick pass** — exposed endpoints, auth, secrets in configs.
6. **Container readiness** (if applicable) — Dockerfile reproducible (pinned tags), GPU passthrough verified, .dockerignore excludes D:\AI and checkpoints, health endpoint present.
7. **Docs** — docs/CHANGELOG or release notes updated if the project keeps them; docs/PROJECT-CHECKPOINT.md refreshed.
8. **Model artifacts** (if applicable) — checkpoint files present and not corrupted, model card exists, eval metrics documented, model size within deployment constraints.
9. **Release checklist report** — for each item: PASS/FAIL/WARN with evidence.

Rules: do not commit, tag, or push unless the user explicitly asks. If anything fails, stop and report the failure with a proposed fix.