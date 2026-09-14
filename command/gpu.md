---
description: One-shot GPU/hardware snapshot: VRAM tenants, temperature, power draw, utilization, disk and RAM headroom. READ ONLY.
agent: hardware
---

1. **GPU summary** — `nvidia-smi`: utilization, memory used/total, temperature, power draw.
2. **VRAM tenants** — processes holding VRAM (`nvidia-smi --query-compute-apps=pid,process_name,used_memory --format=csv`). Flag non-obvious consumers (browser GPU accel, Windows apps).
3. **Disk headroom** — C: and D: free space (`Get-PSDrive`).
4. **RAM** — available physical memory (`Get-CimInstance Win32_OperatingSystem | Select-Object FreePhysicalMemory`).
5. **Verdict** — one line: is the box ready for a training/inference run right now? If free VRAM is tight, say exactly what to close or clean first.

Format: FACT values with units and the command that measured them. End with the verdict line.
