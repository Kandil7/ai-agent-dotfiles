---
name: dart
description: "Dart language patterns. Use when the user says 'dart', 'null safety', 'async/await', 'isolates', 'mixins', 'extensions', 'pattern matching', or 'Dart code'."
---

# Dart Language

## Null safety (sound)

- Non-nullable by default: `String name` cannot be null
- Nullable: `String? name` — must null-check before use
- Late variables: `late String data` — initialized on first access, crashes if used before init
- Null-aware operators: `??` (default), `?.` (safe call), `!` (assert non-null)

## Async patterns

- `Future<T>`: single async value. Use `async/await`, not `.then()` chains.
- `Stream<T>`: multiple async values. Use `await for` or `.listen()`.
- `Isolate`: true parallelism (no shared memory). Use for CPU-bound work.
  - `compute()`: simple isolate wrapper for one-shot function calls
  - `Isolate.spawn()`: complex multi-message patterns

## Mixins and extensions

- `mixin`: reusable behavior without inheritance. `class MyClass extends Base with MyMixin`.
- `on` constraint: `mixin MyMixin on Base` — only usable with Base subclasses.
- `extension` on types: add methods without modifying the original class.

## Pattern matching (Dart 3+)

- `switch` expressions: `var result = switch (x) { 1 => 'one', 2 => 'two', _ => 'other' };`
- Guard clauses: `case int n when n > 0:`
- Destructuring: `case [var first, ...var rest]:`
- Sealed classes: `sealed class Result {}` with exhaustive pattern matching

## Collections

- `List<T>`, `Set<T>`, `Map<K,V>` — generics required
- Spread operator: `[...list1, ...list2]`
- Collection-if: `[if (condition) item]`
- Collection-for: `[for (var i in list) i * 2]`

## Common pitfalls

- Using `==` on objects (use `identical()` for identity, override `==` for value equality)
- Ignoring `lint` rules (run `dart analyze` before committing)
- Not using `const` constructors (immutable widgets)
- String interpolation in hot paths (use StringBuffer for large builds)
