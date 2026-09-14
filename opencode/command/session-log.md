---
description: >-
  Capture the session you just had: 3-5 quick questions (what did you do /
  learn / get confused by / next step), written to
  docs/learning/sessions/YYYY-MM-DD-session-<topic>.md. Run it before closing
  opencode so no learning moment dies. Optionally pass a topic as $ARGUMENTS.
agent: learning
---

Log this session as a learning artifact.

Instructions:

1. Ask 3-5 quick conversational questions (keep it under 2 minutes):
   - What did you work on or fix in this session?
   - What did you learn that you didn't know before?
   - What confused you or is still fuzzy?
   - What is the one thing to do next time?
2. Write the entry via `learning-log` →
   `sessions/<today>-session-<topic>.md` (topic from $ARGUMENTS or the main
   theme of the session; e.g. `sessions/2026-08-05-session-fastapi-routes.md`):
   - Context: repo, session goal
   - Explanation: what was done/learned, key insights
   - Next Steps: the one thing to do next time
   - Keep it honest and short — a session log is raw material, not a report.
3. Mention the file path in your reply so it is easy to find.
4. Optional: if the session produced a reusable lesson, suggest
   `/session-to-curriculum` to upgrade it into a structured lesson.

Tone: fast, practical — this is a 2-minute ritual, not a ceremony.
