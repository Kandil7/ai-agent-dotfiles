# sqlite3 3.x build hooks fail on Windows without C compiler

### Context

PRIME OS M0 milestone. Any Flutter project using packages that depend on sqlite3 3.x (drift, sqflite_common_ffi) will fail flutter test on this Windows machine.

### Explanation

## FACT
The sqlite3 3.x package uses Dart build hooks (native_toolchain_c) that fail on this Windows machine with: `'/f' is not recognized as an internal or external command`. The hook.dill compilation message appears but the hook runner reports failure. No C compiler (cl.exe, gcc, cc) is installed.

## INFERENCE
The `/f` error comes from Flutter's shared.bat `FOR /f` syntax leaking to PowerShell stderr, corrupting the hook runner's process execution. Even if this were fixed, the CompileSqlite path would fail without a C compiler. The PrecompiledBinary download path should work in theory but the hook runner fails before reaching it.

## RECOMMENDATION
- For projects needing sqlite3 native (drift, sqflite_common_ffi): either install Visual Studio Build Tools, or use sqflite without ffi on Windows
- On CI Linux, the hooks should work (has gcc/cc by default)
- Consider pinning sqlite3 to 2.x if drift compatibility allows it
- Watch for Dart SDK fixes to hook runner stderr sensitivity

## WORKAROUND
Use `sqflite` directly without `drift` or `sqflite_common_ffi` for local Windows development and testing.

### Alternatives

1. Install Visual Studio Build Tools (1-2 GB) — permanent fix for native compilation on Windows
2. Pin sqlite3 to 2.x — uses DynamicLibrary instead of hooks, but requires compatible drift version
3. Use Linux CI for all tests — works around Windows limitation

### Rationale (Why this?)

This is a Windows-specific environment issue that affects any Dart package using sqlite3 3.x build hooks. The workaround (plain sqflite) is practical but should be documented.

### Exercises

["Run `flutter test` on a project with drift after installing VS Build Tools to verify", "Check if a future Flutter/Dart version fixes the hook runner's stderr sensitivity", "Verify that sqlite3 hooks work on Linux CI runners (GitHub Actions ubuntu-latest)", "Explore if there's a DART_FLAGS or env var to suppress the hook runner issue"]

### Next Steps

When a project needs drift, decide: install VS Build Tools, or use Linux CI for testing.

---
