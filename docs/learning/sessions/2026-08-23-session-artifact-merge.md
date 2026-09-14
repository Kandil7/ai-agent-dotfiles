# Session 2026-08-23 — Merging the Downloads\artifacts opencode proposals

## Context

User asked to "improve opencode based on C:\Users\Kandil\Downloads\artifacts"
(a Perplexity-generated packet: AGENTS-global.md, two opencode configs, three
skills, a deep-research report). The live config was already more developed
than the proposals; an explore-agent comparison quantified overlap before any
change. Goal: merge genuine gaps, reject conflicts.

## Explanation

What changed (all additive unless noted):

- `skill/arabic-nlp/SKILL.md` (NEW) — Arabic normalization table,
  tokenization checks, embedding/generative model tables, Quran/Hadith
  chunking + isnad/grade metadata, scholarly-accuracy guardrails.
  Filled the biggest verified gap: zero Arabic/Islamic coverage existed.
- `skill/qlora/SKILL.md` — appended "Cloud variant (Colab T4 / Vast.ai)":
  data prep, SFTTrainer starting hyperparameters, export/push flow, Colab
  cell, pitfalls. CORRECTED the artifact's bf16-on-T4 error → fp16 (Turing).
- `skill/debugging/SKILL.md` — appended training diagnostics (loss plateau,
  overfit-one-batch heuristic, NaN checklist), general ML root-cause catalog,
  API/service triage, taxonomy + 15-min step-back rule. Dropped the artifact's
  redundant OOM/method content (~60% overlap with what already existed).
- `AGENTS.md` — one new concise section: User Profile & Domains (Athar/
  Baligh, depth-over-speed, cloud-hybrid pointer, Egypt constraints).
- `template/AGENTS.md` — added Environment Variables table, Gotchas,
  Cloud Execution Notes, Current Focus sections.
- `opencode.jsonc` — watcher.ignore block; formatter ruff (verified
  installed 0.16.4 first); permission.edit moved from string to object form
  with `**/.env*` ask placed last (last-match-wins convention).
- `command/teach.md` (NEW) — thin wrapper delegating to the existing teacher
  agent; discoverability only, no duplication.
- `docs/SYSTEM-MAP.md` — counts 24→25 skills, 30→31 commands, config-extras
  section, date bump.

Rejected (with reasons logged in memory/patterns/opencode-artifact-merge-policy.md):
anthropic model config (0 credentials), ask-default permissions (reverses the
documented full-access decision), pip-install allow (violates safety rules),
5 duplicate agents, 6 duplicate commands, generic RAG/OOM/debug duplicates,
community plugins (deferred by user choice).

## Alternatives

1. Adopt artifacts wholesale — rejected: would break startup (invalid
   formatter shape per schema), dead provider config, and reverse deliberate
   safety decisions. 2. Reject everything — rejected: real domain gaps
   (Arabic/Islamic NLP, cloud fine-tuning, ML diagnostics) had no home.

## Rationale (Why this?)

Schema-first editing: every new config key was checked against
https://opencode.ai/config.json before writing because opencode hard-fails on
unknown keys (`additionalProperties:false`). Tool availability was measured
(`Get-Command ruff/pyright`) rather than assumed. Skills stay lean and
on-demand per the SSW rule the research report itself cites.

## Exercises

1. Restart opencode; confirm `/teach` appears in commands and `arabic-nlp`
   triggers on "normalize Arabic text".
2. Try editing a `.env` file in build mode → expect an ask prompt.
3. Ask for a Colab QLoRA script → answer should use fp16 on T4, not bf16.
4. Run `node ~/.config/opencode/scripts/validate-config.mjs` after any future
   config edit (92 PASS baseline as of this session).

## Next Steps

- pyright LSP intentionally unset — install deliberately if wanted.
- Revisit community plugins after a few weeks of merged-skill usage.
- If HF/API credentials are ever added, revisit model routing then.

---
