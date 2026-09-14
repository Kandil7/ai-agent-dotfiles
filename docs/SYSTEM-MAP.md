# SYSTEM-MAP — AI Engineering Command Center inventory

Single source of truth for what exists in this setup. Update this file when
agents/skills/commands/plugins/scripts are added or removed. Companion to
`AGENTS.md` (rules) and `specs/ops-core.md` (contract).

Last updated: 2026-09-14

---

## Entry points

| File | Role |
|---|---|
| `opencode.jsonc` | Runtime config: permissions, MCP, providers, small_model. Loaded ONCE at startup. |
| `AGENTS.md` | Global operating rules injected every session |
| `specs/ops-core.md` | Knowledge system + handoff + acceptance contract, injected via `instructions` |

## Agents (21) — `agent/*.md`

| Agent | Lane | Notes |
|---|---|---|
| architect | read-only design | plans, never implements; context-store allowed |
| builder | implementation | webfetch/websearch allowed; approval-gated ops; context-store allowed |
| reviewer | read-only review | project-log + context-store allowed |
| researcher | read-only research | primary sources first; context-store allowed |
| ai-engineer | PyTorch/CUDA/LLM/RAG/QLoRA/CV | memory-log + context-store allowed |
| mlops | Docker/CI/MLflow/serving | memory-log + context-store allowed |
| hardware | Dell/NVIDIA/WSL diagnostics | measured numbers only; memory-log + context-store allowed |
| security | read-only security | secrets/CVE/AI-threat focus; context-store allowed |
| teacher | explanation mode | project-log + memory-log + context-store allowed |
| documenter | docs/learning sweeps | writes only via project-log |
| data-engineer | pipelines/validation/dedup | datasets in D:\AI\Datasets\; context-store allowed |
| arabic-data-engineer | Arabic/Islamic text pipeline | normalization, tokenization, Quran-aware chunking; context-store allowed |
| experiment-tracker | experiment lifecycle | MLflow + D:\AI\Experiments\; context-store allowed |
| model-evaluator | metrics/error analysis | held-out data only; context-store allowed |
| prompt-engineer | prompt design/testing | local Ollama harness; context-store allowed |
| deployment-specialist | containers/health/rollback | smoke tests mandatory; context-store allowed |
| flutter-developer | Flutter/Dart/Bloc mobile | platform integration, offline, performance; context-store allowed |
| backend-developer | Django/FastAPI/database | API design, auth, caching, background tasks; context-store allowed |
| fullstack-developer | React/Next.js/full-stack | TypeScript, frontend testing, deployment; context-store allowed |
| automation-engineer | LangChain/multi-agent/workflow | n8n, RAG-as-a-service, agent patterns; context-store allowed |
| orchestrator | multi-agent coordination | context-store for compound intelligence |

## Commands (47) — `command/*.md`

| Group | Commands |
|---|---|
| Day loop | `/quickstart` `/status` `/gpu` `/wrapup` `/resume` |
| Recovery | `/checkpoint` |
| AI loop | `/dataset` `/experiment` `/evaluate` `/diff` `/benchmark` `/migrate` |
| Build & ship | `/plan` `/implement` `/test` `/inspect` `/review` `/security` `/ship` `/deploy` `/serve` `/new-project` |
| Ops & cleanup | `/debug` `/cleanup` `/research` `/prompt` |
| Knowledge | `/session-log` `/project-digest` `/document-project` `/mentor-lite` `/teach` |
| Interview & routing | `/grill` `/handoff` `/wayfinder` `/domain-model` `/ask` |
| Flutter | `/flutter-test` `/flutter-build` `/flutter-analyze` |
| Backend | `/api-design` `/db-migrate` `/schema-review` |
| Full Stack | `/scaffold-api` `/frontend-build` |
| Automation | `/automate` `/agent-build` `/rag-pipeline` |

## Skills (57) — `skill/<name>/SKILL.md`

### AI/ML (15)
ai-engineering, arabic-nlp, computer-vision, cuda-pytorch, data-pipeline,
evaluation, experiment-tracking, huggingface, llm-inference, model-compression,
prompt-engineering, qlora, rag, vector-db

### Agent Quality (1)
agent-evaluation

### DevOps/Infra (4)
deployment, docker-gpu, github, mlops

