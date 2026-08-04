---
name: code-walkthrough
description: >-
  Explain any code file or module step-by-step, building a clear mental model of
  structure (imports, classes, functions), execution flow, and responsibilities.
  Teaching-first: produces learning/code-walkthrough-<file>.md with exercises.
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

A Markdown explanation saved under `learning/` via the `learning-log` tool:

- `learning/code-walkthrough-<file-name>.md`

With these sections:

1. Context
2. File Overview
3. Structure (imports, classes, functions)
4. Execution Flow
5. Key Responsibilities
6. Important Patterns / Idioms
7. Exercises
8. Next Steps

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
   - Use the `learning-log` tool to create `learning/code-walkthrough-<file-name>.md`
     with the sections listed under Outputs.

8. **Generate exercises**
   - Create 3–5 exercises based on the file, e.g.:
     - "أضف وحدة اختبار لوظيفة X."
     - "قسّم الوظيفة Y إلى وظيفتين أصغر بمسؤوليات أوضح."
     - "ارسم الـ flow لهذا الملف في ورقة أو في mermaid."

9. **Confirm understanding**
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
