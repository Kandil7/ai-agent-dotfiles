# Freezed 4.x requires abstract class and .when() for exhaustive matching

### Context

PRIME OS project using freezed ^4.0.0 with Dart 3.13.0. Analyzer 13.3.0 enforces strict exhaustiveness checks.

### Explanation

Freezed 4.x generates `mixin _$ClassName` with abstract getters. The source class must be declared as `abstract class ClassName with _$ClassName` (not plain `class`). For exhaustive pattern matching in switch expressions, use `.when()` or `.map()` methods instead of switch, because the abstract class is not recognized as sealed by the analyzer. Switch expressions on freezed abstract classes produce `non_exhaustive_switch_expression` errors.

### Alternatives

Downgrade to freezed 3.x (works but loses Dart 3.13 support), use sealed classes directly without freezed (lose copyWith/equality).

### Rationale (Why this?)

Freezed 4.0.0 was released 2026-08-22 to support Dart 3.13. The abstract class requirement is a consequence of the mixin pattern. The `.when()` API provides the same exhaustiveness guarantees as sealed class switches.

### Exercises

1. Create a freezed class with abstract keyword and verify generate output
2. Use .when() instead of switch for a freezed state class
3. Compare generated code between freezed 3.x and 4.x patterns

### Next Steps

Apply this pattern consistently across all M2-M4 freezed classes.

---

## Freezed 4.x Critical Patterns (2026-08-28)

### Context

PRIME_OS Flutter project using Freezed 4.x with Dart 3.13.0

### Explanation

**Critical Freezed 4.x patterns discovered during M2 implementation:**

1. **Abstract class pattern:** Use `abstract class ClassName with _$ClassName` (NOT plain `class`). Plain classes cause freezed to generate `_$ClassName` which doesn't exist.

2. **Switch expressions:** NEVER use switch expressions on freezed abstract classes — Dart sees them as non-exhaustive. Use `.when()` or `.map()` for exhaustive pattern matching instead.

3. **Generated code:** Freezed 4.x generates `class _Foo implements Foo` (implements, NOT extends). This is why the abstract class + mixin pattern works.

4. **copyWith/copyWithOrNull:** Use `copyWithOrNull` when you need to explicitly set a field to null (e.g., `completedAt: copyWithOrNull(completedAt: null)`).

**Example of correct Freezed 4.x model:**
```dart
@freezed
abstract class MyClass with _$MyClass {
  const factory MyClass({
    required String id,
    String? name,
  }) = _MyClass;
}
```

**Example of correct pattern matching:**
```dart
// WRONG — causes non_exhaustive_switch_expression
switch (state) {
  case Loaded(): ...
  case Loading(): ...
}

// CORRECT — exhaustive via .when()
state.when(
  loaded: (items) => ...,
  loading: () => ...,
  error: (msg) => ...,
);
```

### Rationale (Why this?)

Freezed 4.x has breaking changes from earlier versions. The abstract class + mixin pattern and .when()/.map() pattern matching are essential to avoid compile errors.

### Exercises

["1. When creating a new Freezed model, always use `abstract class` pattern", "2. When pattern matching on Freezed states, prefer `.when()`/`.map()` over switch expressions", "3. If switch is needed, use `sealed` classes instead of Freezed for the state type"]

### Next Steps

["Apply these patterns in M3+ when creating new models/states", "Consider using sealed classes for cubit states if switch exhaustiveness is needed"]

---
