---
name: docs-drift-check
description: >-
  Keep docs/learning honest over time: run scripts/check-docs-drift.js (or a CI
  job) to compare source files against walkthroughs, list missing/stale docs,
  and gate PRs on doc drift. Use when the user asks "are the docs up to date",
  wants a CI quality gate, or after big changes.
---

# Skill: docs-drift-check

## Purpose

Docs rot silently. This skill makes drift **visible and gateable**: a script
compares every source file against its walkthrough and reports what is missing
or stale, locally or in CI.

---

## When to Use

Use this skill when:

- The user asks "هل التوثيق محدث؟" / "are the docs up to date?".
- Setting up a CI quality gate for documentation.
- Before a release or handoff, to verify doc health.
- After a large refactor that may have orphaned walkthroughs.

---

## Inputs

- The repo root (default: current directory).
- Optional: threshold (max allowed stale count before failing), extensions.

---

## Step-by-Step Workflow

1. **Run the script locally**
   - `node ~/.config/opencode/scripts/check-docs-drift.js --root <repo>`
   - Or with options: `--ext py,ts --threshold 2 --json`.
   - Read the output: coverage %, MISSING and STALE lines.
2. **Interpret**
   - MISSING → file has no walkthrough yet → run `/document-project` (or
     document just those files).
   - STALE → source changed after its walkthrough → run
     `/document-project update`.
3. **Fix the drift** — refresh via the `code-walkthrough` skill for affected
   files, then mark them `updated` in `00-INDEX.md`.
4. **Set up CI (optional)** — add a GitHub Action step:

```yaml
- name: Docs drift check
  run: node ~/.config/opencode/scripts/check-docs-drift.js --root . --threshold 0
```

   (or GitLab CI / pre-commit hook with the same command). Exit code 1 when
   stale docs exceed the threshold — the PR then shows the drift.

5. **Report** — coverage %, counts, and the fix recommendation.

---

## Notes

- The script needs `git` for staleness detection (falls back to file mtimes).
- Threshold 0 is strict (any stale doc fails); teams usually start with 2–5.
- Pairs with `weekly-digest`: drift check says WHAT is old; the digest says
  what the week changed.
