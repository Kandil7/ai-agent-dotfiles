---
name: mentor-roadmap
description: >-
  Build or adapt the personalized learning roadmap in
  docs/learning/mentor/roadmap.md: milestones with outcomes, topics mapped to
  repo docs and exercises, evidence definitions, difficulty ladder, weekly
  plan, and spaced review slots (1/3/7 days). Use after mentor-intake, at
  check-ins when the plan diverges, or when goals change.
---

# Skill: mentor-roadmap

## Purpose

A personal plan that says **what to learn, in what order, by when, and how we
prove it's learned**. Unlike `project-decomposition` (phases for a build),
this is a *learning* roadmap: milestones, difficulty ladder, evidence, and
review slots that fight forgetting.

---

## When to Use

Use this skill when:

- Right after `mentor-intake` (initial roadmap).
- At a check-in when progress diverged from the plan (re-plan).
- The learner's goals changed (new job target, new project focus).
- A milestone was reached and the next one needs definition.

---

## Inputs

- The learner profile (`docs/learning/mentor/profile.md` + global memory).
- The repo's docs (`docs/learning/` — architecture, walkthroughs, curricula).
- Current mastery state (`mentor/mastery.md`) and open challenges.

---

## Outputs

`docs/learning/mentor/roadmap.md` via `learning-log`:

1. **Goal statement** — one sentence + measurable success criteria
   ("by <date>, build X / pass Y / explain Z without notes").
2. **Milestones** — M1..Mn, each with:
   - Outcome ("you can…"), linked to repo docs
   - Topics (with links to walkthroughs/curricula where they live)
   - Exercises (from the repo) + evidence definition (what proves it)
   - Difficulty level (matches mastery scale; rises across milestones)
3. **Spaced review slots** — after each milestone: review at +1 day, +3 days,
   +7 days (mix old + new topics — interleaving beats blocks).
4. **Weekly plan** — what week covers which milestone; sized to the time
   budget from the profile.
5. **Stretch targets** — 1 challenge per milestone (see `mentor-challenge`).
6. **Adapt rules** — "if X happens, we re-plan" (e.g. two missed weeks, one
   milestone completed early, goal change).

---

## Step-by-Step Workflow

1. **Load** — profile + mastery + existing curricula/docs inventory.
2. **Draft milestones** — from goals, backwards: what's needed to reach the
   goal, in prerequisite order. 3–6 milestones for a 1–3 month horizon.
3. **Size to the learner's mode** (from the profile; see `mentor-adapt`):
   - career-switch: smaller milestones (1–2 weeks max), one concept at a
     time, confidence-first ordering.
   - exam: milestones mirror the syllabus/topic map; revision milestones
     interleaved from week 1, past-question practice built in.
   - project-first: milestones ARE build steps ("user can sign up", "search
     works") with the concept attached to each step.
   - upskilling: ladder-shaped (mid → senior → lead), each milestone
     practicing a higher-level skill (code review, delegation, design
     ownership).
   - research: milestones are paper-study plans or reproductions
     ("implement this paper's method in the repo").
   - team-lead: milestones practice mentor-the-mentor skills (1:1s,
     feedback technique, delegating learning tasks).
4. **Map to the repo** — every topic must link to an existing doc, or list it
   as "needs: <artifact>" for the next `/document-project` pass.
5. **Assign evidence** — for each milestone, the concrete proof of mastery
   (exercise done, challenge accepted, explanation given, project feature).
6. **Add review slots** — interleave old material at +1/+3/+7 days; register
   the first review dates in `mentor/review-queue.md` (`mentor-mastery`).
7. **Write the roadmap** — `learning-log` → `mentor/roadmap.md`
   (`overwrite` when re-planning).
8. **Confirm** — show the milestone list and ask: "does this match your goal
   and time budget?" Adjust before starting.

---

## Notes

- The roadmap is a **living document**: check-ins update it; don't defend a
  plan that reality has overruled.
- Keep each milestone small enough to finish within the time budget (2–4
  weeks max) — momentum beats ambition.
- Link, don't duplicate: the roadmap points at walkthroughs/curricula instead
  of re-explaining content.
