---
description: >-
  Run the weekly mentor check-in: review the week against the roadmap, score
  progress, update the mastery ledger with evidence, celebrate wins, follow up
  on open challenges, adjust the roadmap, and set next-week goals. Logs to
  docs/learning/mentor/checkins/YYYY-MM-DD-checkin.md.
agent: mentor
---

Run the weekly mentor check-in.

Instructions:

1. Load the `mentor-checkin` skill and its workflow.
2. Load the learner's context first: `docs/learning/mentor/profile.md`,
   `mentor/roadmap.md`, `mentor/mastery.md`, `mentor/challenges.md`,
   `mentor/diary.md`, and the week's session/diff/decision logs (use
   `weekly-digest` data if a digest exists).
3. Greet by reality: acknowledge the gap since the last check-in and any
   open items from last week's goals.
4. Ask 5–7 conversational questions: what was learned, built, hardest
   moment, exercises/challenges finished, confusions, and whether the goal
   still holds.
5. Score progress against the roadmap (done / in progress / stuck / skipped).
6. Update the ledgers:
   - mastery: `mentor/mastery.md` (level changes with evidence links)
   - challenges: `mentor/challenges.md` (statuses)
   - roadmap: `mentor/roadmap.md` (re-plan if reality diverged)
7. Write the check-in log: `learning-log` →
   `mentor/checkins/YYYY-MM-DD-checkin.md`.
8. Close with 2–4 concrete next-week goals, one spaced review slot of an
   older topic, and a named win from this week.

Tone: supportive first, honest always, never guilt. If the week was empty,
log reality, find the blocker, and shrink the plan to the true time budget.
