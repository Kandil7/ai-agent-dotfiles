# Learning Index — <PROJECT NAME>

Coverage tracker for `docs/learning/`. Update after EVERY write.

## Coverage

| Area | Status | Files | Notes |
|---|---|---|---|
| Architecture | pending | 0 | `architecture.md` + `modules/` |
| Walkthroughs | pending | 0 | `walkthroughs/<repo-path>.md` |
| Decisions | pending | 0 | `decisions/` |
| Design | pending | 0 | `design/` |
| Sessions | pending | 0 | `sessions/YYYY-MM-DD-session-<topic>.md` |

## Files

| File | Status | Last updated | Link |
|---|---|---|---|
| _(fill as files are written)_ | new / updated / stale / archived | YYYY-MM-DD | `walkthroughs/src/main.py.md` |

## Reading order

- _(fill after the first `/document-project` sweep)_

## Commands

- `/document-project` — full sweep (resumable)
- `/document-project update` — refresh stale entries
- `/session-log [topic]` — 2-minute capture after each session
- `/project-digest` — weekly consolidation
- `/mentor-lite start|checkin|adapt` — personal mentoring

Drift gate: `node <config>/scripts/check-docs-drift.js` in this repo
(exits 1 when walkthroughs are missing or stale).