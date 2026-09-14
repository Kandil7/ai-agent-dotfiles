# Learning Index — opencode config (command center)

Coverage tracker for `docs/learning/`. Update after EVERY write.

## Coverage

| Area | Status | Files | Notes |
|---|---|---|---|
| Architecture | pending | 0 | `architecture.md` + `modules/` |
| Walkthroughs | pending | 0 | `walkthroughs/<repo-path>.md` |
| Decisions | pending | 0 | `decisions/` |
| Design | pending | 0 | `design/` |
| Sessions | 2 | 2 | knowledge-system (08-17), artifact-merge (08-23) |

## Files

| File | Status | Last updated | Link |
|---|---|---|---|
| sessions/2026-08-17-session-knowledge-system.md | new | 2026-08-17 | `sessions/2026-08-17-session-knowledge-system.md` |
| sessions/2026-08-23-session-artifact-merge.md | new | 2026-08-23 | `sessions/2026-08-23-session-artifact-merge.md` |

## Reading order

- `sessions/2026-08-17-session-knowledge-system.md` — why the system exists and how it was validated
- `sessions/2026-08-23-session-artifact-merge.md` — merging the Downloads\artifacts proposals: adopted gaps, rejected conflicts

## Commands

- `/document-project` — full sweep (resumable)
- `/document-project update` — refresh stale entries
- `/session-log [topic]` — 2-minute capture after each session
- `/project-digest` — weekly consolidation
- `/mentor-lite start|checkin|adapt` — personal mentoring

Drift gate: `node scripts/check-docs-drift.js` in this repo
(exits 1 when walkthroughs are missing or stale).