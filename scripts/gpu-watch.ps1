# GPU-WATCH
# Records a timestamped nvidia-smi trace to CSV while training/inference runs.
# READ ONLY w.r.t. the system; writes only the report file.
# Usage:
#   powershell -File gpu-watch.ps1                          # 5 min @ 5 s
#   powershell -File gpu-watch.ps1 -DurationSeconds 900     # 15 min
#   powershell -File gpu-watch.ps1 -OutFile "D:\AI\run.csv"

param(
  [int]$IntervalSeconds = 5,
  [int]$DurationSeconds = 300,
  [string]$OutFile = ""
)

if (-not $OutFile) {
  $stamp = Get-Date -Format "yyyyMMdd-HHmmss"
  $OutFile = "C:\AI-Workstation\reports\gpu-watch-$stamp.csv"
}

$dir = Split-Path -Parent $OutFile
if ($dir -and -not (Test-Path -LiteralPath $dir)) {
  New-Item -ItemType Directory -Path $dir -Force | Out-Null
}

"timestamp,name,utilization_pct,memory_used_mib,memory_total_mib,temp_c,power_w" |
  Set-Content -LiteralPath $OutFile -Encoding utf8

Write-Host "GPU watch started -> $OutFile (every ${IntervalSeconds}s for ${DurationSeconds}s). Ctrl+C stops early."

$deadline = (Get-Date).AddSeconds($DurationSeconds)
while ((Get-Date) -lt $deadline) {
  $line = nvidia-smi --query-gpu=timestamp,name,utilization.gpu,memory.used,memory.total,temperature.gpu,power.draw --format=csv,noheader,nounits
  if ($line) { Add-Content -LiteralPath $OutFile -Value $line -Encoding utf8 }
  Start-Sleep -Seconds $IntervalSeconds
}

Write-Host "GPU watch complete: $OutFile"
