---
name: multi-agent
description: "Multi-agent orchestration. Use when the user says 'multi-agent', 'AutoGen', 'CrewAI', 'Swarm', 'supervisor', 'agent team', 'orchestration', or 'collaborative agents'."
---

# Multi-Agent Systems

## Patterns

| Pattern | Description | Best for |
|---------|-------------|----------|
| **Sequential** | Agent A -> Agent B -> Agent C | Pipeline workflows |
| **Supervisor** | Manager delegates to specialists | Complex tasks with clear roles |
| **Hierarchical** | Manager -> team leads -> workers | Large-scale, many agents |
| **Peer-to-peer** | Agents communicate directly | Collaborative problem-solving |
| **Debate** | Agents argue, judge decides | Ambiguous tasks needing multiple perspectives |

## AutoGen pattern

```python
from autogen import AssistantAgent, UserProxyAgent

assistant = AssistantAgent(
    name="assistant",
    llm_config={"model": "gpt-4"},
    system_message="You are a helpful assistant.",
)
user_proxy = UserProxyAgent(
    name="user_proxy",
    human_input_mode="NEVER",
    code_execution_config={"work_dir": "workspace"},
)
user_proxy.initiate_chat(assistant, message="Research and summarize AI trends.")
```

## CrewAI pattern

```python
from crewai import Agent, Task, Crew

researcher = Agent(role="Researcher", goal="Find AI trends", backstory="Expert analyst")
writer = Agent(role="Writer", goal="Write report", backstory="Experienced writer")

research_task = Task(description="Research AI trends in 2026", agent=researcher)
write_task = Task(description="Write a report on findings", agent=writer)

crew = Crew(agents=[researcher, writer], tasks=[research_task, write_task])
result = crew.kickoff()
```

## Swarm (OpenAI)

```python
from swarm import Agent, Swarm


def transfer_to_billing():
    return billing_agent


agent = Agent(
    name="support",
    instructions="You are a support agent. Transfer to billing for payment issues.",
    functions=[transfer_to_billing],
)
```

## Design principles

1. **Single responsibility**: each agent does one thing well
2. **Clear handoffs**: agents must know when to pass control
3. **Shared state**: use a common state object or message bus
4. **Observability**: log every agent decision and action
5. **Guardrails**: each agent must have safety boundaries

## Pitfalls

- Agents calling each other infinitely (set max turns)
- Not defining clear handoff criteria (agents get stuck)
- Too many agents (start with 2-3, add only when needed)
- No observability (impossible to debug)
- Shared mutable state (causes race conditions)
