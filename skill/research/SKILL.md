---
name: research
description: Research methodology. Use when the user says "research", "look up", "verify", "check the docs", "is X compatible with Y", "paper", "latest version", or when the /research command is invoked.
---

# Research Methodology

## Sourcing rules

- Primary sources first: official docs, upstream repos, papers (arXiv), vendor release notes.
- Secondary sources (blogs, SO, Reddit) only to find leads — then verify against primary.
- For rapidly changing tech (PyTorch, CUDA, transformers, vLLM, bitsandbytes): always check current release notes; pin assumptions to versions.

## Before answering "does X work with Y?"

1. Find the official compatibility matrix (release notes, README, issues).
2. Check the workstation anchor versions: PyTorch 2.11.0+cu128, CUDA 12.9 runtime, driver 576.88, sm_75, Ubuntu 24.04.
3. Check sm_75-specific support (many new kernels require Ampere+).

## Output format

- Summary of findings.
- Sources, primary first, with links.
- Confidence per claim: FACT (verified in primary source), INFERENCE (reasoned), UNKNOWN (could not verify).
- Version assumptions recorded explicitly.
- A verification plan the user can run themselves (commands, minimal code).

## Rules

- Never hallucinate an API. If unsure, check docs or say so.
- Record important version assumptions in the project `docs/DECISIONS.md` when they drive a decision.