# ============================================================
# sync-opencode.ps1 — one-command refresh of the opencode/
# folder in this repo from the LIVE global config
# (~/.config/opencode/).
#
# Usage:
#   powershell -NoProfile -ExecutionPolicy Bypass -File scripts\sync-opencode.ps1
#   powershell ... -File scripts\sync-opencode.ps1 -Push        # also commit+push
#   powershell ... -File scripts\sync-opencode.ps1 -DryRun      # preview only
#   powershell ... -File scripts\sync-opencode.ps1 -ConfigRoot "X:\path\to\opencode"
#
# Safe: never copies credentials, sessions, logs, node_modules.
# ============================================================
param(
  [string]$ConfigRoot = "$env:USERPROFILE\.config\opencode",
  [switch]$Push,
  [switch]$DryRun
)

$ErrorActionPreference = "Stop"
$RepoRoot  = Split-Path -Parent $PSScriptRoot   # repo root = parent of scripts/
$DestDir   = Join-Path $RepoRoot "opencode"

if (-not (Test-Path $ConfigRoot)) { Write-Error "Config root not found: $ConfigRoot"; exit 1 }
if (-not (Test-Path $DestDir))    { Write-Error "Dest dir not found: $DestDir (are you in the ai-agent-dotfiles repo?)"; exit 1 }

# dirs to mirror (full recursive sync, including deletions)
$dirs = @("agents","command","skills","specs","tools","scripts","memory")
# top-level files to copy (overwrite)
$files = @("AGENTS.md","opencode.jsonc","README.md","package.json")

$changed = $false

# ---- dirs ----
foreach ($d in $dirs) {
  $s = Join-Path $ConfigRoot $d
  $t = Join-Path $DestDir $d
  if (-not (Test-Path $s)) { Write-Warning "skipping missing source dir: $d"; continue }
  if ($DryRun) { Write-Output "[dry] mirror $d -> opencode\$d"; continue }
  # robocopy exit codes: 0-7 = success, >=8 = failure
  robocopy $s $t /MIR /XD node_modules /XJ /NFL /NDL /NJH /NJS /NP | Out-Null
  if ($LASTEXITCODE -ge 8) { Write-Error "robocopy failed on $d (exit $LASTEXITCODE)"; exit 1 }
  if ($LASTEXITCODE -gt 0) { $changed = $true }
}

# ---- files ----
foreach ($f in $files) {
  $s = Join-Path $ConfigRoot $f
  if (-not (Test-Path $s)) { Write-Warning "skipping missing file: $f"; continue }
  if ($DryRun) { Write-Output "[dry] copy $f -> opencode\$f"; continue }
  $srcHash = (Get-FileHash $s -Algorithm SHA256).Hash
  $dstPath = Join-Path $DestDir $f
  $dstHash = if (Test-Path $dstPath) { (Get-FileHash $dstPath -Algorithm SHA256).Hash } else { "" }
  if ($srcHash -ne $dstHash) {
    Copy-Item $s $dstPath -Force
    Write-Output "updated: $f"
    $changed = $true
  }
}

if ($DryRun) { Write-Output "[dry] done. (no changes made)"; exit 0 }

if (-not $changed) {
  Write-Output "No changes detected - config is already in sync."
  exit 0
}

Write-Output "Sync complete. Changes detected -> stage, commit, push:"
git -C $RepoRoot add -A
git -C $RepoRoot status --short

if ($Push) {
  git -C $RepoRoot commit -m "sync: update opencode config from live (~/.config/opencode)" -q
  git -C $RepoRoot push -q
  Write-Output "Committed and pushed."
} else {
  Write-Output "Not committed (use -Push to commit+push)."
}
