---
name: code-walkthrough
description: >-
  Explain any code file or module step-by-step in deep detail, building a clear
  mental model of structure (imports, classes, functions), execution flow, edge
  cases, and performance. Teaching-first: produces
  docs/learning/walkthroughs/<repo-path>.md with exercises.
---

# Skill: code-walkthrough

## Purpose

Help the agent explain any code file or module step-by-step, building a clear mental model of:

- Structure (imports, classes, functions).
- Control flow (what runs first, what calls what).
- Responsibilities (what each part is supposed to do).

This skill is **teaching-first**: the goal is understanding, not editing.

---

## When to Use

Use this skill when:

- The user says things like:
  - "اشرح لي الملف ده من الصفر."
  - "عايز أفهم الـ RAG module."
  - "فهمني الكود ده سطر سطر أو خطوة خطوة."
- The agent needs to build a mental model of a file/module before suggesting changes.
- A learning session is focused on code comprehension rather than design or deployment.

---

## Inputs

- Target file path or module (e.g. `athar/rag_pipeline.py`).
- Optional:
  - User level: beginner / intermediate / advanced.
  - Focus area: structure / flow / responsibilities / performance.

---

## Outputs

A Markdown explanation saved under `docs/learning/` via the `learning-log` tool:

- `docs/learning/walkthroughs/<relative-repo-path>.md`
  (mirror the repo tree: `src/rag_pipeline.py` → `walkthroughs/src/rag_pipeline.py.md`)

### Deep-Detail Standard (mandatory sections)

Every walkthrough MUST contain all of the following. Put them inside the
`explanation` field of `learning-log` as `###` subheadings (the tool wraps them
under `### Explanation`):

1. **TL;DR** — 3–5 bullets summarizing what this file does, for a beginner.
2. **File Overview & Role in the Project** — what the file is for, who imports it,
   who it imports (dependency graph summary), and where it sits in the system.
3. **Imports & Dependencies** — external vs internal imports, and WHY each is used.
4. **Structure** — every class (methods with signatures) and every function
   (signature + one-line purpose). Note constants, config, and globals.
5. **Execution Flow** — step-by-step walk of the main entry point(s):
   Input → processing steps → output, with **line references** where helpful.
6. **Key Responsibilities** — what each major piece does and why it exists.
7. **Patterns & Idioms** — design patterns, idioms, or framework conventions used.
8. **Edge Cases & Failure Modes** — empty inputs, missing keys, timeouts, exceptions,
   concurrency issues; how the code handles (or fails to handle) them.
9. **Performance Notes** — hot paths, I/O, caching, complexity concerns.
10. **Exercises** — 3–5 hands-on tasks grounded in this file (see workflow step 8).

Add a **mermaid diagram** (`flowchart` or `sequenceDiagram`) when the flow is
non-trivial. Keep the doc readable: no full code dumps — quote only key lines
with line references.

---

## Step-by-Step Workflow

1. **Clarify scope**
   - Ask the user:
     - Which file/module should we focus on?
     - What is your level (beginner / intermediate / advanced)?
     - Do you care more about structure, flow, or responsibilities right now?

2. **Read the file**
   - Use the `read` tool to load the file contents.
   - If the file is too large, focus on the most important parts (main functions/classes).

3. **Identify structure**
   - List:
     - Imports (external libraries, internal modules).
     - Global constants or configuration.
     - Classes (names, main methods).
     - Top-level functions.
   - Summarize each element in 1–2 sentences.

4. **Map the execution flow**
   - Identify:
     - Entry points (e.g. `main()`, HTTP handlers, CLI commands).
     - How requests or data flow through the functions/classes.
     - The typical lifecycle: Input → processing steps → output.

5. **Explain responsibilities**
   - For each major function/class:
     - Explain "what it does" in simple language.
     - Explain "why it exists" in the bigger picture of the project.
   - Highlight separation of concerns (if present) or where it is missing.

6. **Highlight patterns**
   - Point out interesting patterns, such as:
     - Dependency injection
     - Repository/service layers
     - Pipelines / handlers
     - RAG-specific components (retrievers, chunkers, re-rankers, etc.)
   - Explain each pattern very briefly and link it to the code.

7. **Write the walkthrough to Markdown**
   - Use the `learning-log` tool to create
     `docs/learning/walkthroughs/<relative-repo-path>.md`
     (e.g. `filePath: "walkthroughs/src/rag_pipeline.py.md"`) with ALL sections
     of the Deep-Detail Standard listed under Outputs.
   - Use `mode: overwrite` when the file already exists and the source changed.

8. **Generate exercises**
   - Create 3–5 exercises based on the file, e.g.:
     - "أضف وحدة اختبار لوظيفة X."
     - "قسّم الوظيفة Y إلى وظيفتين أصغر بمسؤوليات أوضح."
     - "ارسم الـ flow لهذا الملف في ورقة أو في mermaid."

9. **Update the index**
   - If `docs/learning/00-INDEX.md` exists, mark this file's row
     `updated YYYY-MM-DD` (or add a row if missing).

10. **Confirm understanding**
   - Ask the user:
     - Which part is still unclear?
     - Do you want a deeper dive into a specific function/class?

---

## Notes

- This skill is read-only by default.
- Prefer explanation and logging over editing.
- If the user explicitly asks for refactor, the agent should:
  - First run `code-walkthrough`.
  - Then switch to refactor-oriented skills (e.g. `design-alternatives`, `decision-rationale`).
