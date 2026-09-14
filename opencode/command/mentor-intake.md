---
description: >-
  Start mentor mode: first-time onboarding. Builds your mentor profile
  (goals, levels, time budget, learning style, weak spots, preferences) into
  docs/learning/mentor/profile.md + global memory, then drafts your
  personalized learning roadmap.
agent: mentor
---

Begin mentor mode with the intake session.

Instructions:

1. Check whether `docs/learning/mentor/profile.md` already exists.
   - If it does, tell the learner it exists, summarize it, and ask whether to
     refresh it or skip straight to the roadmap.
   - If not, proceed with intake.
2. Load the `mentor-intake` skill and run its workflow:
   - Ask the intake questions conversationally (max ~10): goals (career /
     project / interview), current level per area (1–5), weekly hours,
     learning style, weak spots, motivation, check-in frequency, language/
     tone preference.
   - Calibrate against existing docs if available.
   - Write `docs/learning/mentor/profile.md` via `learning-log` and
     cross-project facts to `memory/mentor/profile.md` via `memory-log`.
3. After the profile: load the `mentor-roadmap` skill and draft the initial
   roadmap (`docs/learning/mentor/roadmap.md`): milestones with outcomes,
   topics linked to repo docs, exercises, evidence, spaced review slots, and a
   weekly plan sized to the time budget.
4. Confirm the roadmap with the learner before finalizing; adjust as needed.
5. End with: profile summary, top 3 focus areas, the roadmap at a glance, and
   the first concrete step (an exercise or a stretch challenge).

Tone: supportive, curious, honest. This is a conversation, not a form.
