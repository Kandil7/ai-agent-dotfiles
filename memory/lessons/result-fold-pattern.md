# Result<T> Uses fold() Not when()

### Context

PRIME OS Flutter project using custom Result<T> sealed class

### Explanation

**Critical pattern: Result<T> uses fold(), not when()**

The project's Result<T> is a sealed class with:
- `Success<T>` — holds data
- `FailureResult<T>` — holds Failure

It does NOT have a `when()` method like Freezed types. Instead, use `fold()`:
```dart
result.fold(
  (data) => /* success handler */,
  (failure) => /* failure handler */,
);
```

Alternatively, use switch expressions on the sealed class:
```dart
switch (result) {
  case Success(:final data) => /* handle data */,
  case FailureResult(:final failure) => /* handle failure */,
}
```

**Why this matters:** Freezed types have `when()`/`map()` for pattern matching. Result<T> is a hand-rolled sealed class that only has `fold()`. Don't mix up the two patterns.

### Rationale (Why this?)

The Result<T> sealed class was designed with fold() for functional-style error handling. This is different from Freezed's when()/map() pattern. Mixing them up causes compile errors.

### Exercises

["1. When using Result<T>, always use fold() for pattern matching", "2. When using Freezed types, use when()/map() for pattern matching", "3. If you need switch expressions, use sealed classes (not Freezed abstract classes)"]

### Next Steps

["Apply this pattern in M4+ when working with Result<T>", "Consider adding when()/map() to Result<T> if needed for consistency"]

---
