# Windows profile merge: WSL + per-user apps playbook

### Context

Migrated everything from secondary Windows profile Kandil7 into primary profile Kandil on this machine (2026-08-18): WSL Ubuntu-24.04 (23 GB vhdx), VS Code, Ollama, opencode desktop, Perplexity, caches, Docker settings. Both profiles are the same person; machine-wide installs (Docker Desktop, Firefox, AIMP, WinRAR, Python, Git) are shared.

### Explanation

Verified playbook for moving a full Windows user profile's AppData to another profile on the SAME machine: 1) WSL: wsl --shutdown, robocopy the Local/wsl/{guid}/ext4.vhdx with /SPARSE (30 s, vs export/import tar which takes 30+ min), then register under the target user with wsl --import-in-place Name <vhdx-path> (WSL 2.0+). 2) Per-user apps in Local/Programs: robocopy the folder, copy APPDATA config, add bin dirs to the target user PATH, no reinstall needed. 3) Chromium/Electron app data (Perplexity, VS Code): app must be closed before copying or robocopy fails with ERROR 1224/32 on locked files. 4) Start Menu shortcuts stored with %LOCALAPPDATA%-relative targets resolve per-current-user, so they keep working; delete shortcuts pointing to dirs that were excluded from the copy. 5) NEVER copy: Roaming/Microsoft/Crypto + Protect + Vault + SystemCertificates (DPAPI is SID-bound), Local/Packages (UWP), Local/Microsoft/Office|OneDrive|Edge (account-synced), Local/Temp (clean instead). The logged-out profile's HKCU registry is unreadable without loading its NTUSER.DAT, so uninstall registrations cannot be ported; use winget reinstall if Settings/Apps entries matter.

### Alternatives

wsl --export + --import as tar.gz: slower (30+ min for 23 GB) but distro-agnostic; folder-copy + import-in-place is same-machine-only. Loading the other profile's NTUSER.DAT with reg.exe requires admin and the profile must not be in use. Full profile-migration tools (USMT, Transwiz) are overkill when only AppData differs.

### Rationale (Why this?)

Verified empirically on this machine: wsl --import-in-place registered and booted instantly; all copied apps launched (VS Code 1.133, Ollama server 0.32.14, Docker Desktop 4.86 with working engine; code/ollama CLIs work after PATH add). Revisit if a per-user app keeps meaningful state in HKCU (e.g. file associations, autostart entries).

### Exercises

1) Boot check after WSL migration: wsl -d Name -- bash -c "grep -rl 'OldUser' ~ --include='*' -I | grep -v node_modules" to catch stale path references. 2) Verify every Start Menu .lnk target exists after copy via WScript.Shell shortcut resolution. 3) Check robocopy exit code 11 output for locked files, kill the app, re-run. 4) When Docker Desktop GUI shows an error dialog and quits, read Local/Docker/log/host/com.docker.backend.exe.log to get the real error. 5) Ensure com.docker.service is Running before judging Docker Desktop broken (start it elevated once per user).

### Next Steps

Related gotcha: Docker Desktop crashes at startup with a corrupt daemon.json (NUL bytes) in the HOME/.docker folder — error in backend log ends with 'invalid character 0x00 looking for beginning of value', exit status 151; fix is replacing the file with {}. Next on this machine: Kandil7 profile deletion (needs logout of Kandil7 first, then admin delete), optional winget re-registration of VS Code/Ollama under Kandil.

---
