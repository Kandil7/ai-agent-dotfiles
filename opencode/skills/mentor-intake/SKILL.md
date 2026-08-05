---
name: mentor-intake
description: >-
  First mentor session: build the learner's profile — goals (career/project/
  interview), current level per topic area, weekly time budget, learning style,
  weak spots, learner MODE, mentor PERSONA, check-in RHYTHM, and tone/language
  preference. Writes docs/learning/mentor/profile.md (per project) and
  memory/mentor/profile.md (cross-project) via memory-log, then hands off to
  mentor-roadmap. Use on the very first mentor session or when the profile is
  outdated.
---

# Skill: mentor-intake

## Purpose

A mentor who doesn't know you can't mentor you. The intake session collects
the data that personalizes everything after: goals, levels, constraints, and
preferences. One thorough intake beats ten guessed roadmaps.

---

## When to Use

Use this skill when:

- The learner starts mentor mode for the first time (`/mentor-intake`).
- The profile is missing or clearly outdated (goals changed, level changed).
- The learner wants to re-aim (new job target, new project).

---

## Inputs

- The learner's answers (collected via questions below).
- Optional: existing `docs/learning/` docs to calibrate claimed levels
  (check mastery.md, session logs, completed exercises).

---

## Outputs

1. **`docs/learning/mentor/profile.md`** (per project) via `learning-log`:
   - Goals & success criteria (career / project / interview prep)
   - Current level per relevant area (from the mastery scale, self + evidence)
   - **Learner mode** (standard / career-switch / exam / project-first /
     upskilling / research / team-lead — see `mentor-adapt`)
   - **Mentor persona preference** (strict coach / kind guide / socratic)
   - **Rhythm** (bootcamp daily / weekly / casual / on-demand / review-only)
   - Weekly time budget (hours)
   - Learning style (visual / reading / building / explaining)
   - Weak spots & feared topics
   - What motivates (streaks, projects, praise, challenge)
   - Check-in frequency preference (default: weekly)
   - Tone/language preference (default: English; Arabic allowed)
2. **`memory/mentor/profile.md`** (cross-project) via `memory-log`:
   - Career goals, learning style, preferences, and constraints that apply to
     every repo (so other projects' sessions stay consistent).
3. **Hand-off** — summary of the top 3 focus areas + an invitation to run
   `mentor-roadmap` to build the plan.

---

## Step-by-Step Workflow

1. **Open the intake** — explain briefly what mentor mode is and that this
   takes ~10 minutes once.
2. **Ask (max ~10 questions, conversational, not a form):**
   - What do you want to be able to do in 3 months? (career / project / interview)
   - What's your current level in the areas this project touches? (1–5)
   - How many hours per week can you actually spend?
   - How do you learn best — read, build, watch, explain, or mix?
   - What's the situation driving this? (new career / exam deadline /
     building a project / advancing at work / research — sets the mode)
   - How do you want me to coach you — push hard, guide kindly, or ask
     questions and let you answer? (sets the persona)
   - What's the pace that would actually stick? (daily intensive / weekly /
     whenever I need you)
   - What topics make you uncomfortable?
   - What keeps you going when it gets hard?
   - Any language or tone preference?
3. **Calibrate** — if existing docs exist, compare claimed levels with
   evidence (completed exercises, walkthroughs, check-in answers) and note
   discrepancies honestly but kindly.
4. **Write the profiles** — `learning-log` → `mentor/profile.md`;
   `memory-log` → `mentor/profile.md` (cross-project facts only).
5. **Define focus areas** — pick the top 3 topics that matter most for the
   stated goals (this drives the roadmap).
6. **Hand off** — summarize: "Here's what I understand about you… Your top 3
   focus areas are… Shall we build your roadmap?" → invoke `mentor-roadmap`.

---

## Notes

- Never make the learner feel graded during intake — the goal is calibration.
- Update the profile when goals change; a check-in is a natural moment to ask
  "is this still what you're aiming for?"
- Mode / persona / rhythm are the learner's choices — offer them as options,
  never dictate; `mentor-adapt` applies and adjusts them later.
- The cross-project profile (`memory-log`) stays small and high-level; the
  per-project profile carries the detailed levels and evidence.
