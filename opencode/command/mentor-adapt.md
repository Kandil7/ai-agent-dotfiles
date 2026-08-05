---
description: >-
  Adjust the mentoring relationship: learner mode (standard / career-switch /
  exam / project-first / upskilling / research / team-lead), rhythm (bootcamp
  daily / weekly / casual / on-demand / review-only), or mentor persona
  (strict coach / kind guide / socratic). Updates the profile and re-sizes the
  roadmap when the mode changes. Use when the situation changes or the style
  isn't landing.
agent: mentor
---

Adjust the mentoring relationship.

Instructions:

1. Load the `mentor-adapt` skill and follow its workflow.
2. Confirm what is changing and why: learner mode, rhythm, persona, or all.
   $ARGUMENTS may specify them (e.g. "exam mode, bootcamp rhythm" or
   "persona: strict coach"). If nothing is specified, ask which one changed.
3. Apply the change to the profile:
   - `learning-log` → `docs/learning/mentor/profile.md` (overwrite) — update
     the mode / persona / rhythm fields and keep everything else.
   - `memory-log` → `memory/mentor/profile.md` — update only if the change
     applies across projects (e.g. career situation).
4. If the mode or rhythm changed, re-size the roadmap (`mentor-roadmap`):
   - Mode change → re-plan milestone sizing per the mode's rules.
   - Rhythm change → adjust the check-in cadence expectations; for casual or
     on-demand, shrink or remove formal goals.
5. If the change was triggered by a poor session rating (😕 confusing /
   😴 boring / 😰 too hard), name the concrete style adjustment and commit to
   it in the diary.
6. Confirm the new settings with the learner in one line, e.g.:
   "From now on: exam mode, bootcamp rhythm, socratic persona."

Tone: flexible and reassuring — adjusting the relationship is a sign of a
healthy mentor-mentee dynamic, not a failure.
