# Windows uv/npm tool-install gotchas + Ox Alpha free-window access map

### Context

Workstation setup session (Aug 23 2026): installing multiple coding agents to use the Ox Alpha stealth model free window (ends ~Aug 27 2026). Relevant to any future agent/tooling installs on this Dell Precision 7740 machine and to Python package installs generally.

### Explanation

1) uv tool installs must pin --python 3.11 for packages with native wheels (pywinpty has no cp314 wheel; default 3.14 triggers a Rust source build that fails without MSVC Build Tools/link.exe). 2) Large npm packages (@deepseek-ai/dsh ~452 pkgs) hang silently under `npx -y` — install globally instead for visible progress. 3) npm global config blocks install scripts by default (allow-scripts): sharp/onnxruntime/node-pty/koffi were skipped; features using them degrade gracefully but may need explicit allowlisting later. 4) Hermes Agent v0.19.0 (PyPI cap) requires OPENCODE_ZEN_API_KEY for opencode-zen; the keyless 'OpenCode Free' provider only exists in newer upstream builds — use openrouter route meanwhile. 5) Ox Alpha free routes: opencode/x-preview-f-free (Zen, ZDR), opencode-go/ox-alpha-free, openrouter stealth/ox-alpha ($0).

### Rationale (Why this?)

These are environment-specific gotchas that will recur on every new uv/npm-based tool install here; conditions to revisit: pywinpty ships cp314 wheels, MSVC Build Tools get installed, or hermes publishes >0.19 on PyPI.

### Next Steps

Rotate the exposed OpenRouter key after the free window ends (~Aug 27). If Zen account is created later, wire OPENCODE_ZEN_API_KEY into Hermes for the zero-retention route. Re-check `uv tool upgrade hermes-agent` when upstream publishes newer PyPI builds.

---
