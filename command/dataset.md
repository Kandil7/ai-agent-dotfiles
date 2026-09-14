---
description: Validate, inspect, split, and transform datasets. Reports statistics, class distribution, data quality issues. Does not modify without approval.
agent: ai-engineer
---

Dataset: $ARGUMENTS

Follow the data-pipeline skill.

## Mode

- `validate <path>`: check dataset integrity (missing files, corrupted images, invalid labels).
- `stats <path>`: compute statistics (size, class distribution, token lengths, image dimensions).
- `split <path>`: propose or execute a train/val/test split.
- `transform <path>`: apply transformations (resampling, augmentation, format conversion).
- `compare <path1> <path2>`: compare two dataset versions.

## Validate

1. Load the dataset (HuggingFace datasets, folder structure, CSV, JSONL).
2. Check: missing values, corrupted files, label consistency, format adherence.
3. Report: total samples, valid samples, invalid samples with examples.

## Stats

1. Compute: total samples, per-class count, distribution metrics (mean, std, min, max).
2. For text: token length distribution, vocabulary stats.
3. For images: resolution distribution, channel stats.
4. Flag anomalies: class imbalance (ratio > 10:1), outliers, empty samples.

## Split

1. Propose a split strategy (80/10/10 default, stratified if classification).
2. Show the proposed split counts per class.
3. Execute only after approval.

## Rules

- Never delete or overwrite original data without explicit approval.
- Large datasets: use sampling for stats if full scan is expensive.
- Report storage: dataset size on disk, VRAM needed to load.
- Record data provenance (source, version, hash).
