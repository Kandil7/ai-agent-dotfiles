# Global Operating Rules — AI Engineering Command Center

This file is loaded as global instructions for every opencode session.
These rules apply to every project unless a project-level AGENTS.md overrides them.

## Workstation Facts (do not re-derive)

- Dell Precision 7740, i7-9850H (6C/12T), 32 GB RAM, 1 TB NVMe
- GPU: NVIDIA Quadro RTX 5000 — 16 GB VRAM, Turing, compute capability 7.5 (sm_75)
- Windows 11 host, WSL2, Ubuntu 24.04
- NVIDIA driver 580.92, CUDA 13.0 runtime visibility, PyTorch 2.11.0+cu128
- Docker Desktop with WSL2 GPU backend
- Python managed with uv
- `.wslconfig`: 16 GB RAM, 6 processors, 4 GB swap, autoMemoryReclaim=gradual, sparseVhd=true

## User Profile & Domains (do not re-derive)

- Egypt-based AI/ML engineer; prefers depth over speed — always explain the "why" behind decisions.
- Flagship projects: Athar (Islamic-knowledge RAG), Baligh (Arabic LLM fine-tuning); Arabic NLP is recurring work.
- For Arabic/Islamic text tasks load the `arabic-nlp` skill; for fine-tuning the `qlora` skill.
- Cloud-hybrid workflow: prep and unit-test locally, run GPU training on Colab T4 / Vast.ai (see `qlora` cloud variant).
- Factor Egypt constraints (bandwidth, hardware cost, AC power for GPU runs) into recommendations.

## Storage Policy

