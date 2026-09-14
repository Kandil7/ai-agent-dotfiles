# Global Learning & Mentor System

A personal teaching + mentoring system for **every repo** on this machine.
Document your projects in deep detail, learn from them, and get mentored
toward your goals — all from plain Markdown files under each repo's
`docs/learning/`, plus cross-project memory in `memory/`.

## 5-Minute First Run

1. **Restart opencode** (config loads once at startup).
2. In any repo, run `/document-project` — generates architecture, per-file
   walkthroughs, and a coverage index.
3. Run `/mentor-intake` — builds your profile (goals, level, mode, persona,
   rhythm) and a roadmap.
4. Learn in sessions (`@mentor` or `@learning`); log the day with
   `scripts/diary-add.ps1` or `/session-log`.
5. Keep the loop alive: `/mentor-checkin` weekly, `/weekly-digest` Fridays,
   `/mentor-stuck` when blocked.

## Agents

| Agent | Role | Invoke |
|---|---|---|
| `learning` | Teaching: walkthroughs, curricula, sessions, digests | `@learning` |
| `mentor` | Personal growth: profile, roadmap, mastery, check-ins, rescue, interviews, graduation | `@mentor`, `/mentor-*` |
| `code-teacher` | Explains single files step-by-step | `@code-teacher` |
| `design-teacher` | Compares designs and trade-offs | `@design-teacher` |
| `review-teacher` | Code quality/security review (never edits) | `@review-teacher` |
| `documenter` | Batch documentation sweeps for `/document-project` | invoked by command |

## Commands (18)

| Purpose | Commands |
|---|---|
| Document | `/document-project`, `/document-project update`, `/migrate-learning` |
| Capture | `/session-log`, `/weekly-digest`, `/session-to-curriculum` |
| Analyze | `/postmortem`, `/impact-analysis`, `/threat-model`, `/profiling-notes`, `/architecture-qa` |
| Mentor | `/mentor-intake`, `/mentor-checkin`, `/mentor-stuck`, `/mentor-mock-interview`, `/mentor-reaim`, `/mentor-adapt`, `/mentor-graduation` |
| Navigate | `/docs-menu` (this list, on demand) |

## Skills (34)

Agent-side playbooks, discoverable via the `skill` tool. Full table in
`specs/global-learning-agent-skills.md`. Groups:

- **Teaching**: `code-walkthrough`, `teach-mode`, `understand-anything`, `grill-me`, `explain-by-diff`, `session-to-curriculum`, `learning-log`
- **Planning**: `document-project`, `project-decomposition`, `context-load`, `guided-tour`, `project-type-docs`
- **Analysis**: `design-alternatives`, `decision-rationale`, `impact-analysis`, `postmortem`, `threat-model`, `profiling-notes`, `architecture-qa`
- **Delivery**: `api-reference`, `weekly-digest`, `docs-drift-check`, `docs-publish`, `docs-mcp`
- **Mentor (10)**: `mentor-intake`, `mentor-roadmap`, `mentor-mastery`, `mentor-challenge`, `mentor-checkin`, `mentor-adapt`, `mentor-stuck`, `mentor-mock-interview`, `mentor-motivation`, `mentor-graduation`

## Tools

- `learning-log` — writes structured entries to `<repo>/docs/learning/` (path-locked)
- `memory-log` — writes cross-project facts to `~/.config/opencode/memory/` (path-locked)

## Scripts

- `scripts/check-docs-drift.js` — CI staleness gate (exit 1 on stale docs)
- `scripts/mirror-skills.js` — copies all 34 skills into a repo's `docs/learning/skills/`
- `scripts/check-overdue.ps1` — OS-level mentor nudge (Task Scheduler ready)
- `scripts/diary-add.ps1` — 2-minute diary entry without opencode

## Specs (loaded every session)

- `specs/learning-agent-spec.md` — teacher mode contract
- `specs/mentor-agent-spec.md` — mentor mode contract (modes, personas, rhythms, artifacts)
- `specs/learning-mentor-handoff.md` — who does what, artifact flow
- `specs/global-learning-agent-skills.md` — skills index

## Artifacts Layout

```
<repo>/docs/learning/
  00-INDEX.md            navigation hub + coverage tracker
  architecture.md        whole-project map (mermaid)
  walkthroughs/<path>.md deep per-file explanations (mirror the repo tree)
  modules/ design/ decisions/ reviews/ sessions/ curricula/ diffs/
  ai/ api/ ui/ data/ ops/ notebooks/ packages/ security/ performance/
  mentor/                profile, roadmap, mastery, challenges, checkins/,
                         diary, feedback, review-queue, streak, wins,
                         mock-interviews, decisions, graduation
~/.config/opencode/memory/
  mentor/profile.md      cross-project learner profile
  mentor/rollup.md       mastery summary after each graduation
```

## Rules of the Road

- English-only docs (Arabic examples welcome in explanations).
- Every learning session writes at least one file under `docs/learning/`.
- No level-up without evidence links; no guilt about missed goals.
- Config reload requires restarting opencode.
