# Patterns adopted from mattpocock/skills for opencode

### Context

Major config improvement session: compared opencode's skill system against mattpocock/skills (241k stars) and adopted high-value patterns.

### Explanation

Key patterns adopted:
1. GATED DIAGNOSIS (debugging) — 6 phases with strict gating: no feedback loop, no hypothesis. Prevents the #1 debugging failure mode.
2. TWO-AXIS CODE REVIEW — Standards vs Spec as parallel sub-agents, reported side by side. A change can pass one axis and fail the other.
3. TDD SEAMS-FIRST (testing) — agree on test boundaries before writing any test. Anti-patterns: implementation-coupled, tautological, horizontal slicing.
4. INTERVIEW PRIMITIVE (grilling) — design tree with frontier tracking. Asks the whole frontier in one round. Ends when nothing is silently assumed.
5. HANDOFF — portable conversation summary for another agent/session. Saved to OS temp, not workspace.
6. WAYFINDER — fog-of-war map for huge multi-session efforts. Tickets emerge as the frontier advances.
7. DOMAIN MODELING — CONTEXT.md glossary with _Avoid_ terms. ADRs gated by "all three must be true."
8. PHASE BOUNDARY DISCIPLINE — at phase gaps, evaluate: continue > clear > handoff > subagent > compact (compact is last resort, not first reach).
9. NO-OP PRUNING — removed ~40 sentences that restated AGENTS.md rules (FACT/INFERENCE labels, storage policy, "READ ONLY" in frontmatter-redundant commands).
10. /ASK ROUTER — single entry point for all commands instead of remembering 36 commands.

### Alternatives

Could have imported mattpocock skills verbatim via skills.sh, but they lack the AI engineering domain knowledge (CUDA, VRAM budgets, QLoRA, Arabic NLP) that opencode's skills already have. Better to adopt the behavioral patterns while keeping domain expertise.

### Rationale (Why this?)

The behavioral patterns (gated diagnosis, two-axis review, grilling, wayfinder) are universally applicable. The domain-specific content (AI engineering, CUDA, RTL constraints) is opencode's competitive advantage. Combining both gives the best of both worlds.

### Exercises

1. Use /grill before /plan on the next feature to test the interview primitive
2. Use the new /debug flow on a real bug to verify the gated phases work
3. Run /review on a PR to test the two-axis parallel sub-agent approach
4. Create a CONTEXT.md for one of your projects using the new standard
5. Try /wayfinder for a multi-session effort (e.g., Athar RAG pipeline)

### Next Steps

Monitor usage patterns. The wayfinder and domain-modeling skills are untested in production — refine after first real use. The no-op pruning should reduce context token consumption per skill load by ~15-20%.

---
