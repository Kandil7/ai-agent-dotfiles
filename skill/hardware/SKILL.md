---
name: hardware
description: Hardware diagnostics for the Dell Precision 7740 / RTX 5000. Use when the user says "hardware", "nvidia-smi", "thermal", "GPU temperature", "benchmark", "storage", "disk space", "WSL", "VRAM", "fan", "power draw", or when the /benchmark command is invoked.
---

# Hardware Diagnostics — Dell Precision 7740

## Measurements (never fabricate)

```bash
# GPU status, processes, temperature, power
nvidia-smi
nvidia-smi -q -d TEMPERATURE,PERFORMANCE,POWER,MEMORY

# GPU load over time (thermal tests)
nvidia-smi --query-gpu=temperature.gpu,power.draw,utilization.gpu,memory.used --format=csv -l 5

# Storage
Get-Volume | Format-Table DriveLetter,FileSystemLabel,Size,SizeRemaining
Get-Disk | Format-Table Number,FriendlyName,Size,PartitionStyle

# Memory / CPU
Get-CimInstance Win32_Processor | Select-Object Name,NumberOfCores
(Get-CimInstance Win32_OperatingSystem).TotalVisibleMemorySize
```

## Thermal protocol

- Baseline at idle, then under load (e.g. `torch` benchmark or `stress`), then cooldown.
- Report the trend and the sustained value, not the peak alone.
- RTX 5000 throttles around 84-90 C sustained — if hit, the fix is airflow/power profile, not software alone. Do not guess: measure.

## Storage protocol

- Report used/free on the system NVMe, `D:\AI`, and the WSL VHDX (`wsl -- df -h` for the distro root).
- Never suggest moving/resizing the WSL or Docker VHDX.

## Reports

- Save results to `C:\AI-Workstation\reports\` (infra reports) or project `docs/` with the command used to produce each number.