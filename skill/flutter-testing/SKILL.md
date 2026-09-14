---
name: flutter-testing
description: "Flutter testing patterns. Use when the user says 'flutter test', 'widget test', 'integration test', 'golden test', 'mockito', 'bloc_test', or 'patrol'."
---

# Flutter Testing

## Test types

| Type | Speed | What it tests | Tool |
|------|-------|---------------|------|
| Unit | Fast | Business logic, models, utils | `test()` |
| Widget | Medium | Widget rendering, user interaction | `testWidgets()` |
| Integration | Slow | Full app flow on device/emulator | `integration_test/` |
| Golden | Medium | Visual regression (screenshot comparison) | `matchesGoldenFile()` |

## Unit testing

```dart
test('User model fromJson', () {
  final json = {'name': 'Ahmed', 'email': 'a@b.com'};
  final user = User.fromJson(json);
  expect(user.name, 'Ahmed');
});
```

## Widget testing

```dart
testWidgets('Counter increments', (tester) async {
  await tester.pumpWidget(MaterialApp(home: CounterPage()));
  await tester.tap(find.byIcon(Icons.add));
  await tester.pump();
  expect(find.text('1'), findsOneWidget);
});
```

## Integration testing

```dart
// integration_test/app_test.dart
import 'package:integration_test/integration_test.dart';
void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();
  testWidgets('Full login flow', (tester) async {
    await tester.pumpWidget(MyApp());
    // ... full flow steps
  });
}
```

## Mocking

- `mockito`: code generation for mocks (`@GenerateMocks`)
- `bloc_test`: mock Bloc/Cubit with `MockBloc`
- `http`: mock HTTP responses with `MockClient`

## Anti-patterns

- Testing implementation details (test behavior, not internals)
- Tautological tests (assertions that always pass)
- Flaky tests (random failures — pin seeds, mock time)
- Not running tests before commits

## CI integration

```yaml
# GitHub Actions
- name: Test
  run: flutter test --coverage
- name: Coverage check
  run: lcov --summary coverage/lcov.info  # minimum 80%
```
