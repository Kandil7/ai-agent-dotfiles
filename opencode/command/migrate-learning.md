---
description: >-
  Migrate an existing <repo>/learning/ folder (old flat format) into
  docs/learning/legacy/ with a source-marker header, and print a summary.
  Asks before any deletion; never deletes without explicit user consent.
agent: learning
---

Migrate legacy learning artifacts from the old `learning/` folder into the new
`docs/learning/` structure.

Instructions:

1. Check whether `<repo>/learning/` exists. If it does not, report that there is
   nothing to migrate and stop.
2. List all `*.md` files under `learning/` (recursively).
3. For each file:
   - Create `docs/learning/legacy/<original-relative-path>` (keep subfolders
     if any; the `learning-log` tool creates folders on demand — or use `bash`
     copy with user confirmation).
   - Copy the content and prepend a marker header:

     ```
     > Migrated from `learning/<path>` on <YYYY-MM-DD> by /migrate-learning.
     > See docs/learning/00-INDEX.md for the current documentation hub.
     ```

4. Report:
   - number of files migrated and their destinations,
   - any files skipped (non-Markdown, binary, unreadable) and why,
   - a recommendation to review the docs and fold the best content into the new
     structure (walkthroughs/, decisions/, sessions/, ...).
5. **Do NOT delete the old `learning/` folder automatically.** Ask the user
   explicitly ("هل تريد حذف مجلد learning/ القديم؟") and only remove it if they
   confirm, after they have inspected the migrated files.

Safety: read-only for source code; no commits; no deletions without explicit
user consent.
