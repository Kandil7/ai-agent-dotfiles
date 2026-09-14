---
name: agent-patterns
description: "AI agent design patterns. Use when the user says 'ReAct', 'tool use', 'planning', 'reflection', 'self-correction', 'guardrails', 'agent reasoning', or 'agent design'."
---

# Agent Design Patterns

## ReAct (Reason + Act)

```
Thought: I need to find the user's order status
Action: search_orders(user_id="123")
Observation: Order #456 is shipped, expected delivery 2026-09-01
Thought: I have the information, I can respond now
Answer: Your order #456 is shipped and expected on September 1st.
```

- Simple, effective, widely supported
- Good for: single-turn tool use, Q&A with tools

## Planning

```python
class Planner:
    def plan(self, goal: str) -> list[Step]:
        # LLM generates a plan
        return llm.invoke(f"Break this goal into steps: {goal}")
    
    def execute(self, plan: list[Step]):
        for step in plan:
            result = self.execute_step(step)
            if not result.success:
                return self.replan(goal, plan, step, result)
        return plan
```

## Reflection

```python
class ReflectiveAgent:
    def act(self, task):
        # Generate response
        response = self.llm.invoke(task)

        # Reflect on quality
        critique = self.llm.invoke(f"Critique this response: {response}")

        # Improve if needed
        if critique.needs_improvement:
            response = self.llm.invoke(
                f"Improve this response based on feedback: {critique}"
            )

        return response
```

## Self-correction

- Agent detects its own errors
- Re-plans or retries with different approach
- Uses tool output to verify its reasoning
- Learns from mistakes within a session

## Guardrails

```python
class GuardrailedAgent:
    FORBIDDEN_ACTIONS = ["delete_database", "send_email_to_all"]
    
    def execute(self, action):
        if action.type in self.FORBIDDEN_ACTIONS:
            return ActionResult(blocked=True, reason="Action is forbidden")
        if action.estimated_cost > 100:
            return ActionResult(blocked=True, reason="Cost too high, needs approval")
        return self._execute(action)
```

## Observability

```python
# Log every step
with trace("agent-session") as t:
    t.log("input", user_message)
    t.log("reasoning", agent_thought)
    t.log("action", agent_action)
    t.log("observation", tool_output)
    t.log("output", agent_response)
    t.log("tokens", token_usage)
```

## Patterns comparison

| Pattern | Complexity | Best for |
|---------|-----------|----------|
| ReAct | Low | Simple tool use |
| Planning | Medium | Multi-step tasks |
| Reflection | Medium | Quality-critical outputs |
| Self-correction | High | Autonomous agents |
| Multi-agent | High | Complex collaborative tasks |

## Pitfalls

- No max iterations (infinite loops)
- No guardrails (agents can do harmful things)
- No observability (can't debug)
- Over-planning (simple tasks don't need plans)
- Not handling tool errors gracefully
