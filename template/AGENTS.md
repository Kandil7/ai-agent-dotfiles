# <PROJECT NAME> — Project Rules

This project-level AGENTS.md overrides/extends the global rules in
`~/.config/opencode/AGENTS.md`. Keep global engineering philosophy; specialize here.

## Workstation context (do not re-derive)

- Dell Precision 7740, RTX 5000 16 GB (sm_75), 32 GB RAM, WSL2 Ubuntu 24.04
- NVIDIA driver 576.88, CUDA 12.9 runtime visibility, PyTorch 2.11.0+cu128
- Python via uv; Docker Desktop with WSL2 GPU backend

## Project facts

- Purpose: <one paragraph>
- Stack: <languages, frameworks, key libraries with versions>
- Entry points: <commands to run, train, serve, test>
- Tests: <exact command, e.g. `uv run pytest -q`>
- Data / assets: <where datasets, models, checkpoints live — D:\AI\..., never in Git>

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `HF_TOKEN` | HuggingFace token (push/pull) | <Yes/No> |
| `WANDB_API_KEY` | Experiment tracking | <Optional> |
| `<...>` | <...> | <...> |

Secrets live in `.env` (gitignored); `.env.example` documents them — never real values.

## Gotchas

- <known issues or tricky parts of this codebase>
- <things that are easy to get wrong>
- <module coupling agents must not break>

## Cloud Execution Notes

- Training runs on <Google Colab T4 / Vast.ai ...> — see `qlora` cloud variant.
- Notebooks in `notebooks/` must run top-to-bottom; pinned installs in the first cell.
- Checkpoints pushed to HF Hub: `<username>/<model-name>`; local copies to `D:\AI\Checkpoints\`.

## Current Focus

- <what is being worked on right now>
- <known TODOs and priorities>

## Storage policy for this project

- Models/datasets/checkpoints/experiments: `D:\AI\...` — NEVER in Git.
- Add to `.gitignore`: `D:/AI/`, `checkpoints/`, `*.pt`, `*.safetensors`, `.env`, `experiments/`.

## Engineering rules (this project)

- <project-specific rules, e.g. "all training scripts must log to MLflow",
  "CUDA kernels must support sm_75", "no new dependency without a note in docs/DECISIONS.md">

## Documentation

Keep `docs/` updated: ARCHITECTURE.md, DECISIONS.md (ADR style), CURRENT-STATE.md,
PROJECT-CHECKPOINT.md (regenerate with `/checkpoint`), ROADMAP.md.

Knowledge artifacts live under `docs/learning/` (00-INDEX.md, walkthroughs/,
sessions/, decisions/), written via the path-locked `project-log` tool.
Bootstrap with `/document-project`; capture sessions with `/session-log`.

Experiments and prompt studies live in `docs/experiments/` (one MD per run,
see its README template); large artifacts stay in `D:\AI\Experiments\` and are
referenced by path. Track runs with `/experiment`, evaluate with `/evaluate`.

## Safety

Global safety rules apply: READ -> PLAN -> APPROVE -> EXECUTE -> TEST -> REVIEW -> REPORT.
Destructive operations need approval. Forbidden operations are never performed.