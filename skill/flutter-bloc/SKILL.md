---
name: flutter-bloc
description: "Bloc/Cubit state management for Flutter. Use when the user says 'bloc', 'cubit', 'state management', 'BlocProvider', 'flutter_bloc', 'BlocListener', or manages app state."
---

# Bloc / Cubit State Management

## Bloc vs Cubit decision tree

| Use | When |
|-----|------|
| **Cubit** | Simple state transitions, no complex event logic, state = data class |
| **Bloc** | Complex event-driven logic, multiple event types, audit trail needed, testing events |

## Bloc pattern (event-driven)

```dart
// Event
abstract class AuthEvent {}
class LoginRequested extends AuthEvent {
  final String email;
  final String password;
  LoginRequested({required this.email, required this.password});
}

// State
class AuthState { final bool isLoading; final User? user; final String? error; }

// Bloc
class AuthBloc extends Bloc<AuthEvent, AuthState> {
  AuthBloc() : super(AuthState()) {
    on<LoginRequested>(_onLogin);
  }
  Future<void> _onLogin(LoginRequested event, Emitter<AuthState> emit) async {
    emit(state.copyWith(isLoading: true));
    try {
      final user = await _repo.login(event.email, event.password);
      emit(state.copyWith(isLoading: false, user: user));
    } catch (e) {
      emit(state.copyWith(isLoading: false, error: e.toString()));
    }
  }
}
```

## Cubit pattern (simpler)

```dart
class CounterCubit extends Cubit<int> {
  CounterCubit() : super(0);
  void increment() => emit(state + 1);
  void decrement() => emit(state - 1);
}
```

## Multi-bloc composition

- `BlocProvider`: provide a bloc to the widget tree
- `BlocBuilder`: rebuild on state changes
- `BlocListener`: trigger side effects on state changes (navigation, snackbar)
- `BlocConsumer`: combines Builder + Listener
- `BlocSelector`: rebuild only when selected value changes (performance)

## Anti-patterns

- Business logic inside widgets (move to Bloc/Cubit)
- God-blocs that manage unrelated state (split by feature)
- Emitting duplicate states (Bloc skips duplicate states by default)
- Not handling loading/error states (every state machine needs these)
- Using Bloc for ephemeral UI state (use ValueNotifier or setState)

## Testing

```dart
blocTest<AuthBloc, AuthState>(
  'emits [loading, success] when login succeeds',
  build: () => AuthBloc(mockRepo),
  act: (bloc) => bloc.add(LoginRequested(email: 'a@b.com', password: 'pw')),
  expect: () => [
    AuthState(isLoading: true),
    AuthState(isLoading: false, user: mockUser),
  ],
);
```

## REST API integration pattern

```dart
// State: sealed class for loading/success/error
sealed class DataState<T> {}
class DataLoading<T> extends DataState<T> {}
class DataSuccess<T> extends DataState<T> { final T data; }
class DataError<T> extends DataState<T> { final String message; }
```
