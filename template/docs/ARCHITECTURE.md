# Architecture

_System design and component relationships. Update as the design evolves._

## Overview

<!-- One paragraph: what this system is, what it does, who uses it. -->

## Components

<!-- For each component: responsibility, key interfaces, and how it connects to the rest. -->

## Data flow

<!-- The path data takes through the system: input -> processing -> storage -> output. -->

## Technology choices

| Concern | Choice | Why |
|---|---|---|
| Language | | |
| ML framework | | |
| GPU tooling | | |
| Serving | | |
| Storage | | |
| Experiment tracking | | |

## Constraints

- RTX 5000 16 GB VRAM, 32 GB RAM, WSL2
- sm_75 (Turing): no native bf16 tensor cores; fp16/FP32 are the norm
- Large AI assets live in `D:\AI\`, never in Git

## Diagrams

<!-- ASCII or Mermaid diagrams as the system grows. -->