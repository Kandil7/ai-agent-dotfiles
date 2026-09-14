---
name: postmortem
description: >-
  Write an incident postmortem (bug, outage, failed deploy, production issue)
  into docs/learning/reviews/postmortem-<incident>.md: timeline, impact, root
  cause, fix, prevention, and action items. Use after debugging a significant
  failure or when the user says "وثّق الحادثة" / "write a postmortem".
---

# Skill: postmortem

## Purpose

Turn significant failures into **durable lessons**: a structured, blame-free
postmortem that captures what happened, why, and what changes prevent it from
happening again.

---

## When to Use

Use this skill when:

- A serious bug was fixed and the user wants it documented.
- An outage, failed deploy, or data incident occurred.
- A debugging session took long enough that its lessons would be lost.

---

## Inputs

- The incident: what broke, when, for how long, who/what was affected.
- The evidence: logs, traces, stack traces, PRs, commits, session history.
- The fix: what changed to resolve it (commit/diff).

---

## Outputs

`docs/learning/reviews/postmortem-<incident>.md` via `learning-log`:

1. **Summary** — one paragraph: what happened, impact, duration.
2. **Timeline** — dated/clocked events: detection → investigation → fix → verification.
3. **Impact** — affected users/features/data; blast radius.
4. **Root cause** — the actual trigger chain (not the surface symptom).
5. **Fix** — what changed, with commit/PR references.
6. **Why it slipped through** — gaps in tests, monitoring, review, assumptions.
7. **Prevention** — concrete action items (tests, alerts, guardrails), each
   with an owner or "todo".
8. **Lessons** — 2–3 generalizable rules for the repo (and optionally a
   `memory-log` entry if they apply across projects).

---

## Step-by-Step Workflow

1. **Gather evidence** — read the logs, the fix commit, and the session trail.
2. **Build the timeline** — order events; mark gaps as "unknown (to investigate)".
3. **Find the root cause** — ask "why" repeatedly (5-whys) until a testable
   mechanism appears; avoid blaming a person or a single line.
4. **Draft and write** — `learning-log` → `reviews/postmortem-<incident>.md`.
5. **Add to the index** — link from `00-INDEX.md`.
6. **Follow up** — list the action items in chat and offer to turn them into
   tasks/tests; propose a `decision-rationale` if prevention requires a design
   change.

---

## Notes

- Blame-free tone: describe systems and decisions, not people.
- Do NOT include secrets (tokens, customer data) found during the incident —
  redact and note "redacted".
- Keep it tight: the summary + root cause + prevention matter most.
