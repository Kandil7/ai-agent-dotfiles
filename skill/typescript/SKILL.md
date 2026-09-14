---
name: typescript
description: "TypeScript patterns. Use when the user says 'typescript', 'type', 'interface', 'generic', 'utility type', 'type narrowing', 'discriminated union', or 'Zod'."
---

# TypeScript

## Strict mode (always)

```json
{ "compilerOptions": { "strict": true } }
```

## Types vs interfaces

- **Interface**: extendable, declaration merging, use for object shapes
- **Type**: unions, intersections, mapped types, use for everything else
- When in doubt: use `type`

## Discriminated unions

```typescript
type Result<T> =
  | { success: true; data: T }
  | { success: false; error: string };

function handle(result: Result<User>) {
  if (result.success) {
    console.log(result.data.name); // TS knows data exists
  } else {
    console.error(result.error);
  }
}
```

## Utility types

| Type | Purpose |
|------|---------|
| `Partial<T>` | All properties optional |
| `Required<T>` | All properties required |
| `Pick<T, K>` | Subset of properties |
| `Omit<T, K>` | All except listed properties |
| `Record<K, V>` | Object with key type K and value type V |
| `Readonly<T>` | Immutable properties |
| `ReturnType<F>` | Extract return type of function |
| `Parameters<F>` | Extract parameter types |

## Generics

```typescript
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

interface Repository<T> {
  findById(id: string): Promise<T>;
  save(entity: T): Promise<void>;
}
```

## Type narrowing

```typescript
function process(value: string | number) {
  if (typeof value === 'string') {
    return value.toUpperCase();
  }
  return value.toFixed(2);
}
```

## Zod validation (runtime + compile-time)

```typescript
import { z } from 'zod';

const UserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  age: z.number().int().positive(),
});

type User = z.infer<typeof UserSchema>; // type from schema

const result = UserSchema.safeParse(data);
if (result.success) {
  // result.data is typed as User
}
```

## Pitfalls

- Using `any` (use `unknown` and narrow)
- Not using `as const` for literal types
- Ignoring strict null checks
- Not validating runtime data (use Zod)
- Over-complicating types (simpler is better)
