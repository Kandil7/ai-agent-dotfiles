---
name: langchain
description: "LangChain and LangGraph patterns. Use when the user says 'langchain', 'langgraph', 'agent', 'chain', 'tool use', 'retriever', 'LCEL', or builds AI agent systems."
---

# LangChain & LangGraph

## LangChain Expression Language (LCEL)

```python
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

chain = (
    ChatPromptTemplate.from_messages(
        [("system", "You are a helpful assistant"), ("user", "{question}")]
    )
    | ChatOpenAI(model="gpt-4")
    | StrOutputParser()
)
result = chain.invoke({"question": "What is LangChain?"})
```

- Pipe operator `|` chains components
- Each component implements `invoke()` with dict in, dict out
- Composable: easily add, remove, reorder steps

## Agents

```python
from langchain.agents import create_tool_calling_agent
from langchain.tools import tool


@tool
def search_db(query: str) -> str:
    """Search the database for matching records."""
    return db.search(query)


agent = create_tool_calling_agent(llm, [search_db], prompt)
result = agent.invoke({"input": "Find all active users"})
```

## Memory

| Type | Use case |
|------|----------|
| `ConversationBufferMemory` | Short conversations (full history) |
| `ConversationSummaryMemory` | Long conversations (summary) |
| `ConversationBufferWindowMemory` | Sliding window (last N messages) |
| `VectorStoreRetrieverMemory` | Search past conversations |

## LangGraph (state machines)

```python
from langgraph.graph import StateGraph, MessagesState


def chatbot(state: MessagesState):
    return {"messages": [llm.invoke(state["messages"])]}


graph = StateGraph(MessagesState)
graph.add_node("chatbot", chatbot)
graph.set_entry_point("chatbot")
graph.set_finish_point("chatbot")
app = graph.compile()
```

- Nodes: functions that modify state
- Edges: transitions between nodes (conditional or fixed)
- State: shared data structure (TypedDict)
- Persistence: checkpoint state for human-in-the-loop

## Retrieval

```python
from langchain_community.vectorstores import FAISS
from langchain_openai import OpenAIEmbeddings

vectorstore = FAISS.from_documents(docs, OpenAIEmbeddings())
retriever = vectorstore.as_retriever(search_kwargs={"k": 5})
chain = retriever | llm  # retrieve + generate
```

## Pitfalls

- Not handling tool errors (tools can fail, always catch)
- Infinite agent loops (set max_iterations)
- Not caching LLM calls (cost and latency)
- Over-complicated chains (simpler is better)
