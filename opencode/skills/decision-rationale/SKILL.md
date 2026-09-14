---
name: decision-rationale
description: >-
  Force a written rationale before any significant change: problem, options,
  chosen path, justification, and conditions to revisit. Logs an ADR
  (docs/learning/decisions/adr-<n>-<slug>.md) BEFORE code is touched, so every
  change has a documented, searchable story with status tracking.
---

# Skill: decision-rationale

## Purpose

Ensure every significant change has a **written rationale before any code is touched**:
what problem, what options, which path, why, and when we would revisit it.

This skill is **accountability-first**: it turns each change into a documented decision.

---

## When to Use

Use this skill when:

- About to refactor, migrate, or re-architect a module.
- Choosing between libraries, databases, or patterns.
- Changing APIs, schemas, or data flows.
- A `design-alternatives` analysis ends with a recommendation to proceed.

---

## Inputs

- The change under consideration (file/module/scope).
- The design-alternatives analysis, if one exists.
- The user's stated constraints.

---

## Outputs

An **ADR** (Architecture Decision Record) saved under `docs/learning/decisions/`
via the `learning-log` tool:

- `docs/learning/decisions/adr-<n>-<slug>.md`
  (e.g. `adr-007-vector-db-qdrant.md`; `<n>` = next number in the folder)
- Legacy naming `decision-<change>.md` is allowed for small personal decisions;
  prefer ADR for anything with team/architecture impact.

Sections:

1. **Status** — `proposed` | `accepted` | `superseded` (with date + reason)
2. **Date** — when the decision was made
3. **Context** — the problem, constraints, and why a decision is needed
4. **Decision** — what was chosen, in one clear statement
5. **Alternatives** — 2–3 options considered (link `design-alternatives-<topic>.md` if available)
6. **Consequences** — what improves, what gets harder, what to monitor
7. **Conditions to revisit** — "if X happens, we should reconsider"
8. **Related** — links to PR, commit, superseded ADRs

### Decision log (`decisions/README.md`)

Every `docs/learning/decisions/` folder should have a `README.md` log table:

```markdown
| # | Title | Status | Date | Supersedes |
|---|---|---|---|---|
| 007 | Vector DB: Qdrant | accepted | 2026-08-05 | 003 |
```

Update the log after writing or changing an ADR's status.

---

## Step-by-Step Workflow

1. **State the problem**
   - What is wrong or missing today? What triggered this decision?

2. **List options**
   - 2–3 options with one-line pros/cons (deep comparison belongs to `design-alternatives`).

3. **Choose and justify**
   - Which option is chosen and why (performance, complexity, reliability, cost, team fit).
   - Justify against the actual constraints, not generic best practice.

4. **Define revisit conditions**
   - "If X happens, we should reconsider" — makes the decision falsifiable.

5. **Log BEFORE coding**
   - Check the next ADR number in `docs/learning/decisions/`.
   - Call `learning-log` with `filePath: decisions/adr-<n>-<slug>.md` **before** making edits.
   - Update `decisions/README.md` (create it with a header table if missing).
   - Reference the ADR in the PR description after the change.

6. **Only then implement**
   - Proceed with the change (or hand off to a coding agent).

---

## Notes

- This skill's output is a precondition for non-trivial edits under the
  Global Learning Agent rules (see AGENTS.md §2).
- Keep it short: 0.5–1 page. Depth lives in `design-alternatives`.
