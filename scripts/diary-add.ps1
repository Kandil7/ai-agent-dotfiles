<#
.SYNOPSIS
  2-minute diary entry without opencode: appends a dated entry to
  docs/learning/mentor/diary.md in the current (or given) repo.

.DESCRIPTION
  Prompts for three lines - what you learned, what confused you, what is
  next - and appends them as a dated entry. Creates the mentor folder if
  missing. Pure ASCII.

.PARAMETER Repo
  Repo directory (default: current directory).

.EXAMPLE
  powershell -NoProfile -File diary-add.ps1

.EXAMPLE
  powershell -NoProfile -File diary-add.ps1 -Repo "C:\Users\M Lapan\projects\ml-lab"
#>
param(
  [string]$Repo = (Get-Location).Path
)

$diaryDir = Join-Path $Repo "docs\learning\mentor"
New-Item -ItemType Directory -Path $diaryDir -Force | Out-Null
$diaryFile = Join-Path $diaryDir "diary.md"
if (-not (Test-Path -LiteralPath $diaryFile)) {
  Set-Content -LiteralPath $diaryFile -Value "# Diary" -Encoding ASCII
}

$learned = Read-Host "What did you learn?"
$confused = Read-Host "What confused you?"
$next = Read-Host "What is next?"

$entry = @"
## $(Get-Date -Format 'yyyy-MM-dd')

- Learned: $learned
- Confused: $confused
- Next: $next

---
"@
Add-Content -LiteralPath $diaryFile -Value $entry -Encoding ASCII
Write-Output "Appended to $diaryFile"