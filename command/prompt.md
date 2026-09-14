---
description: Design, A/B test, and optimize prompts on local Ollama models. Records prompt version + model + measured results to docs/experiments/prompts/.
agent: prompt-engineer
---

Prompt task: $ARGUMENTS

Follow the prompt-engineering skill.

## Workflow

1. **Goal** — state the task and output contract (format, constraints) in one line.
2. **Variants** — baseline + 1-2 alternatives (few-shot / chain-of-thought / tighter format instructions).
3. **Harness** — small test set (5-10 cases including edge cases); call the local model via the Ollama API (http://localhost:11434); same seed and temperature across variants.
4. **Measure per variant** — format-compliance %, accuracy on known-answer cases, consistency over k=3 repeats, average latency.
5. **Report** — results table, winner, and why (FACT from measurements, INFERENCE labeled).

## Persist

- Save prompt versions + results to `docs/experiments/prompts/YYYY-MM-DD-<slug>.md` (create the directory if missing).
- If a reusable lesson emerged, also log it via `project-log`.

## Rules

- Never claim a prompt works without running the harness on the actual target model.
- Record model tag + temperature with every result.
- Prompts are versioned artifacts — never overwrite a tested variant's record.
