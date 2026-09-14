---
description: READ ONLY. Inspect the current project: architecture, dependencies, entry points, tests, risks, technical debt, TODOs, security concerns. Reports, modifies nothing.
agent: architect
---

Inspect the current project and report:

1. **Architecture** — structure, main components, how they fit together, entry points.
2. **Dependencies** — from lockfiles (uv.lock / pyproject.toml / package.json / requirements), with versions.
3. **Entry points** — CLI scripts, app servers, training scripts, notebooks.
4. **Tests** — what exists, how to run them, current status (run them if cheap).
5. **Risks** — correctness, performance, VRAM/memory, security, maintainability.
6. **Technical debt** — hacks, dead code, missing abstractions, deprecated APIs.
7. **TODOs** — any TODO/FIXME/HACK markers and what they block.
8. **Security concerns** — secrets, unsafe patterns, vulnerable dependencies.

For AI/ML projects, also report: GPU memory budget of any training/inference code, dataset locations, checkpoint hygiene (anything large in Git?).

Format: concise structured report. Distinguish FACT (verified) from INFERENCE (suspected). End with the top 3 risks and recommended next steps.