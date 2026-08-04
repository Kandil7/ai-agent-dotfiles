---
name: explain-by-diff
description: >-
  Explain code changes via git diff instead of full files: what changed, why,
  and the impact on the system. Use for reviewing commits, PRs, or agent-made
  edits. Logs to learning/diff-<commit>.md.
---

# Skill: explain-by-diff

## Purpose

Explain **changes** (via git diff) rather than whole files: what changed, why it
changed, and what impact it has on the system.

This skill is **change-first**: every commit becomes a micro-lesson.

---

## When to Use

Use this skill when:

- Reviewing a commit, PR, or a change made by another agent.
- The user asks "what did this commit change?" or "why did the tests break?".
- After a coding session, to understand what the agent actually did.
- Learning from history: walk through the repo's recent commits.

---

## Inputs

- A commit range, commit hash, or working-tree diff (`git diff`, `git show <sha>`).
- Optional: focus area (logic, performance, security, style).

---

## Outputs

An explanation document saved under `learning/` via the `learning-log` tool:

- `learning/diff-<commit>.md`

Sections:

1. Change summary (1–3 sentences)
2. Files touched and why
3. Logic changes (before → after)
4. Impact (behavior, performance, security, API surface)
5. Risks / follow-ups
6. Lessons (patterns worth remembering)

---

## Step-by-Step Workflow

1. **Get the diff**
   - Use `bash` (read-only git commands): `git show <sha>` or `git diff <range>`.
   - If the diff is huge, focus on the most important hunks.

2. **Summarize**
   - What was the change's intent? (Read the commit message too.)

3. **Walk the hunks**
   - For each meaningful hunk: explain before → after and why.

4. **Assess impact**
   - What breaks, what improves, what needs testing?

5. **Extract lessons**
   - Patterns, pitfalls, or design ideas worth remembering.

6. **Log the explanation**
   - Call `learning-log` with `filePath: diff-<commit>.md`.

---

## Notes

- Read-only: this skill never modifies code.
- Pair with `review-teacher` when the diff needs quality/security feedback.
