---
description: >-
  Decompose a complex task into focused subtasks, dispatch explorer and coder
  agents with context-store injection, verify results, and synthesize compound
  intelligence. For multi-step tasks that benefit from parallel exploration.
agent: orchestrator
---

Orchestrate the following task: $ARGUMENTS

## Orchestration Protocol

1. **Analyze** the task — understand scope, complexity, dependencies.
2. **Check context-store** — `context-store list` for existing knowledge.
3. **Decompose** into focused subtasks:
   - Each subtask gets a clear title (max 7 words), detailed description,
     explicit context to inject, and expected artifacts to return.
   - Simple tasks: 1-2 subtasks. Medium: 3-5. Complex: up to 8.
4. **Dispatch explorers first** — read-only intelligence gathering.
   - Store results in context-store with task_id grouping.
5. **Dispatch coders** — implementation with injected contexts.
   - Each coder receives accumulated knowledge from explorers.
6. **Verify** — dispatch explorer agents to verify implementations.
7. **Synthesize** — compile results, update context-store, report to user.

## Context Store Usage

Before each dispatch:
```
context-store list
context-store read --id "<relevant_artifact>"
```

After each completion:
```
context-store write --id "<knowledge_id>" --content "<artifact>" --reported_by "<agent_type>" --task_id "<task_id>"
```

## Time Budgets

- Simple (1-2 steps): ~5 minutes total
- Medium (3-5 steps): ~15 minutes total
- Complex (6+ steps): ~30 minutes max

## Safety

Read-only for source code inspection. Write only via context-store, project-log,
and memory-log. Never modify code directly — dispatch coder agents for that.
