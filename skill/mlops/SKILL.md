---
name: mlops
description: MLOps practices on this workstation: MLflow tracking, FastAPI serving, experiment management, observability. Use when the user says "MLflow", "experiment tracking", "model registry", "FastAPI", "serve the model", "monitoring", "deploy", or "CI".
---

# MLOps on the AI Engineering Workstation

## Experiment tracking (MLflow)

- Start a tracking server or use local file backend under `D:\AI\Experiments\` (keep out of Git).
- Every run logs: params (model, lr, batch, seq, quant...), metrics (loss, eval, latency), artifacts (checkpoints, figures), and the exact environment (library versions).
- Name runs meaningfully: `<model>-<dataset>-<run_variant>`.

## Model serving (FastAPI)

- One endpoint per capability: `/predict` (or `/generate`), `/health`, `/metrics`.
- Load the model once at startup; never per-request.
- Sync vs streaming: streaming for LLM generation (`StreamingResponse`).
- Guardrails: input validation (pydantic), max length/tokens, timeouts, and a startup VRAM check (`nvidia-smi`) so the service fails fast instead of OOM-ing per request.

## CI/CD (GitHub Actions)

- Lint + typecheck + tests on every PR; slow GPU tests marked and run on a schedule or on merge.
- GPU runners are not available in CI — never require a GPU in the default pipeline. Keep GPU smoke tests behind a label or manual trigger.

## Observability

- Log request/response sizes, latency percentiles, throughput; for LLM serving also tokens/sec and TTFT.
- Watch VRAM + temperature on the host (`nvidia-smi --query-gpu=...`) as part of operations, not an afterthought.

## Rules

- Every deployment change needs a smoke test and a rollback note.