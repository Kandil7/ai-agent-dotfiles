---
name: handoff
description: "Compact the current conversation into a handoff document so another agent or session can continue the work. Saves to the OS temp directory."
---

# Handoff

Write a handoff document summarising the current conversation so a fresh agent can continue the work.

## What to include

1. **Goal**: what the user was trying to accomplish
2. **Progress**: what has been done so far, what decisions have been made
3. **Current state**: what is the last thing that happened, what is pending
4. **Blockers**: anything preventing progress
5. **Artifacts**: paths to any specs, plans, ADRs, session logs, or other documents created during this session. Reference by path, don't duplicate content.
6. **Suggested skills**: which skills the next agent should load for the task at hand
7. **Suggested next step**: the concrete action the next agent should take first

## Where to save

Save to the OS temporary directory:
- Windows: `$env:TEMP\HANDOFF-<topic>-<date>.md`
- WSL: `/tmp/HANDOFF-<topic>-<date>.md`

Not in the workspace — the handoff is a portable transfer document, not a project artifact.

## Rules

- Do not duplicate content already captured in other artifacts (specs, plans, ADRs, issues, commits, diffs). Reference them by path or URL instead.
- Redact any sensitive information: API keys, passwords, tokens, PII.
- If the user passed arguments, treat them as a description of what the next session should focus on and tailor the doc accordingly.
- Keep it under 500 words. The handoff is a pointer, not a transcript.
