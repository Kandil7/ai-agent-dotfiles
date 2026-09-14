---
name: experiment-tracking
description: Experiment tracking and management. MLflow, experiment design, run comparison, hyperparameter sweeps, metric logging. Use when the user says "experiment", "track", "MLflow", "compare runs", "ablation", "hyperparameter", "training run", or "log metrics".
---

# Experiment Tracking

## Every experiment must log

- **Params:** model, lr, batch_size, seq_length, quantization, r/alpha (LoRA)
- **Metrics:** loss (train/val), accuracy, F1, latency, tokens/sec, VRAM peak
- **Artifacts:** checkpoints, figures, config files
- **Environment:** PyTorch version, CUDA version, driver, GPU model

## MLflow setup

- Local file backend: D:\AI\Experiments\ (keep out of Git)
- Run naming: `<model>-<dataset>-<variant>`
- Tags: purpose, hypothesis, status (running/complete/failed)

## Experiment design

- One hypothesis per experiment
- Baseline first, then variants
- Record why each variant was tried
- Control variables: change one thing at a time

## Comparison

- Side-by-side metrics table
- Statistical significance when applicable
- Cost comparison (training time, VRAM, inference speed)
- Delta from baseline

## Rules

- Never overwrite previous run results
- If MLflow is configured, log there too (project must have mlflow configured)
