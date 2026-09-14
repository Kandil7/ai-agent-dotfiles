# Precision 7740: leave Windows activation and firmware state as-is

### Context

Phase 0 audit of the Dell Precision 7740 workstation (2026-08-19). Findings: Windows 11 Pro + Office 2019 in activation "Notification" state, Secure Boot DBX 2023 cert update pending (Event 1801), 5x Kernel-Power 41 unexpected shutdowns, battery-only operation during audit. User was asked for decisions on activation and adapter check.

### Explanation

The user explicitly prefers NO changes to Windows/Office activation state, NO firmware certificate (DBX) updates, and NO other modifications resulting from the audit — "leave as-is". Do not propose or perform activation fixes, firmware updates, or driver/service changes unless the user explicitly requests them later.

### Alternatives

1) Apply DBX update via Windows Update — rejected by user. 2) Activate Windows with a key — no key provided, rejected. 3) Change power behavior — no approval given; machine must still use AC for GPU-heavy work, worth reminding the user.

### Rationale (Why this?)

The user treats the used workstation as stable and prioritizes no-change over fixes for cosmetic/activation issues. Only hardware-health threats (WHEA, storage failure, thermal damage) should override this stance, and then only after explicit approval.

### Exercises

1) Never attempt Windows/Office activation fixes. 2) Never apply Secure Boot DBX updates without explicit request. 3) On future audits, skip activation status as a change item; report it only. 4) Remind user about AC adapter for heavy GPU work without changing power settings.

### Next Steps

Phase 1+ of the workstation plan may still cover read-only validation, tooling, benchmarks, and template creation — anything that does not modify Windows/firmware state.

---
