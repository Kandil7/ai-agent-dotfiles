---
name: flutter-performance
description: "Flutter performance optimization. Use when the user says 'performance', 'DevTools', 'frame rendering', 'memory', 'jank', ' profiling', or 'lazy loading'."
---

# Flutter Performance

## DevTools profiling

- **Performance tab**: frame timeline, identify jank frames
- **Memory tab**: heap allocation, GC events, memory leaks
- **CPU profiler**: hot functions, call tree
- Run: `flutter run --profile` (never measure performance in debug mode)

## Frame rendering budget

- Target: 16ms per frame (60fps) or 8ms (120fps)
- Jank = frame takes >16ms
- Use `Timeline` API to mark custom operations

## Common jank causes

1. **Expensive `build()` methods** — extract into smaller widgets, use `const`
2. **Unnecessary rebuilds** — use `BlocSelector`, `RepaintBoundary`, `const` widgets
3. **Large images** — use `CachedNetworkImage`, resize before display
4. **Heavy widget trees** — flatten nesting, use `ListView.builder` for long lists
5. **Synchronous I/O** — move to isolates (compute function)

## Memory optimization

- Dispose controllers, streams, subscriptions
- Use `WeakReference` for caches
- Avoid retaining large objects in closures
- Profile with DevTools Memory tab: look for growing heap

## Lazy loading

```dart
ListView.builder(
  itemCount: items.length,
  itemBuilder: (context, index) => ItemWidget(items[index]),
);
```

## Image caching

- `CachedNetworkImage`: automatic disk+memory caching
- Resize: `flutter_image_compress` before caching
- Use thumbnails for lists, full-size on detail

## Pitfalls

- Measuring in debug mode (use `--profile`)
- Ignoring `const` (unnecessary widget rebuilds)
- Not using `ListView.builder` for long lists
- Creating new widget instances in `build()` (cache with const)
