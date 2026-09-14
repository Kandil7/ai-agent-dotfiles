---
name: learning-log
description: >-
  Standardize how learning-related content is logged into Markdown files under
  docs/learning/: folder structure, file naming conventions, and the section
  order (Context, Explanation, Alternatives, Rationale, Exercises, Next Steps).
  Use whenever persisting any learning artifact.
---

# Skill: learning-log

## Purpose

Define a **standard format** and naming convention for Markdown files that
capture learning sessions, code explanations, design alternatives, decision rationales,
and lessons.

This skill ensures that all logs are:

- Structured.
- Easy to scan.
- Reusable as future curriculum material.

---

## When to Use

Use this skill whenever:

- The agent wants to persist an explanation or session into `docs/learning/*.md`.
- A code walkthrough is complete and needs a Markdown document.
- A design comparison or decision rationale has been generated.
- A raw Q&A or debugging session is turned into a lesson.

---

## Folder Structure

All artifacts live under `<repo>/docs/learning/` (inside the project's `docs/`
folder). Category folders keep the tree navigable as it grows:

```
docs/learning/
  00-INDEX.md                     # navigation hub + coverage tracker (keep in sync)
  architecture.md                 # full-project architecture map + mermaid diagrams
  modules/<module>.md             # per-module summaries
  walkthroughs/<repo-path>.md     # deep per-file explanations (mirror the repo tree)
  decisions/decision-<change>.md  # decision rationales (before code changes)
  decisions/adr-<n>-<slug>.md     # ADR format (status, supersedes) + README.md log
  design/design-alternatives-<topic>.md, project-plan-<project>.md, impact-<change>.md
  reviews/review-<file-or-topic>.md, postmortem-<incident>.md
  sessions/YYYY-MM-DD-session-<topic>.md, digest-<YYYY-Www>.md
  curricula/curriculum-<topic>.md, session-<id>-lesson.md
  diffs/diff-<commit>.md
  ai/                             # AI projects: model-cards/, prompts, eval, vector-index
  api/                            # web: cookbook.md, reference.md
  ui/                             # web: components.md, state.md
  config/                         # web: env-vars.md
  data/                           # data platforms: dictionary, lineage, pipelines, schema-evolution
  ops/                            # infra: runbooks/, resources.md, cicd.md
  notebooks/                      # notebooks: <name>.md walkthroughs, experiments.md
  security/                       # threat-model-<area>.md
  performance/                    # profiling-<area>.md
  packages/<pkg>/                 # monorepo: per-package 00-INDEX.md + overview.md
  architecture-qa.md              # interview/onboarding Q&A
  legacy/                         # migrated old learning/*.md files
```

## File Naming Conventions

- Session logs:
  - `docs/learning/sessions/YYYY-MM-DD-session-<topic>.md`
- Code walkthroughs (mirror the repo path):
  - `docs/learning/walkthroughs/<relative-repo-path>.md`
  - Example: `src/rag_pipeline.py` → `docs/learning/walkthroughs/src/rag_pipeline.py.md`
- Design alternatives:
  - `docs/learning/design/design-alternatives-<topic>.md`
- Decision rationales:
  - `docs/learning/decisions/decision-<change-or-commit>.md`
- Reviews:
  - `docs/learning/reviews/review-<file-or-topic>.md`
- Module / architecture docs:
  - `docs/learning/modules/<module>.md`
  - `docs/learning/architecture.md`
- Diff explanations:
  - `docs/learning/diffs/diff-<commit>.md`
- Lessons and curricula:
  - `docs/learning/curricula/session-<id>-lesson.md`
  - `docs/learning/curricula/curriculum-<topic>.md`
- Project plans:
  - `docs/learning/design/project-plan-<project>.md`
- Specialized docs (see `project-type-docs` and related skills):
  - AI: `docs/learning/ai/model-cards/<model>.md`, `ai/prompts.md`,
    `ai/eval-<date>.md`, `ai/vector-index.md`
  - API: `docs/learning/api/reference.md`, `api/cookbook.md`
  - UI/Config: `docs/learning/ui/components.md`, `ui/state.md`, `config/env-vars.md`
  - Data: `docs/learning/data/dictionary.md`, `data/lineage.md`,
    `data/pipelines.md`, `data/schema-evolution.md`
  - Ops: `docs/learning/ops/runbooks/<runbook>.md`, `ops/resources.md`, `ops/cicd.md`
  - Notebooks: `docs/learning/notebooks/<name>.md`, `notebooks/experiments.md`
  - Security: `docs/learning/security/threat-model-<area>.md`
  - Performance: `docs/learning/performance/profiling-<area>.md`
  - Postmortem: `docs/learning/reviews/postmortem-<incident>.md`
  - Impact: `docs/learning/design/impact-<change>.md`
  - Q&A: `docs/learning/architecture-qa.md`
  - Digests: `docs/learning/sessions/digest-<YYYY-Www>.md`
  - Monorepo: `docs/learning/packages/<pkg>/00-INDEX.md`
- Cross-project memory (NOT per-repo docs):
  - `~/.config/opencode/memory/*.md` via the `memory-log` tool

Agents using this skill should pick the appropriate naming pattern
based on the content type. The `learning-log` tool accepts any relative
path inside `docs/learning/` (subfolders are created automatically).

---

## Standard Sections

Each learning Markdown file should follow this structure:

1. **Context**
   - What project / repo is this about?
   - What file/module or subsystem?
   - What was the goal of the session?

2. **Explanation**
   - For code: structure, flow, responsibilities, patterns.
   - For architecture: components, interactions, data flows, constraints.
   - For sessions: main questions and answers.

3. **Alternatives (if applicable)**
   - Other ways to solve the same problem.
   - Other designs or tools considered.
   - Pros/cons for each alternative.

4. **Rationale (Why this?)**
   - Why the current design or approach is chosen.
   - Under what conditions you would change your choice.

5. **Exercises**
   - 3–5 concrete tasks grounded in the repo:
     - write tests
     - refactor functions/classes
     - extend functionality
     - sketch diagrams

6. **Next Steps**
   - Where to go next:
     - deeper dives
     - refactors
     - additional readings
     - related skills to apply

Agents should prefer this section order.
If some sections are not applicable, they can be left empty or omitted.

---

## Workflow for Logging

1. **Determine file type**
   - Is this a session log, walkthrough, design doc, rationale, review, or lesson?

2. **Pick file name**
   - Use the naming conventions above.

3. **Collect content**
   - Summarize context, explanations, alternatives, rationale, exercises, and next steps.

4. **Write using the `learning-log` tool**
   - Call the custom tool with:
     - `filePath` (relative, inside `docs/learning/`, subfolders allowed)
     - `title`
     - `context`, `explanation`, `alternatives`, `rationale`, `exercises`, `nextSteps`
     - `mode` (append vs overwrite)

5. **Verify result**
   - Ensure the file exists under `docs/learning/`.
   - Quick scan to confirm section headings and basic content.

6. **Update the index**
   - If `docs/learning/00-INDEX.md` exists, refresh the affected row(s):
     mark status `new`/`updated YYYY-MM-DD` and keep the coverage percentage honest.
   - This keeps the index usable as the single navigation hub.

---

## Notes

- This skill does not enforce content length.
  - Keep files readable and focused, not huge transcripts.
- Agents should know how to choose the right file type.
- Over time, you can add more sections (e.g., references, metrics) if needed.
