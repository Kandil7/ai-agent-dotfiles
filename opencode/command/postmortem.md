---
description: >-
  Run a postmortem on an incident or big mistake:
  docs/learning/reviews/postmortem-<incident>.md — timeline, impact, root
  cause, actions. Use after an outage, a broken build, a data-loss scare, or
  any "what went wrong" moment. $ARGUMENTS = incident name.
agent: learning
---

Run a postmortem for the incident.

Instructions:

1. Load the `postmortem` skill and follow its workflow.
2. Collect facts first (no blame): what happened, when, what was affected.
   Ask the learner for their recollection and check logs/git history if
   available.
3. Write the postmortem via `learning-log` →
   `reviews/postmortem-<incident>.md`:
   - Timeline: what happened when (facts only)
   - Impact: what broke, who/what was affected
   - Root cause: the underlying cause (keep asking "why" until it is not
     another symptom)
   - Actions: 2-4 concrete preventive actions (test, guard, doc)
4. Connect it to learning: note what concept to study so this class of
   mistake is less likely (link to curricula/walkthroughs if they exist).
5. Reply with the file path + the root cause in one line.

Tone: blameless and calm — a postmortem is a learning tool, not a trial.
