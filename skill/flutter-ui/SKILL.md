---
name: flutter-ui
description: "Flutter UI patterns. Use when the user says 'Material Design', 'Cupertino', 'responsive', 'theme', 'animation', 'custom painter', 'layout', or 'dark mode'."
---

# Flutter UI

## Material Design 3

- `ThemeData`: color scheme, typography, shape, component themes
- Use `ColorScheme.fromSeed()` for dynamic theming
- `MaterialApp` -> `Theme.of(context)` to access theme
- Dark mode: `MaterialApp(themeMode: ThemeMode.system)`

## Responsive layout

- `LayoutBuilder`: get constraints, build different layouts per breakpoint
- `MediaQuery.of(context)`: screen size, orientation, padding
- `GridView`, `Wrap`, `Row`/`Column` with `Flexible`/`Expanded`
- Breakpoints: phone (<600), tablet (600-1200), desktop (>1200)

## Animation

- Implicit animations: `AnimatedContainer`, `AnimatedOpacity`, `AnimatedPositioned`
- Explicit animations: `AnimationController` + `Tween` + `AnimatedBuilder`
- Hero animations: `Hero` widget for shared element transitions
- Staggered animations: `Interval` for sequenced effects

## Custom painters

- `CustomPainter` + `Canvas`: draw custom shapes, charts, progress indicators
- `shouldRepaint()`: return true only when data changes
- Use for: custom charts, decorative elements, complex visualizations

## Common widgets

- `Scaffold` + `AppBar` + `Body`: standard page structure
- `ListView.builder`: lazy list rendering (never build all items)
- `Stack` + `Positioned`: overlay layouts
- `AnimatedList`: animated add/remove from lists
- `ClipRRect`/`ClipOval`: clipping with border radius

## Pitfalls

- Not using `const` constructors (unnecessary rebuilds)
- Heavy `build()` methods (extract into smaller widgets)
- Ignoring keyboard insets (use `MediaQuery.viewInsets`)
- Not testing on different screen sizes
