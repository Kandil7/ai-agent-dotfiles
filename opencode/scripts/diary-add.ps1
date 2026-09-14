<#
.SYNOPSIS
  Quick diary entry: appends "what I learned / what confused me / what I'll
  try next" to docs/learning/mentor/diary.md — without opening opencode.

.DESCRIPTION
  The 2-minute end-of-day ritual. Prompts for three lines (or takes them as
  parameters for automation) and appends them under a dated heading in the
  repo's mentor diary. Creates the folders if they don't exist.

  NOTE: this file must stay pure ASCII so PowerShell 5.1 parses it without a
  UTF-8 BOM. Do not introduce non-ASCII characters.

.PARAMETER Repo
  Repo root (default: current directory).

.PARAMETER Learned
  What you learned today. If omitted, you are prompted.

.PARAMETER Confused
  What confused you. If omitted, you are prompted.

.PARAMETER Next
  What you'll try next time. If omitted, you are prompted.

.EXAMPLE
  powershell -NoProfile -File diary-add.ps1 -Repo C:\Users\Dell\projects\athar

.EXAMPLE
  powershell -NoProfile -File diary-add.ps1 -Learned "RAG chunking" -Confused "rerankers" -Next "read docs"

.EXAMPLE
  # Daily habit: alias or Task Scheduler opening the prompt at 21:00:
  # powershell -NoProfile -File diary-add.ps1
#>
param(
  [string]$Repo = ".",
  [string]$Learned = "",
  [string]$Confused = "",
  [string]$Next = ""
)

$repoPath = (Resolve-Path -LiteralPath $Repo -ErrorAction Stop).Path
$diaryDir = Join-Path $repoPath "docs\learning\mentor"
$diaryFile = Join-Path $diaryDir "diary.md"

if (-not (Test-Path -LiteralPath $diaryDir)) {
  New-Item -ItemType Directory -Path $diaryDir -Force | Out-Null
}

if (-not $Learned) { $Learned = Read-Host "What did you learn today?" }
if (-not $Confused) { $Confused = Read-Host "What confused you?" }
if (-not $Next) { $Next = Read-Host "What will you try next?" }

$today = Get-Date -Format "yyyy-MM-dd"
$entry = @(
  "- What I learned: $Learned"
  "- What confused me: $Confused"
  "- What I'll try next: $Next"
)

if (Test-Path -LiteralPath $diaryFile) {
  $existing = Get-Content -LiteralPath $diaryFile -Raw
  $hasHeading = $existing -match "(?m)^## $today\s*$"
  if (-not $hasHeading) {
    Add-Content -LiteralPath $diaryFile -Value "`n## $today"
  }
  Add-Content -LiteralPath $diaryFile -Value $entry
}
else {
  Set-Content -LiteralPath $diaryFile -Value @("# Diary", "", "## $today") -Encoding UTF8
  Add-Content -LiteralPath $diaryFile -Value $entry
}

Write-Output "Diary updated: $diaryFile"
