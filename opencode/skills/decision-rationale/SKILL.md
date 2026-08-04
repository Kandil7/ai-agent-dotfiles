---
name: decision-rationale
description: >-
  Force a written rationale before any significant change: problem, options,
  chosen path, justification, and conditions to revisit. Logs to
  learning/decision-<change>.md BEFORE code is touched, so every change has a
  documented story.
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

A rationale document saved under `learning/` via the `learning-log` tool:

- `learning/decision-<change-or-commit>.md`

Sections:

1. Problem
2. Options (briefly, link to `design-alternatives-<topic>.md` if available)
3. Chosen path
4. Why this (justification tied to constraints)
5. Conditions to revisit
6. Related links (PR, ADR, commit)

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
   - Call `learning-log` with `filePath: decision-<change>.md` **before** making edits.
   - Reference the log in the PR description or ADR after the change.

6. **Only then implement**
   - Proceed with the change (or hand off to a coding agent).

---

## Notes

- This skill's output is a precondition for non-trivial edits under the
  Global Learning Agent rules (see AGENTS.md §2).
- Keep it short: 0.5–1 page. Depth lives in `design-alternatives`.
