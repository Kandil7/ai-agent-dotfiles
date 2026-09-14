---
description: Evaluate a model: run eval scripts, compute metrics, compare against baseline, generate evaluation reports. Tests the model, not the code.
agent: ai-engineer
---

Evaluate: $ARGUMENTS

Follow the evaluation and llm-inference skills.

## Mode

- No arguments: evaluate the current model on the default eval dataset.
- `compare`: evaluate and compare two model checkpoints or versions.
- `benchmark`: run standardized benchmarks (latency, throughput, memory).

## Pre-flight

1. Identify the model: checkpoint path, adapter path, or model name.
2. Identify the eval dataset: default split or specified path.
3. Check VRAM: `nvidia-smi` — ensure enough free memory for inference.
4. Verify the eval script exists (do not invent one).

## Execute

1. Run the eval script with the specified (or default) configuration.
2. Monitor GPU during eval: temperature, VRAM, utilization.
3. Capture all metrics the script produces.
4. If the eval script does not exist, report what is missing and propose one.

## Report

- **Metrics table**: all metrics with values, compared to baseline if available.
- **Per-class breakdown** (if applicable): precision, recall, F1 per class.
- **Failure analysis**: samples the model got wrong, with suspected reasons.
- **Performance**: inference latency, throughput, VRAM used.
- **Recommendation**: FACT/INFERENCE/RECOMMENDATION — is this model ready to ship?

## Rules

- Do not modify model weights or eval scripts without approval.
- If the model does not fit in VRAM, report the constraint and suggest quantization or CPU offload.
- Record results in `docs/experiments/` for comparison with training runs.
- Never use training split for evaluation.