### Flutter (8)
dart, flutter, flutter-bloc, flutter-deployment, flutter-offline, flutter-performance,
flutter-testing, flutter-ui

### Backend (7)
api-design, authentication, background-tasks, caching, database-design,
django, fastapi-advanced

### Full Stack (6)
css-styling, frontend-deployment, frontend-testing, nextjs, react, typescript

### AI Automation (6)
agent-patterns, api-integration, langchain, multi-agent, rag-as-service,
workflow-automation

### Shared (11)
code-review, debugging, domain-modeling, handoff, hardware, interview,
python-uv, research, security, testing, wayfinder

## Plugins (7) — `plugin/*.ts` + `plugins/*.ts` (auto-loaded)

| Plugin | Hook | Effect |
|---|---|---|
| storage-guard | tool.execute.before | neutralizes blind git staging; blocks D:\AI / weight files / secrets from git write commands |
| checkpoint-on-compact | compaction event | writes pre-compaction snapshot to PROJECT-CHECKPOINT.auto.md |
| action-logger | tool.execute.after, chat.message | appends daily operational log to `memory/sessions/YYYY-MM-DD.log` |
| retrospective | session.created, tool.execute.after, chat.message, compaction | tracks session metrics, writes to context-store on compaction |
| subagent-guard | tool.execute.before (task) | enforces time/turn limits on subagents |
| env-snapshot | session.created | writes project environment snapshot to .opencode/ENV-SNAPSHOT.md |
| cbm-augment | tool.execute.after | augments grep/glob with codebase-memory-mcp graph data |
| crg-plugin | tool.execute.after, session.created | auto-updates code-review-graph after file edits |

## Custom tools (3) — `tool/*.ts`

- `project-log` — path-locked writes to `<repo>/docs/learning/`
- `memory-log` — path-locked writes to `~/.config/opencode/memory/`
- `context-store` — persistent ID-addressed knowledge store under `.opencode/context-store/`

## Scripts (5) — `scripts/`

| Script | Purpose |
|---|---|
| validate-config.mjs | JSONC parse + deny rules + frontmatter integrity; run after any config change |
| gpu-watch.ps1 | CSV trace of nvidia-smi during runs -> C:\AI-Workstation\reports\ |
| check-docs-drift.js | repo walkthrough staleness gate (exit 1 = stale) |
| check-overdue.ps1 | mentor/checkpoint overdue nudges (Task Scheduler ready) |
| diary-add.ps1 | 3-line diary entry without opencode |

## MCP servers

- `context7` — enabled (remote docs lookup)
- `github` — disabled until `gh auth login` + gh MCP extension

## Providers / models

- Ollama @ http://localhost:11434
- `small_model`: ollama/qwen3.5:9b-32k (verified installed, replaces qwen2.5-coder:7b)

## Config extras (2026-08-23)

- `watcher.ignore`: pycache/git/node_modules/.venv/data/wandb/dist/build + weight files (*.bin/*.pt/*.ckpt/*.safetensors/*.gguf)
- `permission.edit`: object form — `*` allow, `**/.env*` ask (secrets checkpoint)
- `formatter`: ruff 0.16.4 (verified installed) for `.py`; pyright LSP intentionally unset until installed

## Config extras (2026-08-24)

- ollama provider: `@ai-sdk/openai-compatible` adapter + `/v1` baseURL + explicit models list (required per docs)
- ollama `tool_call: false` — qwen2.5-coder:7b outputs tool calls as plain text through Ollama, breaking agent loop
- Ollama GPU inference: BROKEN (0xc0000005 crash on all backends, Ollama 0.32.15 + RTX 5000 + driver 580.92); CPU-only ~9.5 tok/s
- Driver updated: 580.92 / CUDA 13.0 (was 576.88 / 12.9)

## Memory layout

```
memory/
  user-preferences.md
  hardware/   lessons/   patterns/
  sessions/   # action-logger operational logs (disposable, ~30d retention)
```

## Maintenance rules

1. Config edits require an opencode RESTART to take effect.
2. After config edits: `node ~/.config/opencode/scripts/validate-config.mjs`.
3. Before editing opencode.jsonc: copy to `opencode.jsonc.bak-<YYYY-MM-DD>`.
4. New agents/skills/commands get a row here in the same session they are added.
