---
name: docs-publish
description: >-
  Make docs/learning visible: add a coverage badge to the README and export the
  docs to a static site (MkDocs/VitePress) with nav generated from
  00-INDEX.md. Use when the user asks "how do I share these docs", wants a
  badge, or wants a browsable site for the team.
---

# Skill: docs-publish

## Purpose

Great docs nobody can see might as well not exist. `docs-publish` handles the
**visibility layer**: a coverage badge in the README and a static site that the
whole team can browse.

---

## When to Use

Use this skill when:

- The user wants a documentation badge in the README.
- The user asks "أزاي أنشر التوثيق ده؟" / "how do I share/publish these docs".
- The team wants a browsable site for `docs/learning/`.

---

## Outputs

1. **Coverage badge** — compute coverage % (from `00-INDEX.md` or the drift
   script) and produce a shields.io-style badge:
   - `![docs](https://img.shields.io/badge/docs-64%25-orange)` (color: green
     ≥80%, orange ≥40%, red below).
   - Show the exact Markdown to paste at the top of the README.
2. **Static site config** — generate `mkdocs.yml` (or `docs/.vitepress` config)
   at the repo root with `docs/` as the site dir:

```yaml
site_name: <repo> — Learning Docs
nav:
  - Home: learning/00-INDEX.md
  - Architecture: learning/architecture.md
  - Modules: learning/modules/
  - Walkthroughs: learning/walkthroughs/
  - Decisions: learning/decisions/
  - Design: learning/design/
  - Reviews: learning/reviews/
  - Sessions: learning/sessions/
  - Curricula: learning/curricula/
  - API: learning/api/
  - Ops: learning/ops/
```

3. **Serve/deploy instructions**:
   - Local: `mkdocs serve` / `npx vitepress dev docs`
   - GitHub Pages: `mkdocs gh-deploy` (or a workflow deploying `site/`).

---

## Step-by-Step Workflow

1. **Compute coverage** — read `00-INDEX.md` (or run
   `scripts/check-docs-drift.js --json`) for the current %.
2. **Produce the badge** — build the shields URL; show the README snippet and
   (with user permission) edit the README to add it.
3. **Generate the site config** — create `mkdocs.yml` with nav derived from the
   actual folders present (skip empty ones).
4. **Verify locally** — if mkdocs/vitepress is installed, run a local serve
   (bash with confirmation) and confirm the index page renders.
5. **Deploy (optional)** — follow the user's hosting preference; never push
   without explicit request.

---

## Notes

- The site config is small; keep it generated from the real folder list so it
  doesn't drift.
- Badge updates automatically when coverage changes IF the badge URL is
  computed per-run — simplest is a static badge refreshed by CI (pair with
  `docs-drift-check`).
- Read-only for source; writes only `mkdocs.yml`, docs under `docs/learning/`,
  and README edits with permission.
