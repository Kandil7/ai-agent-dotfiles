# Escape `$` when calling WSL through the PowerShell bash tool

### Context

Installing code-review-graph inside WSL via the win32 PowerShell bash tool: every `wsl -d Ubuntu-24.04 -- sh -c '...$VAR...'` command silently failed or produced `Syntax error: "(" unexpected`

### Explanation

The bash tool runs Windows PowerShell (5.1), which expands `$NAME` variables inside the command string before wsl ever sees it — even inside single quotes if the tool wraps the invocation in double quotes. `$HOME` became `C:\Users\Kandil`, `$PATH` expanded, `$?` vanished, and double quotes inside `sh -c '...'` got stripped (broke `python3 -c '... "..." ...'`). Empty output with no error is the telltale sign.

### Alternatives

Backtick-escaping every `$` (`` `$HOME ``) works but is error-prone for long commands; double quotes are worse

### Rationale (Why this?)

Two failed install attempts with zero output cost several round-trips; the literal-path pattern worked first try every time after

### Exercises

1. Prefer absolute literal paths (/home/mohamed/...) over $HOME in wsl ... sh -c calls. 2. Prefer the Write/Edit tools via \\wsl$\... UNC paths for file content containing `$`. 3. Validate JSON via `python3 -m json.tool <file>` (no quoting needed).

### Next Steps

Reuse for any future WSL work from the Windows shell; revisit if the shell changes to pwsh 7 or bash-native execution

---
