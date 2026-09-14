---
name: weekly-digest
description: >-
  Consolidate a week of learning into docs/learning/sessions/digest-<YYYY-Www>.md:
  scan sessions/, diffs/, decisions/, design/ and the index for this week's
  activity, summarize what was learned/decided/changed, and list open items.
  Use for weekly reviews or when the user asks "what did we learn this week".
---

# Skill: weekly-digest

## Purpose

Sessions accumulate; **understanding should consolidate**. The weekly digest
turns a week of scattered logs into one readable summary: what was learned,
what was decided, what changed, and what is still open.

---

## When to Use

Use this skill when:

- Doing a weekly review ("راجعلي أسبوع التعلم ده").
- The user asks "what did we cover this week?".
- Preparing a report for a mentor, team, or study group.
- Before a long break — so knowledge is captured while fresh.

---

## Inputs

- The week: date range (default: the last 7 days).
- The docs under `docs/learning/` (sessions, diffs, decisions, design, index).

---

## Outputs

`docs/learning/sessions/digest-<YYYY-Www>.md` (ISO week, e.g. `digest-2026-W32.md`)
via `learning-log`:

1. **Week in one paragraph** — what the learning arc was about.
2. **Learned** — key concepts from `sessions/` and walkthrough updates,
   each linked.
3. **Decided** — decisions/ADR entries this week, each with status.
4. **Changed** — `diffs/` and refactors documented this week.
5. **Exercises done / attempted** — from session logs.
6. **Open items** — pending exercises, stale docs, unanswered questions
   (link the index rows).
7. **Next week suggestions** — topics, docs to fill, skills to apply.

---

## Step-by-Step Workflow

1. **Scope the week** — determine the date range (last 7 days by default).
2. **Scan the sources** — read `00-INDEX.md` and list files under `sessions/`,
   `diffs/`, `decisions/`, `design/` modified in range (git `--since` or
   `learning-log` dates).
3. **Summarize per category** — 1–3 bullets each, every bullet linked.
4. **Extract open items** — pending exercises and `stale` index rows.
5. **Write** — `learning-log` → `sessions/digest-<YYYY-Www>.md`.
6. **Present** — show the digest summary in chat; offer `grill-me` questions
   on the week's core concepts to verify retention.

---

## Notes

- Links, not essays: the digest points to the deep docs.
- Do not rewrite history — if a session log is missing, say so in Open items.
- Weekly runs compound: digest-2026-W31 + digest-2026-W32 = a month review
  source (can be summarized into `curricula/` later).
