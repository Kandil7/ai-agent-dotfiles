---
description: Log and compare ML experiments. Run training/inference, record metrics, save to docs/experiments/ or MLflow. Compare against previous runs. Never fabricates results.
agent: ai-engineer
---

Experiment: $ARGUMENTS

Follow the experiment-tracking skill.

## Mode

- No arguments: run a new experiment (training or inference) and log results.
- `compare`: compare the last N experiments (default 3) side by side.
- `history`: list all experiments with key metrics.
- `best`: show the best experiment per metric.

## Run Experiment

1. **Pre-flight** — check VRAM tenants (`nvidia-smi`), disk space, dataset integrity.
2. **Capture config** — record: model, dataset, hyperparameters, seed, dtypes, device, quantization, library versions.
3. **Execute** — run the training/inference script. Monitor:
   - GPU: `nvidia-smi --query-gpu=temperature.gpu,power.draw,utilization.gpu,memory.used --format=csv -l 5`
   - Timing: wall clock, tokens/s (inference), steps/min (training)
   - Loss curve, evaluation metrics at each checkpoint
4. **Record results** — write to `docs/experiments/YYYY-MM-DD-experiment-<name>.md`:
   - Config (exact hyperparameters)
   - Metrics (final + per-step if available)
   - VRAM usage (peak, average)
   - Observations (anomalies, convergence behavior)
   - Artifacts: checkpoint path, log path, config file path
5. **Compare** — if previous experiments exist, show a metrics comparison table.

## Compare Mode

Read the last N experiment files, produce a comparison table:

| Metric | Exp-1 | Exp-2 | Exp-3 | Delta |
|--------|-------|-------|-------|-------|
| Loss | ... | ... | ... | ... |
| Accuracy | ... | ... | ... | ... |
| Peak VRAM | ... | ... | ... | ... |
| Time | ... | ... | ... | ... |
| Notes | ... | ... | ... | ... |

End with RECOMMENDATION: which experiment to build on and why.

## Rules

- Never fabricate metrics. If a run fails, log the failure with the error.
- Large artifacts (checkpoints, logs) stay in `D:\AI\Experiments\`; the experiment doc records paths, not content.
- If MLflow is configured, also log to MLflow (project must have mlflow configured).
- Distinguish FACT (measured) from INFERENCE (observed trend).
