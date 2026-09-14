---
description: Scaffold a new project from the global template (AGENTS.md, .opencode/, docs/, .gitignore).
---

Scaffold a new project from the global template.

Arguments: $ARGUMENTS  (format: <project-name> [parent-directory])

1. Parse the project name from the arguments. If a parent directory is given, use it; otherwise use the current working directory.
2. Locate the global template at `C:\Users\Kandil\.config\opencode\template\` (in WSL: `/mnt/c/Users/Kandil/.config/opencode/template/`).
3. Copy the entire template into `<parent>/<project-name>`:
   - `AGENTS.md` -> resolve placeholders: replace `<PROJECT NAME>` with the project name.
   - `.opencode/opencode.json`, `.gitignore`, `docs/` (ARCHITECTURE, DECISIONS, CURRENT-STATE, PROJECT-CHECKPOINT, ROADMAP) -> copy as-is.
4. If the target is inside a WSL filesystem path, use WSL-aware copying; report what you did.
5. If git is available, run `git init` in the new project (do NOT commit).
6. Report:
   - Created files list
   - The docs/ conventions now in place
   - Recommended next steps: `/status` or `/inspect`, then edit docs/ARCHITECTURE.md

Rules: do not create the project if it already exists (report the conflict instead). Do not install anything. Do not commit.