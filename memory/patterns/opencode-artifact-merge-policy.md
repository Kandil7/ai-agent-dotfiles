# Merging external AI config proposals: adopt gaps, reject conflicts

### Context

User received a Perplexity-generated "opencode improvement packet" in Downloads\artifacts (AGENTS-global.md, opencode-config.json + v2, 3 skills, deep-research report) and asked to "improve opencode based on artifacts". The live config at ~/.config/opencode is far more developed than the proposals, so the work was a selective merge, not an adoption.

### Explanation

Merge rule that held up: adopt only deltas that fill verified gaps; reject anything conflicting with documented decisions. Adopted: new `arabic-nlp` skill (Arabic/Islamic normalization, Quran/Hadith chunking+metadata, Arabic model tables — was missing entirely), cloud/Colab variant appended to `qlora` (fp16 NOT bf16 on T4 — Turing sm_75 has no bf16; artifact had this wrong), training-diagnostics + API-triage sections appended to `debugging` (NaN checklist, overfit-one-batch heuristic, non-GPU root-cause catalog), concise User-Profile section in global AGENTS.md, template Env-Vars/Gotchas/Cloud/Focus sections, `/teach` thin wrapper to the existing teacher agent, watcher.ignore block, ruff formatter (verified installed first), edit-permission object form with `**/.env*` ask placed AFTER `*` allow (last-match-wins). Rejected: anthropic models (0 credentials via `opencode auth list`), ask-default permissions (reverses documented 2026-08-18 full-access decision), pip install allow (violates safety rules), 5 duplicate agents + 6 duplicate commands. Schema facts: opencode hard-fails on unknown top-level keys; authoritative shapes at https://opencode.ai/config.json ($defs.Config) — watcher={ignore:[]}, formatter={<name>:{command:[],extensions:[]}} (artifact's language/python shape was invalid), lsp={<server>:{command:[]}}, permission.edit accepts pattern objects. PS 5.1 ConvertFrom-Json falsely reports duplicate keys for case-differing JSON keys (-d vs -D); Node validator is authoritative.

### Rationale (Why this?)

Blind adoption of external AI config proposals would have downgraded a tuned system and broken startup (invalid formatter shape, unavailable providers). The gap-first merge preserved all deliberate decisions while adding real domain value. Revisit if the user gets API credentials or wants plugin observability.

### Next Steps

Revisit community plugins (otel, Planning-with-Files) only after using merged skills for a while; pyright LSP stays unset until deliberately installed (npm i -g pyright needs approval). Restart opencode to load new config/skills/commands.

---
