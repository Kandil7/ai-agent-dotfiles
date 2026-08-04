# Global Learning Agent — Skills Index

This document describes the core skills that the Global Learning Agent relies on
to act as a teacher across codebases and projects.

Each skill is implemented as a `SKILL.md` file under `.opencode/skills/<skill-name>/`
(project runtime), `~/.config/opencode/skills/<skill-name>/` (global runtime — available
in every repo), and mirrored under `learning/skills/<skill-name>/` (template library).

---

## Skills Table

| Skill name            | Role / Purpose                                             | Path                                      | Typical Outputs                         |
|-----------------------|-----------------------------------------------------------|-------------------------------------------|-----------------------------------------|
| code-walkthrough      | Explain any file/module step-by-step                      | `.opencode/skills/code-walkthrough/SKILL.md`      | `learning/code-walkthrough-<file>.md`   |
| design-alternatives   | Compare architectural/technical alternatives              | `.opencode/skills/design-alternatives/SKILL.md`   | `learning/design-alternatives-<topic>.md` |
| decision-rationale    | Capture "why" before major changes                        | `.opencode/skills/decision-rationale/SKILL.md`    | `learning/decision-<change>.md`         |
| learning-log          | Standardize Markdown logs format                          | `.opencode/skills/learning-log/SKILL.md`          | All `learning/*.md` files               |
| teach-mode            | Turn topics into short curricula with exercises           | `.opencode/skills/teach-mode/SKILL.md`            | `learning/curriculum-<topic>.md`        |
| project-decomposition | Break projects into phases/sprints                        | `.opencode/skills/project-decomposition/SKILL.md` | `learning/project-plan-<project>.md`    |
| session-to-curriculum | Convert raw sessions into structured lessons              | `.opencode/skills/session-to-curriculum/SKILL.md` | `learning/session-<id>-lesson.md`       |
| grill-me              | Socratic questioning before/after learning                | `.opencode/skills/grill-me/SKILL.md`              | Question lists inside session logs      |
| explain-by-diff       | Explain code changes via git diff                         | `.opencode/skills/explain-by-diff/SKILL.md`       | `learning/diff-<commit>.md`             |
| understand-anything   | Build repo overviews: modules, services, endpoints, data  | `.opencode/skills/understand-anything/SKILL.md`   | `learning/overview-<repo>.md`           |

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