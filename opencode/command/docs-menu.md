---
description: >-
  Show the full command palette of the Global Learning system: every /command
  grouped by purpose (document, learn, mentor, analyze), with one-line
  descriptions and when to use each. Also points to the skills index for the
  agent-side skills. Use when you wonder "what can this system do?".
agent: learning
---

Show the command palette.

Instructions:

1. Output the command table below as-is (grouped), then invite the user to
   pick one. Keep formatting compact.

## Document (learning docs)
- `/document-project` — full-project documentation sweep (walkthroughs, architecture, index)
- `/document-project update` — refresh stale walkthroughs
- `/migrate-learning` — move old `learning/` folders into `docs/learning/legacy/`
- `/session-log` — capture today's session into `sessions/` (2-minute ritual)
- `/weekly-digest` — consolidate the week into `sessions/digest-<week>.md`
- `/session-to-curriculum` — upgrade a session into a structured lesson
- `/architecture-qa` — top 10-15 architecture questions with grounded answers

## Analyze (project concerns)
- `/impact-analysis` — blast radius before a refactor (run BEFORE changing code)
- `/postmortem` — blameless review after an incident or big mistake
- `/threat-model` — security threat model for an area (auth, uploads, api, ...)
- `/profiling-notes` — performance investigation log (measurements, fixes)

## Mentor (personal growth)
- `/mentor-intake` — start mentor mode (profile + roadmap)
- `/mentor-checkin` — review ritual (weekly full or bootcamp daily)
- `/mentor-stuck` — rescue: stuck on a bug, decision, or motivation
- `/mentor-mock-interview` — scored mock interview practice
- `/mentor-reaim` — goals changed: re-plan
- `/mentor-adapt` — change mode / rhythm / persona
- `/mentor-graduation` — close the relationship well + alumni returns

2. If the user wants the full agent-side skill list, point them to
   `specs/global-learning-agent-skills.md` (34 skills) instead of pasting it
   all — the menu is for choosing, not for reading.
3. If the user is new (no `docs/learning/` yet), recommend the quickstart:
   `/document-project` first, then `/mentor-intake`.
