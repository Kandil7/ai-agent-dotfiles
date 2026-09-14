---
description: Build and sharpen the project's domain model. Challenge terms, stress-test scenarios, update CONTEXT.md and ADRs.
argument-hint: "What aspect of the domain to focus on?"
---

Sharpen the domain model for: $ARGUMENTS

Follow the domain-modeling skill:

1. **Inventory terms**: what terms are used in the codebase and conversations? Are they in `CONTEXT.md`?
2. **Challenge definitions**: is each term precise enough to write code against? Are there ambiguities?
3. **Stress-test**: walk through a concrete scenario. Where does the model break down?
4. **Update inline**: add new terms to `CONTEXT.md` via `project-log`. Create ADRs for hard decisions.
5. **Cross-check code**: do function/class names match the domain model?

If `CONTEXT.md` doesn't exist yet, create it with the glossary format from `specs/ops-core.md`.

Output: updated `CONTEXT.md`, any new ADRs, and a list of naming divergences found in code.
