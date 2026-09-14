---
description: Design a solution and produce an implementation plan with steps, risks and dependencies. READ ONLY — modifies nothing.
agent: architect
---

Design a solution for: $ARGUMENTS

1. Inspect the current project state (architecture, existing code, constraints).
2. Design the architecture: components, data flow, interfaces, and how it fits existing code.
3. Present alternatives with tradeoffs and justify the recommendation.
4. Produce an implementation plan:
   - Ordered steps with concrete files to create/modify
   - Dependencies and their versions (only if genuinely needed — explain why)
   - Risks and mitigations
   - Test/verification strategy for each step
   - VRAM/RAM budget if the change touches model code (RTX 5000 16 GB)
5. Present the plan for approval. Stop. Do not implement anything.

Format: FACT / INFERENCE / RECOMMENDATION / ACTION. End with the approval question.