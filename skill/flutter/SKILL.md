---
name: flutter
description: "Flutter framework patterns. Use when the user says 'flutter', 'widget', 'hot reload', 'pubspec', 'platform channels', 'Flutter project', or 'MaterialApp'."
---

# Flutter Framework

## Project structure

```
lib/
  main.dart
  app.dart              # MaterialApp, theme, routing
  features/             # feature-based organization
    auth/
      bloc/             # Bloc/Cubit per feature
      data/             # data sources, models, repositories
      presentation/     # widgets, screens
  core/                 # shared utilities, theme, constants
    theme/
    network/
    widgets/
test/
  unit/
  widget/
  integration/
```

## Widget fundamentals

- **StatelessWidget**: immutable, no state. `build()` method only.
- **StatefulWidget**: mutable state. `createState()` -> `State<T>`.
- **Key decision**: use `const` constructors everywhere possible. Use `Key` when列表需要reorder或需要强制rebuild。

## Lifecycle

- `initState()` -> `build()` -> `dispose()`
- `didUpdateWidget()`: parent rebuilds with new config
- `reassemble()`: hot reload only, never in production

## Platform channels

- `MethodChannel`: call native code from Dart
- `EventChannel`: stream data from native to Dart
- Use for: camera, sensors, deep linking, push notifications
- Verify: channel name must match on both sides (Android/iOS)

## Navigation

- **Named routes**: simple apps, `Navigator.pushNamed(context, '/route')`
- **GoRouter**: declarative routing, deep linking, redirect guards
- **Navigator 2.0**: programmatic control, complex flows

## Common pitfalls

- Forgetting `const` constructors (unnecessary rebuilds)
- Building in `build()` instead of `initState()` (expensive operations)
- Not disposing controllers (memory leaks)
- Using `setState()` across widget boundaries (use Bloc instead)
- Hardcoded strings (use localization)
- Ignoring platform differences (iOS back behavior, permissions)