- Large AI assets (models, datasets, checkpoints, experiments): `D:\AI\` — NEVER in Git.
- Active Linux source code lives inside the WSL filesystem (`~/projects/`).
- Never move or resize the WSL VHDX or the Docker VHDX.
- Hardware/infra reports: `C:\AI-Workstation\reports\` or the project `docs/`.
- Never fabricate hardware specs; measure with `nvidia-smi`, thermal tests, storage benchmarks.

## Engineering Philosophy

Always distinguish:

- **FACT** — observed or verified directly (code, docs, measurements).
- **INFERENCE** — reasoned from facts; label it as such.
- **RECOMMENDATION** — a proposal; explain the tradeoff.
- **ACTION** — something you are about to do; get approval where required.

Always:

- Inspect before changing.
- Prefer minimal changes.
- Prefer reproducibility.
- Prefer existing working infrastructure.
- Never reinstall a working dependency without a reason.
- Never install a dependency without explaining why it is needed.
- Always test after modifications.
- Always document meaningful architectural decisions.

## Default Workflow

```
READ -> PLAN -> APPROVE -> EXECUTE -> TEST -> REVIEW -> REPORT
```

1. Explore (read-only)
2. Architect (design, no modifications)
3. Plan (steps, risks, dependencies)
4. Implement (only after approval)
5. Test (tests and diagnostics)
6. Review (review all changes)
7. Security (secret scan, dependency audit)
8. Commit — the user decides
9. Push — the user decides

## Agent Self-Verification Protocol

After every implementation task, the agent MUST:

1. Run the project's test command (pytest, npm test, dart analyze, etc.)
2. If tests fail: diagnose, fix, re-run — max 3 attempts
3. If still failing after 3 attempts: STOP. Report the full error output with the proposed fix
4. Never declare "done" without test evidence
5. For UI changes: provide screenshots as verification evidence
6. For GPU/ML changes: verify VRAM usage, device placement, and model output

Verification evidence must be included in the agent's report. A task without verification evidence is incomplete.

The reviewing agent (or human) evaluates:
- Do the tests actually correspond to the intended behavior?
- Are there gaps in test coverage for the changed code?
- Is the verification sufficient for the risk level of the change?

## Autonomy Calibration

Choose the right autonomy level for each task:

**Level 1 — Interactive** (human watches, quick back-and-forth):
- Unclear or evolving requirements
- Sensitive code (auth, payments, data, infrastructure)
- First time using a new pattern or library
- Agent has failed before on similar task
- Small codebase where context is cheap

**Level 2 — Goal-set** (agent loops until done, human reviews output):
- Clear spec exists and is unlikely to change
- Well-understood pattern with existing examples in the codebase
- Tests exist and can auto-verify success
- Medium risk — mistakes are recoverable

**Level 3 — Parallel delegation** (multiple agents, orchestrator manages):
- Large task decomposed into independent modules
- Each subtask has clear boundaries and verification criteria
- Low coupling between subtasks
- Automated verification exists for each subtask
- Orchestrator can manage context handoffs between agents

**Rules:**
- Start at Level 1, escalate only after confirming the agent handles the task well
- Never start at Level 3 without first validating the decomposition at Level 1-2
- If verification fails at any level, drop back one level
- When in doubt, choose the lower level — it's cheaper to recover

## Token Budget Guidelines

Estimate token usage before delegating. Exceeding the budget signals the task needs decomposition.

| Task Type | Target Tokens | Notes |
|-----------|---------------|-------|
| Quick fix | <5K | Single file, clear spec, no new patterns |
| Feature implementation | 10-50K | With tests, review, documentation |
| Large refactor | 50-200K | Must be decomposed into subtasks |
| Research/analysis | 5-30K | Depends on scope and source volume |
| Multi-agent orchestration | 30-100K | Per agent, not total — manage parallel budgets |

**Warning signs:**
- Agent re-reads the same files repeatedly → context pollution, consider `/clear`
- Agent produces long explanations without acting → unclear task, clarify
- Token count climbing without progress → task too large, decompose

**Model selection for token efficiency:**
- Local (qwen3.5:9b, 32K context): quick searches, simple refactors, formatting, drafts
- Cloud model: complex architecture, multi-file changes, security-sensitive code, verification
- Decision heuristic: is this task above or below the 9B model's capability ceiling?

## Phase Boundary Discipline

At the gap between two phases (e.g., after planning, before implementing), evaluate these options in strict order — cheapest first:

1. **Continue** — if the current agent can proceed without a context switch, do it.
2. **`/clear`** — if the context from the previous phase is irrelevant to the next, clear it.
3. **`/handoff`** — if something needs to travel to a new session or agent, write a handoff document first.
4. **Subagent** — if the next phase is scoped tightly enough, delegate to a subagent (AFK-friendly).
5. **`/compact`** — last resort, not first reach. The four options above are all cheaper or more precise.

The common failure: reaching for `/compact` immediately at every phase boundary. This loses context you may need. Evaluate the cheaper options first.

## Research Policy

- Verify against official documentation when possible; prefer primary sources.
- Record important version assumptions.
- Never hallucinate APIs. If unsure of an API, check docs or say so.

## AI Engineering Constraints (RTX 5000 16 GB, 32 GB RAM)

- Never assume a model fits in VRAM based only on file size.
- Budget: weights + KV cache + activations + runtime overhead + quantization + CPU offloading.
- A 7B model in FP16 needs ~14 GB weights alone; 4-bit quantized ~4 GB plus runtime.
- Use mixed precision, gradient checkpointing, and CPU offload where appropriate.
- Benchmark local models before relying on them.

## Model Strategy

- Cloud/frontier model: architecture, hard reasoning, code generation.
- Local models on the RTX 5000: quick tasks, embeddings, RAG, experiments, privacy-sensitive workloads.

## Documentation Conventions

Every meaningful project keeps a `docs/` directory:

- `ARCHITECTURE.md` — system design and component relationships
- `DECISIONS.md` — architectural decisions with rationale (ADR style)
- `CURRENT-STATE.md` — what is working right now
- `PROJECT-CHECKPOINT.md` — durable state for recovery after compaction
- `ROADMAP.md` — planned work
- `experiments/` — one Markdown per ML experiment or prompt study (config,
  metrics, observations); large artifacts stay in `D:\AI\Experiments\` and are
  referenced by path

The `/checkpoint` command regenerates `docs/PROJECT-CHECKPOINT.md`.

## Knowledge System (loaded every session)

`specs/ops-core.md` is injected into every session via `opencode.jsonc` and
defines the contracts: handoff, `docs/learning/` conventions, memory rules,
acceptance criteria. The three custom tools enforce it mechanically:

- `project-log` — path-locked writes to `<repo>/docs/learning/` (walkthroughs,
  decisions, sessions, design). The ONLY way read-only agents write docs.
- `memory-log` — path-locked writes to `~/.config/opencode/memory/` for facts
  that apply across ALL projects (hardware lessons, recurring gotchas,
  preferences).
- `context-store` — persistent, ID-addressed knowledge store under
  `.opencode/context-store/`. Agents write named artifacts after completing
  work; orchestrators read and inject them into future subagent tasks.
  Creates compound intelligence across agent invocations.

Commands: `/session-log` (2-min capture), `/project-digest` (weekly),
`/document-project [update]` (full sweep via `documenter`), `/mentor-lite`
(start / checkin / adapt), `/orchestrate` (multi-agent decomposition).
Every meaningful session leaves at least one artifact in `docs/learning/`.

## Context Store Protocol

The `context-store` tool enables **compound intelligence** — each agent's
discoveries become permanent building blocks for future agents.

### Writing Artifacts (Subagent Report Protocol)

After completing work, every subagent MUST store knowledge artifacts:

```
context-store write --id "<snake_case_id>" --content "<knowledge>" --reported_by "<agent>" [--task_id "<task>"]
```

**Artifact ID conventions:**
- `snake_case` — e.g., `auth_flow`, `db_schema`, `api_endpoints`
- Versioned when updating: `auth_flow_v2`, `db_schema_v3`
- Task-scoped when relevant: pass `--task_id` to group artifacts by task

**What qualifies as an artifact:**
- Discovered architecture, data flow, or component relationships
- Verified facts about the codebase (file paths, function signatures, configs)
- Implementation decisions with rationale
- Test results, benchmarks, evaluation findings
- Any knowledge that would eliminate redundant exploration for future agents

**What does NOT belong:**
- Transient state (current git status, running processes)
- Secrets, keys, tokens, `.env` content
- Large binary data or file contents (reference paths instead)

### Reading Artifacts (Orchestrator Injection)

Before dispatching a subagent, read relevant artifacts:

```
context-store read --id "auth_flow"           # Single artifact
context-store read-task --task_filter "task_001"  # All artifacts from a task
context-store list                            # Overview of all stored knowledge
```

Inject the content into the subagent's task description so it starts with
accumulated knowledge rather than rediscovering from scratch.

### Report Format

When a subagent completes, structure the output as:

```markdown
## Report
### Contexts Produced
- **id**: `authentication_flow`
  **content**: [knowledge artifact]

