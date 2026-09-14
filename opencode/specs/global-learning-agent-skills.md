# Global Learning Agent — Skills Index

This document describes the core skills that the Global Learning Agent relies on
to act as a teacher across codebases and projects.

Each skill is implemented as a `SKILL.md` file under
`~/.config/opencode/skills/<skill-name>/` (global runtime — available in every
repo) or `.opencode/skills/<skill-name>/` (project runtime, takes precedence).
A template library can be mirrored into a repo's `docs/learning/skills/<skill-name>/`
on demand via `scripts/mirror-skills.js`:

---

## Skills Table

| Skill name            | Role / Purpose                                             | Path                                      | Typical Outputs                         |
|-----------------------|-----------------------------------------------------------|-------------------------------------------|-----------------------------------------|
| mentor-intake         | First mentor session: build profile + goals                | `.opencode/skills/mentor-intake/SKILL.md`         | `docs/learning/mentor/profile.md`, `memory/mentor/profile.md` |
| mentor-roadmap        | Personalized learning plan (milestones, evidence, reviews) | `.opencode/skills/mentor-roadmap/SKILL.md`        | `docs/learning/mentor/roadmap.md`      |
| mentor-mastery        | Evidence-based mastery tracking + adaptive difficulty      | `.opencode/skills/mentor-mastery/SKILL.md`        | `docs/learning/mentor/mastery.md`      |
| mentor-challenge      | Stretch challenges at level+1                              | `.opencode/skills/mentor-challenge/SKILL.md`      | `docs/learning/mentor/challenges.md`   |
| mentor-checkin        | Weekly review + accountability                             | `.opencode/skills/mentor-checkin/SKILL.md`        | `docs/learning/mentor/checkins/<date>-checkin.md` |
| mentor-adapt          | Modes, rhythms, personas, session-ratings feedback        | `.opencode/skills/mentor-adapt/SKILL.md`          | Profile fields, style adjustments                   |
| mentor-stuck          | On-demand rescue: diagnose gap, coach the method          | `.opencode/skills/mentor-stuck/SKILL.md`          | `mentor/decisions.md`, session log                  |
| mentor-mock-interview | Timed scored interview practice                           | `.opencode/skills/mentor-mock-interview/SKILL.md` | `mentor/mock-interviews.md`                         |
| mentor-motivation     | Blockers, habit design, wins log, streak dashboard        | `.opencode/skills/mentor-motivation/SKILL.md`     | `mentor/wins.md`, `mentor/streak.md`                |
| mentor-graduation     | Final assessment, exit interview, rollup, alumni          | `.opencode/skills/mentor-graduation/SKILL.md`     | `mentor/graduation.md`, `memory/mentor/rollup.md`   |
| context-load          | Load existing docs before deep work (memory)              | `.opencode/skills/context-load/SKILL.md`          | Session context (reads docs, no output file) |
| document-project      | Full-project documentation sweep (resumable, coverage)    | `.opencode/skills/document-project/SKILL.md`      | `docs/learning/00-INDEX.md`, `architecture.md`, `walkthroughs/*`, `modules/*` |
| project-type-docs     | Specialized docs by project type                          | `.opencode/skills/project-type-docs/SKILL.md`     | `ai/*`, `api/*`, `ui/*`, `data/*`, `ops/*`, `notebooks/*`, `packages/*` |
| api-reference         | Endpoint reference from OpenAPI/routes                    | `.opencode/skills/api-reference/SKILL.md`         | `docs/learning/api/reference.md`       |
| guided-tour           | Reading path for a persona in the index                   | `.opencode/skills/guided-tour/SKILL.md`           | `## Guided Tour` section in `00-INDEX.md` |
| postmortem            | Incident postmortems                                      | `.opencode/skills/postmortem/SKILL.md`            | `docs/learning/reviews/postmortem-<incident>.md` |
| impact-analysis       | Blast-radius analysis before refactors                    | `.opencode/skills/impact-analysis/SKILL.md`       | `docs/learning/design/impact-<change>.md` |
| threat-model          | Security threat models                                    | `.opencode/skills/threat-model/SKILL.md`          | `docs/learning/security/threat-model-<area>.md` |
| architecture-qa       | Interview/onboarding Q&A doc                              | `.opencode/skills/architecture-qa/SKILL.md`       | `docs/learning/architecture-qa.md`     |
| profiling-notes       | Performance measurement history                           | `.opencode/skills/profiling-notes/SKILL.md`       | `docs/learning/performance/profiling-<area>.md` |
| weekly-digest         | Weekly learning consolidation                             | `.opencode/skills/weekly-digest/SKILL.md`         | `docs/learning/sessions/digest-<YYYY-Www>.md` |
| docs-drift-check      | Staleness check (script + CI gate)                        | `.opencode/skills/docs-drift-check/SKILL.md`      | `scripts/check-docs-drift.js` report   |
| docs-publish          | README badge + static site export                         | `.opencode/skills/docs-publish/SKILL.md`          | Badge snippet, `mkdocs.yml`            |
| docs-mcp              | Expose docs to other tools via MCP                        | `.opencode/skills/docs-mcp/SKILL.md`              | `opencode.json` MCP entry              |
| code-walkthrough      | Explain any file/module step-by-step in deep detail       | `.opencode/skills/code-walkthrough/SKILL.md`      | `docs/learning/walkthroughs/<repo-path>.md` |
| design-alternatives   | Compare architectural/technical alternatives              | `.opencode/skills/design-alternatives/SKILL.md`   | `docs/learning/design/design-alternatives-<topic>.md` |
| decision-rationale    | Capture "why" before major changes (ADR format)           | `.opencode/skills/decision-rationale/SKILL.md`    | `docs/learning/decisions/adr-<n>-<slug>.md` |
| learning-log          | Standardize Markdown logs format                          | `.opencode/skills/learning-log/SKILL.md`          | All `docs/learning/*.md` files          |
| teach-mode            | Turn topics into short curricula with exercises           | `.opencode/skills/teach-mode/SKILL.md`            | `docs/learning/curricula/curriculum-<topic>.md` |
| project-decomposition | Break projects into phases/sprints                        | `.opencode/skills/project-decomposition/SKILL.md` | `docs/learning/design/project-plan-<project>.md` |
| session-to-curriculum | Convert raw sessions into structured lessons              | `.opencode/skills/session-to-curriculum/SKILL.md` | `docs/learning/curricula/session-<id>-lesson.md` |
| grill-me              | Socratic questioning before/after learning                | `.opencode/skills/grill-me/SKILL.md`              | Question lists inside session logs      |
| explain-by-diff       | Explain code changes via git diff                         | `.opencode/skills/explain-by-diff/SKILL.md`       | `docs/learning/diffs/diff-<commit>.md`  |
| understand-anything   | Build repo overviews: modules, services, endpoints, data  | `.opencode/skills/understand-anything/SKILL.md`   | `docs/learning/architecture.md`, `modules/*.md`, `00-INDEX.md` |

---

## How Skills Are Used

- Skills are **discovered on demand** via OpenCode's `skill` tool; the agent calls
  them by name when the task matches (`skill({ name: "code-walkthrough" })`).
- Agents do not "attach" skills — their prompt lists which skills to prefer, and
  the skill tool makes them available at runtime.
- Permissions control access per skill name via `permission.skill` patterns
  (e.g., `"internal-*": "deny"`).

---

## Notes

- Not all skills need to be implemented at once.
- The Global Learning Agent should:
  - Use a skill when available.
  - Fall back to basic explanation/logging when a skill is missing.
- This index should be updated as new skills are added or existing ones are refined.