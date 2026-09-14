---
name: prompt-engineering
description: Prompt engineering for LLMs. System prompt design, few-shot examples, chain-of-thought, prompt testing, local model optimization. Use when the user says "prompt", "system prompt", "few-shot", "chain of thought", "optimize prompt", "prompt design", or "prompt template".
---

# Prompt Engineering

## Design patterns

- **Zero-shot:** task description + input
- **Few-shot:** examples before the task
- **Chain-of-thought:** "think step by step"
- **Self-consistency:** multiple reasoning paths
- **ReAct:** reasoning + acting in loops

## System prompt structure

1. Role definition
2. Task description
3. Output format
4. Constraints
5. Examples (if needed)

## Testing methodology

- Test on local models (Ollama) before deploying
- Measure: accuracy, consistency, latency
- Edge cases: empty inputs, adversarial inputs, very long inputs
- Prompt variants: A/B test when possible

## Local model optimization

- Shorter prompts for smaller models
- Explicit format instructions
- Avoid complex reasoning chains on small models
- Temperature tuning per task (0.1-0.3 for code, 0.6-0.9 for creative)

## Rules

- Test prompts on actual models before deploying
- Record prompt + model + results
- Version prompts alongside code
- Prompt quality is empirical, not theoretical
