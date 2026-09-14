---
name: agent-evaluation
description: "Agent output evaluation and LLM-as-judge patterns. Use when the user says 'evaluate agent', 'LLM-as-judge', 'agent quality', 'agent output', 'evaluate output', 'judge', 'rubric', 'scoring', or 'agent eval'."
---

# Agent Output Evaluation

## When to use

- Evaluating code agent output quality (correctness, completeness, adherence to spec)
- Comparing multiple agent approaches to the same task
- Building eval sets for recurring agent tasks
- Calibrating human-vs-agent quality thresholds

## LLM-as-Judge pattern

### 1. Define the rubric

For each evaluation criterion, define:
- **Dimension name** (e.g., "Correctness", "Completeness", "Adherence to spec")
- **Score scale** (1-5 or 1-3, keep it small)
- **Score descriptions** for each level
- **Weight** (importance relative to other dimensions)

Example rubric for code agent output:

| Dimension | 1 (Fail) | 3 (Acceptable) | 5 (Excellent) | Weight |
|-----------|----------|-----------------|---------------|--------|
| Correctness | Code doesn't run or has logic errors | Runs but edge cases fail | All cases pass, handles edge cases | 0.35 |
| Completeness | Missing required features | Core features done, some gaps | All features implemented | 0.25 |
| Spec adherence | Ignores the spec | Partially matches spec | Fully matches spec | 0.25 |
| Code quality | Unreadable, duplicated | Readable, minor issues | Clean, well-structured | 0.15 |

### 2. Prepare the evaluation input

Structure the input for the judge:

```
## Task
[Original task description]

## Spec (if any)
[The spec the agent was given]

## Agent Output
[The code/response the agent produced]

## Evaluation Rubric
[Rubric table from step 1]

## Instructions
Score each dimension. For each score, cite specific evidence from the output.
Explain your reasoning. Be strict but fair.
```

### 3. Run the judge

Use a strong model (cloud > local for judging). Run with temperature 0 for consistency.

**Single judge**: Faster, cheaper. Good for routine evaluation.
**Majority vote (3+ judges)**: More reliable. Use for high-stakes decisions or calibration.

### 4. Analyze results

- Score per dimension + weighted total
- Inter-judge agreement (if majority vote): Cohen's kappa or simple agreement %
- Failure mode analysis: which dimensions score lowest?
- Edge case handling: did the judge catch issues the tester missed?

## Building eval sets

For recurring agent tasks, build a reusable eval set:

```markdown
# eval-set-<task-name>.md

## Case 1: <descriptive name>
- Input: [task description + constraints]
- Expected behavior: [what good output looks like]
- Known pitfalls: [common failure modes]
- Difficulty: easy/medium/hard

## Case 2: ...
```

Rules:
- 5-10 cases per task type is a good start
- Include at least one edge case and one failure case
- Update the eval set as you discover new failure modes
- Store eval sets in `docs/evaluation/` or `experiments/`

## Calibration

### Human-agent agreement

1. Have a human score 10-20 agent outputs
2. Run the LLM judge on the same outputs
3. Compute agreement (percentage or kappa)
4. If agreement < 70%: adjust rubric wording, add examples, or switch judge model
5. Re-calibrate periodically as models improve

### When to use LLM-as-judge vs human vs automated

| Scenario | Best approach |
|----------|--------------|
| Code runs/doesn't run | Automated (tests) |
| Code is correct but ugly | LLM-as-judge |
| Code meets spec | LLM-as-judge + spec comparison |
| User experience quality | Human review |
| Security vulnerability | Automated (security tools) + human |
| Architecture decisions | Human review |

## Practical patterns

### A/B comparison

Compare two agent approaches to the same task:

```
## Task
[Same task for both]

## Approach A
[Output from approach A]

## Approach B
[Output from approach B]

## Rubric
[Same rubric for both]

## Instructions
Score both. Then declare a winner per dimension and overall.
Explain what each approach did better.
```

### Iterative improvement

Track agent quality over time:

```markdown
# agent-eval-log.md

| Date | Task | Agent | Score | Notes |
|------|------|-------|-------|-------|
| 2026-09-14 | auth module | builder | 4.2/5 | Good, missed edge case in token refresh |
| 2026-09-15 | auth module | builder | 4.6/5 | Fixed edge case after feedback |
```

### Regression detection

Before deploying agent changes, run the eval set. If scores drop, investigate:

```
eval-set -> run agent -> judge outputs -> compare with baseline scores
```

## Rules

- Never use the same model as both agent and judge (circular evaluation)
- Document the rubric, judge model, and temperature for every evaluation
- Save evaluation artifacts for future comparison
- When in doubt, add a human review layer on top of LLM-as-judge
- The judge should never modify the output — only score and explain
