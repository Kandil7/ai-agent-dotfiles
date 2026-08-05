---
name: mentor-challenge
description: >-
  Create stretch challenges at mastery level+1 in
  docs/learning/mentor/challenges.md: each with a task grounded in the repo,
  why it builds you, acceptance criteria, progressive hints, and status.
  Use when the learner is solid at a level and needs pushing, at roadmap
  milestone boundaries, or when asked "give me something hard".
---

# Skill: mentor-challenge

## Purpose

Exercises confirm; **challenges grow**. A challenge is a real task from the
repo, one level above the learner's current mastery, with acceptance criteria
and escalating hints — the mentor's way of pushing without abandoning.

---

## When to Use

Use this skill when:

- The learner is solid at a level (≥2 evidence points) and ready for level+1.
- A roadmap milestone needs its stretch target.
- The learner asks "give me something hard" / "تحدّاني".
- A check-in shows a plateau that needs a different kind of task.

---

## Outputs

`docs/learning/mentor/challenges.md` via `learning-log` (append):

| Challenge | Topic | Level+1 from | Why | Acceptance criteria | Est. time | Hints available | Status |
|---|---|---|---|---|---|---|---|
| Add auth to API | FastAPI | Practitioner | real-world security | tests pass, 401/403 flows | 3h | 3 | open |

Each challenge in the doc has:
1. **Title** — a real repo task, not a toy
2. **Why** — what skill it builds and where it fits the goal
3. **Task** — concrete, grounded in actual files (cite them)
4. **Acceptance criteria** — how we know it's done (tests, behavior, questions
   you can answer afterwards)
5. **Hints** — 3 progressively stronger hints (mentor reveals on request)
6. **Stretch option** — the "if this was easy, do more" extension
7. **Status** — open / in progress / done (+date) / abandoned (+reason)

---

## Step-by-Step Workflow

1. **Pick the topic** — from mastery (level+1) or the roadmap milestone.
2. **Find the real task** — scan the repo: missing tests, an endpoint without
   validation, a TODO, a small refactor with clear acceptance criteria.
3. **Design the challenge** — task + why + acceptance criteria + 3 hints +
   stretch option; target 2–4 hours (fit the time budget).
4. **Write it** — `learning-log` → `mentor/challenges.md` (append).
5. **Launch it** — present it in chat: the why first, then the task, then
   "hints are available when you're stuck".
6. **Follow up** — at the next session/check-in, ask about open challenges;
   on completion, update status + mastery evidence + celebrate; on abandon,
   update status with a note and re-scope (never guilt).

---

## Notes

- Difficulty must be **level+1, not level+3**: a challenge that overwhelms
  teaches fear. If the learner bounces off twice, re-scope and log it.
- Hints are for the learner to request — the mentor never dumps them early.
- A completed challenge is the strongest mastery evidence: it usually
  triggers a level-up in `mentor-mastery`.
