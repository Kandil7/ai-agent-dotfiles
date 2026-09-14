---
description: Serve a model locally: Ollama run/pull, or containerized vLLM/FastAPI. Pre-checks VRAM budget, then health check + smoke test. Always prints how to stop it.
agent: ai-engineer
---

Serve: $ARGUMENTS

Follow the llm-inference skill.

## Mode selection

- Model already in Ollama -> start via ollama (`ollama ps` to verify).
- Model missing but Ollama-hosted -> `ollama pull <tag>` (approval-gated: network + disk).
- Custom weights / OpenAI-compatible API -> vLLM or a FastAPI wrapper (docker compose is ask-gated by permissions).

## Pre-flight (mandatory)

1. **VRAM budget** — weights (+quantization) + KV cache at target context + runtime overhead vs FREE VRAM right now (`nvidia-smi`). If tight, recommend quantization or CPU offload BEFORE starting anything.
2. **Port free?** — defaults: 11434 (Ollama), 8000 (vLLM/FastAPI).

## Start + verify

1. Start the server.
2. Health check until it responds (curl the health endpoint, or `ollama ps`).
3. Smoke test: one real prompt; record latency and tokens/s.
4. Record in your reply: model tag, port, PID/container name, and the EXACT stop command.

## Rules

- Never leave an orphaned server running — always print the stop command.
- Never start a second instance on an occupied port.
- Distinguish FACT (measured latency) from INFERENCE (expected load behavior).
