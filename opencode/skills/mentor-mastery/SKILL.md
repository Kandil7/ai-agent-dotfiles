---
name: mentor-mastery
description: >-
  Track mastery per topic in docs/learning/mentor/mastery.md on an
  evidence-based scale (Novice → Practitioner → Proficient → Expert): log
  level changes with proof links, detect plateaus (same topic 2+ weeks without
  progress), and drive adaptive difficulty. Use at the end of any mentor
  session, at check-ins, and whenever the learner completes exercises or
  challenges.
---

# Skill: mentor-mastery

## Purpose

Know, at any moment, **exactly where the learner stands on every topic** — and
what to do next. Mastery is never guessed: it moves only with evidence, and
plateaus trigger a change of approach instead of repeating the same material.

---

## When to Use

Use this skill when:

- A mentor session or exercise finishes (update evidence).
- A challenge is accepted/completed (likely a level-up).
- A check-in reviews the week (re-score topics).
- The learner claims (or doubts) a level — verify against evidence.

---

## Outputs

`docs/learning/mentor/mastery.md` via `learning-log` (overwrite the table):

```markdown
| Topic | Level | Evidence (links + dates) | Next step |
|---|---|---|---|
| FastAPI routes | Practitioner | exercise X (2026-08-01), session Y (2026-08-03) | Challenge: auth middleware |
| RAG chunking | Proficient | built chunker in athar (2026-07-20) | Teach it / optimize |
| pytest | Novice | attended session (2026-08-04) | guided exercise 1 |
```

---

## Mastery Scale (evidence rules)

| Level | Means | Evidence required |
|---|---|---|
| Novice | Follows explanations | Attended sessions, diary entries |
| Practitioner | Does guided exercises | Completed exercises (linked) |
| Proficient | Builds independently, explains | Project work, accepted challenges, clear grill answers |
| Expert | Teaches, optimizes, edge cases | Led walkthroughs, taught others, complex challenge |

Rules:

- **No level-up without evidence links.** Add the link the moment evidence
  appears (same session), never retroactively by memory.
- **Plateau detection** — if a topic's level is unchanged after 2+ weeks of
  active sessions on it, mark `⚠ plateau` and change approach:
  - Novice stuck → more worked examples / smaller steps
  - Practitioner stuck → switch from exercises to a real project task
  - Proficient stuck → ask them to teach/explain it (teaching exposes gaps)
- **Adaptive difficulty** — next assignment = level+1 (challenge) when the
  learner has been solid at the current level for ≥2 evidence points.

---

## Step-by-Step Workflow

1. **Load** the current mastery table + the session/challenge outcome.
2. **Score** — map the outcome to a level using the evidence rules; be
   conservative (better to verify with one more exercise than to inflate).
3. **Update** — overwrite the table via `learning-log`
   (`filePath: mentor/mastery.md`, `mode: overwrite`), adding/editing the
   topic row with the new level, evidence link, and next step.
4. **Check plateaus** — scan topics with recent activity but no level change;
   flag them with a suggested approach change.
5. **Report** — tell the learner: level changes (celebrate!), plateaus
   (honestly), and the next step per topic (exercise vs challenge vs teach).

---

## Notes

- Mastery is per-topic, not per-project-global — but the same scale applies
  everywhere, so levels are comparable across repos.
- If the learner's self-assessment disagrees with the evidence, trust the
  evidence, show it kindly, and set a small verification task.
- This table drives `mentor-challenge` (which topic gets a stretch challenge)
  and `mentor-checkin` (what to review).

---

## Review Queue (spaced repetition)

Fighting forgetting is part of mastery. Maintain
`docs/learning/mentor/review-queue.md` (via `learning-log`, overwrite):

```markdown
| Topic | Last reviewed | Due date | Interval | Next interval |
|---|---|---|---|---|
| FastAPI routes | 2026-08-01 | 2026-08-04 | 3d | 7d |
| RAG chunking | 2026-07-20 | 2026-07-27 | 7d | 14d |
```

Rules:

- **Schedule after every topic session**: first review in 1 day, then 3, 7,
  14, 30 (doubling when answered correctly).
- **Pull due items** at every session and check-in: review the topic with
  1–2 quick questions before new material (interleave old + new).
- **Correct review** → advance the interval; wrong/flaky → reset to 1 day.
- Sessions and check-ins start with the due list — the queue is the plan's
  memory.
