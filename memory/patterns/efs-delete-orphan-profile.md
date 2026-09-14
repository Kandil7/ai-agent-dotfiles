# EFS-encrypted files block Remove-Item even as admin; use [IO.File]::Delete

### Context

Deleting the orphan Windows profile C:\Users\Kandil7 (2026-08-18). After takeown /R + icacls /grant Administrators:(OI)(CI)F succeeded on 3864 files (0 failed), Remove-Item still threw 'Access to the path is denied' on 6 askpass script files under Code\User\globalStorage\vscode.git\askpass\. Root cause: those files were EFS-encrypted under the original profile (deleted 'M Lapan' SID ...-1001) whose DPAPI/cert key is gone — open-for-read/write is denied to everyone, even admin, but deletion is still permitted via the parent directory's FILE_DELETE_CHILD permission.

### Explanation

On NTFS, EFS-encrypted files whose decryption key is unavailable deny ALL content opens (read/write) to every user including Administrators and SYSTEM, while ACL metadata ops (takeown, icacls) succeed. PowerShell's Remove-Item fails on them ('Access to the path is denied') because the FileSystem provider opens files to check/clear attributes. The raw Win32 DeleteFile / [System.IO.File]::Delete succeeds because deleting only requires FILE_DELETE_CHILD on the parent directory, not opening the file. Fix: enumerate with [System.IO.Directory]::GetFiles(..., AllDirectories) and delete each via [System.IO.File]::Delete, then Remove-Item -Recurse for the now-empty directories.

### Alternatives

1) cipher /d to decrypt — impossible, key is gone. 2) icacls /reset — doesn't touch encryption. 3) Take ownership via psexec SYSTEM — still blocked because EFS content access needs the key, not privileges. 4) Schedule deletion via PendingFileRenameOperations — works but requires registry surgery + reboot. [IO.File]::Delete is the clean one-liner.

### Rationale (Why this?)

Signature to recognize: file shows real size, ACL reads fine, owner set, but ANY File.Open (even Read) throws 'Access to the path is denied'. cmd /c del and PowerShell Remove-Item behave differently from [IO.File]::Delete because of open-before-delete semantics. Revisit if a profile contains EFS files from a deleted user whose certificate is gone.

### Exercises

1) Test [System.IO.File]::Open(path, Open, Read, None) on a stuck file to classify lock vs EFS (lock = 'being used by another process'; EFS = 'Access is denied' on Read). 2) Use cipher /c <file> to confirm EFS status before deleting. 3) Bulk-delete pattern: GetFiles(AllDirectories) + File::Delete, then Remove-Item on empty dirs. 4) For a whole-profile kill: delete with .NET from inside an elevated script for maximum reliability.

### Next Steps

None — C:\Users\Kandil7 is fully deleted (Test-Path = False). The k7-cleanup.ps1 script in %TEMP% still uses the Remove-Item approach; it will be discarded with Temp cleanup. Related: memory/patterns/windows-profile-migration.md covers the full migration playbook.

---
