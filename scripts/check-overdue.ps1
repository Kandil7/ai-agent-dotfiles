<#
.SYNOPSIS
  OS-level nudge: flags repos whose mentor-lite check-in is overdue per the
  profile rhythm, and repos whose PROJECT-CHECKPOINT.md is stale.

.DESCRIPTION
  Scans the given roots for `docs/learning/mentor/` folders. For each repo,
  determines the rhythm from `docs/learning/mentor/profile.md` (looks for a
  "rhythm" field; defaults to weekly) and compares the latest check-in date
  against the rhythm's max gap:
    bootcamp  -> 1 day
    weekly    -> 7 days
    casual    -> 14 days
    on-demand / review-only -> skipped (no scheduled reviews)
  Separately, flags repos where docs/PROJECT-CHECKPOINT.md is older than
  -CheckpointDays (default 14). Prints a REMINDER line per overdue repo and
  exits 1 if any are overdue (exit 0 otherwise). Suitable for a daily
  Windows Task Scheduler task.

  NOTE: this file must stay pure ASCII so PowerShell 5.1 parses it without a
  UTF-8 BOM. Do not introduce non-ASCII characters.

.PARAMETER Roots
  One or more directories to scan (default: $HOME). Accepts comma-separated
  or repeated values.

.PARAMETER DaysOverride
  Force a max-gap in days for every repo (ignores rhythm) - useful for
  testing.

.PARAMETER CheckpointDays
  Max age in days for docs/PROJECT-CHECKPOINT.md (default 14). Set 0 to
  skip the checkpoint check.

.EXAMPLE
  powershell -NoProfile -File check-overdue.ps1 -Roots "C:\Users\M Lapan\projects","C:\Users\M Lapan\repos"

.EXAMPLE
  powershell -NoProfile -File check-overdue.ps1 -DaysOverride 2

.EXAMPLE
  # Task Scheduler (daily at 09:00): trigger a powershell.exe task with:
  # -NoProfile -File "C:\Users\M Lapan\.config\opencode\scripts\check-overdue.ps1"
#>
param(
  [string[]]$Roots = @($HOME),
  [int]$DaysOverride = -1,
  [int]$CheckpointDays = 14
)

$ErrorActionPreference = "SilentlyContinue"

$rhythmDays = @{
  bootcamp = 1
  weekly = 7
  casual = 14
  ondemand = -1   # no scheduled reviews
  "on-demand" = -1
  reviewonly = -1
  "review-only" = -1
}

function Get-RhythmFromProfile([string]$profilePath) {
  if (-not (Test-Path -LiteralPath $profilePath)) { return "weekly" }
  $raw = Get-Content -LiteralPath $profilePath -Raw
  if ($raw -match "(?im)rhythm\s*[:\-]\s*(\S+)") {
    return $Matches[1].Trim().ToLower()
  }
  return "weekly"
}

$repos = @()
foreach ($root in $Roots) {
  if (-not (Test-Path -LiteralPath $root)) { continue }
  Get-ChildItem -LiteralPath $root -Directory -Recurse -ErrorAction SilentlyContinue |
    Where-Object { $_.Name -eq "mentor" -and $_.FullName -match "docs[\\/]learning[\\/]mentor$" } |
    ForEach-Object { $repos += (Split-Path (Split-Path (Split-Path $_.FullName -Parent) -Parent) -Parent) }
  Get-ChildItem -LiteralPath $root -Directory -Recurse -ErrorAction SilentlyContinue |
    Where-Object { $_.Name -eq "PROJECT-CHECKPOINT.md" } |
    ForEach-Object { $repos += $_.FullName }
}
$repos = $repos | Select-Object -Unique

if ($repos.Count -eq 0) {
  Write-Output "No mentor or checkpoint repos found under: $($Roots -join ', ')"
  exit 0
}

$overdue = 0
foreach ($repo in $repos) {
  if ((Test-Path -LiteralPath (Join-Path $repo "docs\PROJECT-CHECKPOINT.md"))) {
    $cp = Get-Item -LiteralPath (Join-Path $repo "docs\PROJECT-CHECKPOINT.md")
    if ($CheckpointDays -gt 0) {
      $gap = ((Get-Date).Date - $cp.LastWriteTime.Date).Days
      if ($gap -gt $CheckpointDays) {
        Write-Output "REMINDER  $repo  (checkpoint $($cp.LastWriteTime.ToString('yyyy-MM-dd')) - $gap days old, max $CheckpointDays)"
        $overdue++
      }
      else {
        Write-Output "OK        $repo  (checkpoint $($cp.LastWriteTime.ToString('yyyy-MM-dd')), $gap days old)"
      }
    }
    continue
  }

  $mentorDir = Join-Path $repo "docs\learning\mentor"
  $profilePath = Join-Path $mentorDir "profile.md"
  $rhythm = Get-RhythmFromProfile $profilePath
  $maxDays = $rhythmDays[$rhythm]
  if ($null -eq $maxDays) { $maxDays = 7 }
  if ($DaysOverride -ge 0) { $maxDays = $DaysOverride }
  if ($maxDays -lt 0) { continue }   # on-demand / review-only: never overdue

  $latest = Get-ChildItem -LiteralPath (Join-Path $mentorDir "checkins") -Filter "*-checkin.md" |
    Sort-Object Name -Descending | Select-Object -First 1
  if (-not $latest) {
    Write-Output "REMINDER  $repo  (no check-in ever - profile exists, rhythm $rhythm)"
    $overdue++
    continue
  }
  $datePart = ($latest.BaseName -split "-checkin")[0]
  $checkinDate = $null
  if ($datePart -match "^\d{4}-\d{2}-\d{2}$") { $checkinDate = Get-Date $datePart } else { $checkinDate = $latest.LastWriteTime.Date }
  $gap = ((Get-Date).Date - $checkinDate).Days
  if ($gap -gt $maxDays) {
    Write-Output "REMINDER  $repo  (last check-in $($checkinDate.ToString('yyyy-MM-dd')) - $gap days ago, rhythm $rhythm allows $maxDays)"
    $overdue++
  }
  else {
    Write-Output "OK        $repo  (last check-in $($checkinDate.ToString('yyyy-MM-dd')), $gap days ago)"
  }
}

if ($overdue -gt 0) {
  Write-Output "Overdue repos: $overdue - run /mentor-lite checkin or /checkpoint (nudge with care, no guilt)."
  exit 1
}
Write-Output "All repos up to date."
exit 0