# opencode anywhere: machine PATH on Windows + WSL bashrc interactive-guard gotcha

### Context

2026-08-18: made opencode 1.18.18 available everywhere on the Dell Precision 7740. Added C:\Users\Kandil\AppData\Roaming\npm to the machine PATH (covers all Windows users and elevated shells) and installed the native binary in WSL Ubuntu 24.04 (user mohamed) via the official curl install script to ~/.opencode/bin.

### Explanation

1) Windows: a user-scope npm global install is only visible to that user and to non-elevated shells; elevated Administrator contexts and other profiles miss it - put the npm global bin in the MACHINE PATH on a single-user box. 2) The opencode Linux installer appends export PATH=~/.opencode/bin:$PATH to ~/.bashrc, but Ubuntu's stock .bashrc has an interactive-only guard near the top, so non-interactive shells (bash -c, scripts, bash -lc via wsl -e) never see the line; interactive terminals are unaffected. Verify with: wsl -e bash -ic "opencode --version".

### Alternatives

1) Symlink /usr/local/bin/opencode -> ~/.opencode/bin/opencode for non-interactive shells. 2) Move the export above the interactive guard in .bashrc. 3) npm install in WSL - rejected, node absent; official script is self-contained.

### Rationale (Why this?)

Both behaviors are standard Ubuntu/Windows semantics, not bugs. Revisit if the box gains a second user profile or WSL default user changes.

### Exercises

1) Test elevated: Start-Process powershell -Verb RunAs then opencode --version. 2) Run opencode from any directory, Windows or WSL. 3) After Ubuntu updates, re-check .bashrc guard. 4) Verify machine PATH via [Environment]::GetEnvironmentVariable.

### Next Steps

If WSL usage grows, consider installing node/nvm in WSL for npm tooling.

---
