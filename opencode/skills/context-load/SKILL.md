---
name: context-load
description: >-
  Load the project's existing docs (docs/learning/) BEFORE deep work so every
  session starts warm: reads 00-INDEX.md, architecture.md, relevant modules/
  and walkthroughs, then answers from the docs instead of re-reading source.
  Use at the start of any session about an already-documented project, or when
  the user asks "you should already know this".
---

# Skill: context-load

## Purpose

Give the agent **project memory between sessions**. When `docs/learning/`
exists, most questions about the repo can be answered from the docs that
earlier sessions already produced — faster, deeper, and consistent with what
was previously taught.

This skill is **memory-first**: load before you re-derive.

---

## When to Use

Use this skill when:

- Starting any session in a repo that may have `docs/learning/`.
- The user says "اعمللي ملخص من اللي اتعلمناه قبل كده" / "you should already know
  this project".
- `00-INDEX.md` exists and the topic (module/file/design) has a doc entry.
- The agent is about to re-read files that already have walkthroughs.

Do NOT use when: the repo has no `docs/learning/` (skip silently — no error,
just proceed from source).

---

## Step-by-Step Workflow

1. **Check the hub**
   - Does `<repo>/docs/learning/00-INDEX.md` exist?
   - If not: report "no learning docs yet — consider /document-project" and
     proceed with normal source reading.
   - If yes: read it fully. It is the map of everything known.

2. **Read the architecture layer**
   - Read `docs/learning/architecture.md` (if present).
   - Read `docs/learning/modules/*.md` for modules related to the question.

3. **Read the relevant walkthroughs**
   - For each file the session will touch, read
     `docs/learning/walkthroughs/<repo-path>.md` (if present).
   - For design/decision questions, read the matching entries under
     `docs/learning/design/` and `docs/learning/decisions/`.

4. **State what you know**
   - Before answering, tell the user briefly: "From the docs I already know: …"
     (2–3 bullets). This makes memory visible and lets them correct it.

5. **Answer from docs; flag gaps**
   - Prefer doc knowledge over re-reading source.
   - If a doc is missing or `stale` per the index, say so and read the source
     instead; optionally mark the index row `stale` for a later
     `/document-project update` pass.

6. **Do not bloat the session**
   - Read only what the question needs. For huge walkthroughs, read the TL;DR
     and relevant sections (the deep-detail standard puts them at the top).

---

## Notes

- Read-only: never writes; only the index status may be flagged in chat.
- Works hand-in-hand with `document-project`: the sweep produces the memory;
  this skill consumes it.
- If memory contradicts new code, trust the code, say so, and suggest an update.
