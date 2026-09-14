# Knowledge System Bootstrap — session log

### Context

Config dir: `~/.config/opencode/` (the command center itself). Goal: implement the
knowledge & mentor system modeled on Kandil7/ai-agent-dotfiles, adapted to this
workstation's engineering-first, safety-first command center.

### Explanation

Implemented the full Tier 1-3 plan:

- `specs/ops-core.md` — the global contract (handoff table, docs/learning
  conventions, memory rules, acceptance criteria), injected into every session
  via `"instructions": ["specs/ops-core.md"]` in `opencode.jsonc`.
- `tool/project-log.ts` and `tool/memory-log.ts` — path-locked custom tools
  (Zod schema, `tool()` helper from `@opencode-ai/plugin`). project-log refuses
  writes outside `<repo>/docs/learning/`; memory-log refuses writes outside
  `~/.config/opencode/memory/`. Verified: escape attempts (`../`) and absolute
  paths are rejected; real writes land correctly.
- Commands: `/session-log` (2-min capture), `/project-digest` (weekly),
  `/document-project [update]` (full sweep via new `documenter` subagent),
  `/mentor-lite start|checkin|adapt` (profile + roadmap + check-ins, evidence-
  based mastery, no ceremony).
- Handoff contracts added to architect/builder/reviewer/security/teacher;
  `project-log`/`memory-log` allowed for read-only agents (their only write path).
- Scripts: `check-docs-drift.js` (CI gate), `check-overdue.ps1` (check-in +
  checkpoint staleness nudge, Task Scheduler ready), `diary-add.ps1`.
- `memory/` cross-project memory dir + `README.md`; template/ updated with
  `docs/learning/00-INDEX.md` skeleton.

Validation: node --check clean; both tools import and execute via Node; all 10
agent frontmatters structurally valid; end-to-end smoke test in a scratch repo
(session artifact + walkthrough via the real tool, drift gate: 100% coverage
then MISSING detection after deleting the walkthrough).

### Alternatives

- Porting all 34 Kandil7 skills + 18 commands verbatim — rejected: token
  overhead (~28 KB/session), teaching-first default conflicts with the
  engineering workflow. Adopted mechanisms, not volume.
- 4 spec files loaded every session (Kandil7's design) — rejected: one
  consolidated `ops-core.md` (~5 KB) gives the same contract at ~1/5 the cost.
- No custom tools, prompt-only conventions — rejected: the path lock is the
  whole point; it makes the discipline mechanical, not aspirational.

### Rationale (Why this?)

The knowledge system is the durable memory that survives session compaction.
The tools enforce it mechanically; the spec makes every agent aware of the
contract; acceptance criteria make it measurable. Backups of every modified
file exist in `backup/2026-08-17/`; config reload requires restarting opencode.

### Exercises

- Run `/session-log` after the next real working session.
- Run `/document-project` in an active repo and watch the coverage tracker.
- Run `node ~/.config/opencode/scripts/check-docs-drift.js` in a documented repo.
- Schedule `check-overdue.ps1` daily via Task Scheduler.
- Run `/mentor-lite start` to build the learning profile.

### Next Steps

- Restart opencode so `instructions` and the two tools load.
- Optional: `/project-digest` at the end of the week; wire `check-overdue.ps1`
  into Task Scheduler.
- Observe token cost of `ops-core.md` per session; split into two specs only
  if it ever becomes a problem.

---