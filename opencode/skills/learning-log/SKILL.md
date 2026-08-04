---
name: learning-log
description: >-
  Standardize how learning-related content is logged into Markdown files under
  learning/: file naming conventions and the section order (Context, Explanation,
  Alternatives, Rationale, Exercises, Next Steps). Use whenever persisting any
  learning artifact.
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

- The agent wants to persist an explanation or session into `learning/*.md`.
- A code walkthrough is complete and needs a Markdown document.
- A design comparison or decision rationale has been generated.
- A raw Q&A or debugging session is turned into a lesson.

---

## File Naming Conventions

- Session logs:
  - `learning/YYYY-MM-DD-session-<topic>.md`
- Code walkthroughs:
  - `learning/code-walkthrough-<file-or-module>.md`
- Design alternatives:
  - `learning/design-alternatives-<topic>.md`
- Decision rationales:
  - `learning/decision-<change-or-commit>.md`
- Reviews:
  - `learning/review-<file-or-topic>.md`
- Project overviews:
  - `learning/overview-<repo-or-subsystem>.md`
- Diff explanations:
  - `learning/diff-<commit>.md`
- Lessons and curricula:
  - `learning/session-<id>-lesson.md`
  - `learning/curriculum-<topic>.md`

Agents using this skill should pick the appropriate naming pattern
based on the content type.

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
     - `filePath` (relative, inside `learning/`)
     - `title`
     - `context`, `explanation`, `alternatives`, `rationale`, `exercises`, `nextSteps`
     - `mode` (append vs overwrite)

5. **Verify result**
   - Ensure the file exists under `learning/`.
   - Quick scan to confirm section headings and basic content.

---

## Notes

- This skill does not enforce content length.
  - Keep files readable and focused, not huge transcripts.
- Agents should know how to choose the right file type.
- Over time, you can add more sections (e.g., references, metrics) if needed.