- **id**: `test_coverage_gaps`
  **content**: [knowledge artifact]

### Comments
[execution summary: what was done, what was verified, what remains]
```

## Safety Rules

Allowed automatically: read, grep, glob, list, git status/diff/log, tests, lint, safe diagnostic scripts.

Requires approval: install/uninstall, docker run/compose, system changes, sudo, apt, winget, npm install, uv add, git commit, git push, network/service changes.

Forbidden: rm -rf, diskpart, format, fdisk, parted, mkfs, bcdedit, bootrec, reg delete, Remove-Partition, Clear-Disk, `docker system prune -a --volumes`, `git push --force`, `git reset --hard`, BIOS flashing, partition resizing, EFI modifications.

Never use `--auto`/unattended flags as the default. Only in disposable sandbox projects when you know exactly what you are doing.

## Available Agents

- `architect` — read-only planning and design
- `builder` — implementation with safety controls
- `reviewer` — read-only code review
- `researcher` — read-only research and documentation
- `ai-engineer` — PyTorch/CUDA/LLM/RAG/PEFT/QLoRA/CV specialist
- `mlops` — Docker/FastAPI/CI/deployment/MLflow specialist
- `hardware` — Dell/NVIDIA/WSL/CUDA/thermal/storage specialist
- `security` — security analysis and secret detection
- `teacher` — explains concepts and engineering decisions
- `documenter` — batch `docs/learning/` walkthroughs for `/document-project` sweeps (read-only for source)
- `data-engineer` — data pipeline specialist (ingestion, cleaning, validation, deduplication)
- `arabic-data-engineer` — Arabic/Islamic text data pipeline (normalization, tokenization, Quran/Hadith-aware chunking)
- `experiment-tracker` — experiment lifecycle specialist (design, track, compare, report)
- `model-evaluator` — model evaluation specialist (metrics, error analysis, benchmarks)
- `prompt-engineer` — prompt engineering specialist (design, test, optimize)
- `deployment-specialist` — production deployment specialist (containers, health checks, rollback)
- `flutter-developer` — Flutter/Dart/Bloc mobile specialist
- `backend-developer` — Django/FastAPI/database specialist
- `fullstack-developer` — React/Next.js/full-stack specialist
- `automation-engineer` — LangChain/multi-agent/workflow automation specialist
- `orchestrator` — multi-agent task decomposition and coordination (uses context-store for compound intelligence)

## Agent Overlap Boundaries

| Domain | Agents | Boundary |
|--------|--------|----------|
| Docker/MLOps/Deployment | `mlops` + `deployment-specialist` | mlops = infrastructure setup, deployment = execution + verification |
| RAG Pipeline | `ai-engineer` + `data-engineer` + `prompt-engineer` | data-engineer = data prep, ai-engineer = model pipeline, prompt-engineer = prompt optimization |
| Experiments/Evaluation | `experiment-tracker` + `model-evaluator` | tracker = lifecycle management, evaluator = metric execution and analysis |
| Arabic NLP | `ai-engineer` + `data-engineer` | ai-engineer = model-side, data-engineer = data pipeline |
| Mobile | `flutter-developer` + `backend-developer` | flutter = UI/state/deployment, backend = API/auth/database |
| Full Stack | `fullstack-developer` + `backend-developer` | fullstack = frontend+integration, backend = API/database |
| AI Automation | `automation-engineer` + `ai-engineer` | automation = workflow/orchestration, ai-engineer = model/training |

## Lifecycle Commands (map)

Full inventory: `docs/SYSTEM-MAP.md` in this directory.

- Day loop: `/quickstart` -> work -> `/test` -> `/wrapup`; recovery: `/checkpoint` `/resume` `/status` `/gpu`
- AI loop: `/dataset` `/experiment` `/evaluate` `/diff` `/benchmark` `/migrate`
- Ship: `/ship` `/deploy` `/serve`; quality: `/debug` `/review` `/security` `/inspect` `/cleanup` `/prompt`
- Interview: `/grill` `/handoff` `/wayfinder` `/domain-model` `/ask`
- Flutter: `/flutter-test` `/flutter-build` `/flutter-analyze`
- Backend: `/api-design` `/db-migrate` `/schema-review`
- Full Stack: `/scaffold-api` `/frontend-build`
- Automation: `/automate` `/agent-build` `/rag-pipeline`
- Orchestration: `/orchestrate`
- After editing any config file: restart opencode, then run
  `node ~/.config/opencode/scripts/validate-config.mjs`

## Learning Mode

When the user says "Teach me...":

1. Explain architecture, concepts, alternatives, tradeoffs, why this design, what can fail, how to verify.
2. Wait for approval before implementing.
3. After implementation, explain the code line by line, focusing on engineering decisions, not syntax.

## OpenCode Configuration Safety

Before changing opencode configuration: Inspect -> Backup -> Diff -> Modify -> Validate -> Report.
Never replace existing config without understanding it.
<!-- codebase-memory-mcp:start -->
# Code Intelligence Stack

## MCP Servers (5 active, 75+ tools)

| Server | Tools | Role |
|--------|-------|------|
| `codebase-memory-mcp` | 15 | Structural knowledge graph (155 langs, tree-sitter + Hybrid LSP) |
| `code-review-graph` | 34 | PR blast-radius, community detection, impact analysis |
| `graphify` | 10 | Multimodal graph (code + docs + schemas), god nodes, PR triage |
| `repomix` | 6 | One-shot context packing for ad-hoc LLM tasks |
| `context7` | — | Fresh library documentation (remote) |

## Priority Order

### Structural queries (codebase-memory-mcp)
1. `search_graph` — find functions, classes, routes, variables by pattern
2. `trace_path` — trace who calls a function or what it calls
3. `get_code_snippet` — read specific function/class source code
4. `check_index_coverage` — validate candidate paths before claims
5. `query_graph` — run Cypher queries for complex patterns
6. `get_architecture` — high-level project summary

### Multimodal queries (graphify)
7. `graphify_god_nodes` — find most-connected symbols (architectural hotspots)
8. `graphify_shortest_path` — path between any two symbols
9. `graphify_query_graph` — query across code + docs
10. `graphify_get_community` — detect functional modules

### Context packing (repomix)
11. `repomix_pack_codebase` — pack repo into AI-friendly file
12. `repomix_grep_repomix_output` — search the packed output

### Review (code-review-graph)
13. `detect_changes` — blast radius of uncommitted changes
14. `get_impact_radius` — transitive impact analysis
15. `get_hub_nodes` — architectural chokepoints

## Evidence tiers
- **Scout (Tier 1):** quick positive lookup with few calls and targeted source checks. Mark it provisional; do not make negative or exhaustive claims.
- **Verify (Tier 2, default):** task-directed graph evidence, relevant trace directions, exact snippets for material claims, and relevant pagination.
- **Auditor (Tier 3):** bounded-scope full verification with current generation, complete relevant pagination, both call directions and broader relationships when material, and every limitation disclosed.
- After candidate paths are known in any tier, call `check_index_coverage` once with every evidence path. Add relevant scopes for negative or exhaustive claims. A clean result means no recorded gap, not proof of completeness.

## When to fall back to grep/glob
- Searching for string literals, error messages, config values
- Searching non-code files (Dockerfiles, shell scripts, configs)
- When MCP tools return insufficient results

## Examples
- Find a handler: `search_graph(name_pattern=".*OrderHandler.*")`
- Who calls it: `trace_path(function_name="OrderHandler", direction="inbound")`
- Read source: `get_code_snippet(qualified_name="pkg/orders.OrderHandler")`
- God nodes: `graphify_god_nodes()`
- Pack for LLM: `repomix_pack_codebase(path="src/")`
- PR blast-radius: `detect_changes(scope="impact")`

## Session resets and subagents
- At session start or after compaction, confirm the nearest graph project and generation with `list_projects` or `index_status`, then choose Scout, Verify, or Auditor.
- Before spawning a subagent, query the graph and coverage in the parent. Pass the tier, project, generation/freshness, bounded scope, queries and pagination state, qualified symbols, paths, call-chain findings, coverage evidence with ranges/reasons, source fallback already performed, and unresolved questions in the delegated task context.
- Do not assume subagents inherit MCP access or the parent conversation. If a child lacks MCP tools, it must not call or claim MCP access. It should use the supplied evidence and read/grep exact source, especially every reported missed-coverage range.
<!-- codebase-memory-mcp:end -->