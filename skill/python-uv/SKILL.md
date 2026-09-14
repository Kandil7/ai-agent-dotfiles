---
name: python-uv
description: Python environment management with uv. uv add/sync/run, lockfiles, pyproject.toml, uvx tools. Use when the user says "uv", "uv add", "uv sync", "pyproject", "lockfile", "venv", or has Python dependency issues.
---

# uv on this workstation

## Core commands

- New project: `uv init` then `uv add <pkg>`
- Add/remove deps: `uv add <pkg>` / `uv remove <pkg>` (updates pyproject + lock)
- Reproduce env exactly: `uv sync` (installs from `uv.lock`)
- Run anything in the project env: `uv run <cmd>` (e.g. `uv run pytest -q`) — no manual venv activation needed
- One-off CLI tools without installing: `uvx <tool>` (e.g. `uvx ruff check .`)

## Conventions

- `uv.lock` is committed — it IS the reproducibility guarantee.
- `.python-version` pins the interpreter per project.
- Never `pip install` into a global/system Python. Project deps go through `uv add`.
- Installing a dependency requires a stated reason (global rule) — note it in the PR/session log.

## Windows host vs WSL2

- Two separate ecosystems: wheels installed on Windows do not serve WSL projects and vice versa.
- Active Linux source lives in WSL (`~/projects/`) — install/run its deps INSIDE WSL with its own uv env.
- GPU stacks: match the PyTorch index (`+cu128`) documented in AGENTS.md; verify with `uv run python -c "import torch; print(torch.__version__, torch.cuda.is_available())"`.

## Troubleshooting

- Broken env: prefer `uv sync` (reconcile from lock) over deleting `.venv`.
- Dependency conflict: read the resolver error; adjust constraints in pyproject — never force-install with pip into `.venv` behind uv's back.
- After ANY dependency change: re-run the test command as smoke verification.
