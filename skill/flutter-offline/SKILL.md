---
name: flutter-offline
description: "Offline storage and sync for Flutter. Use when the user says 'offline', 'Hive', 'SQLite', 'Isar', 'local database', 'cache', or 'sync'."
---

# Flutter Offline Storage

## Storage options

| Library | Type | Best for |
|---------|------|----------|
| **Hive** | Key-value | Simple caching, preferences, fast reads |
| **SQLite** (sqflite/drift) | Relational | Complex queries, relations, structured data |
| **Isar** | NoSQL | High performance, full-text search, large datasets |
| **Shared Preferences** | Key-value | Tiny config flags only |

## Hive (key-value)

```dart
final box = await Hive.openBox<User>('users');
await box.put('current', user);
final user = box.get('current');
```

## SQLite with Drift (type-safe)

```dart
@DriftDatabase(tables: [Users, Posts])
class AppDatabase extends _$AppDatabase {
  AppDatabase() : super(_openConnection());
  @override int get schemaVersion => 1;
}
```

## Offline-first patterns

1. **Cache-first**: show cached data, fetch fresh in background, update UI
2. **Network-first**: fetch, fallback to cache on failure
3. **Sync**: queue writes when offline, replay when online

## Conflict resolution

- **Last-write-wins**: simple, risk of data loss
- **Version vectors**: detect concurrent edits, merge or prompt user
- **Operational transforms**: complex, for collaborative editing

## Sync implementation

```dart
class SyncManager {
  final _pendingOps = <Operation>[];
  
  Future<void> sync() async {
    if (!await isConnected()) return;
    for (final op in _pendingOps.toList()) {
      try {
        await _api.execute(op);
        _pendingOps.remove(op);
      } catch (_) { break; } // retry next time
    }
  }
}
```

## Pitfalls

- Not handling database migrations (use drift's migration strategy)
- Loading all data into memory (use pagination/stream)
- Not disposing database connections
- Ignoring platform differences (iOS may kill background tasks)
