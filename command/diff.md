---
description: Compare two things: model versions, training runs, experiment results, configs. Produces a structured diff.
agent: ai-engineer
---

Compare: $ARGUMENTS

## Mode

- `runs <exp1> <exp2>`: compare two experiment runs (metrics, config, performance).
- `models <model1> <model2>`: compare two model versions (size, precision, metrics, speed).
- `configs <config1> <config2>`: compare two configuration files.
- `datasets <data1> <data2>`: compare two dataset versions (size, distribution, quality).

## Execution

1. Load both items being compared.
2. Identify the dimensions of comparison (metrics, structure, behavior).
3. Produce a structured comparison table.
4. Highlight meaningful differences (not just formatting).
5. RECOMMENDATION: which is better for what purpose.

## Rules

- Only compare things that are comparable (don't compare a model to a dataset).
- Report differences as FACT, not opinion.
- If items are identical, say so clearly.
- Use the same evaluation dataset for fair comparison when comparing models.
