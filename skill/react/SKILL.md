---
name: react
description: "React patterns. Use when the user says 'react', 'hooks', 'useEffect', 'useState', 'component', 'context', 'Suspense', 'server components', or 'React 19'."
---

# React

## Component patterns

```tsx
// Functional component with typed props
interface UserCardProps {
  user: User;
  onSelect: (id: string) => void;
}

function UserCard({ user, onSelect }: UserCardProps) {
  return (
    <div onClick={() => onSelect(user.id)}>
      <h3>{user.name}</h3>
    </div>
  );
}
```

## Hooks

| Hook | Purpose |
|------|---------|
| `useState` | Local state |
| `useEffect` | Side effects (fetch, subscriptions) |
| `useContext` | Consume context without prop drilling |
| `useReducer` | Complex state logic |
| `useMemo` | Memoize expensive computations |
| `useCallback` | Memoize functions (prevent child re-renders) |
| `useRef` | Mutable ref (DOM access, stored values) |

## Rules of hooks

- Only call at top level (never inside loops, conditions, functions)
- Only call from React functions (components, custom hooks)

## Custom hooks

```tsx
function useUser(id: string) {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    fetchUser(id).then(setUser);
  }, [id]);
  return user;
}
```

## Context

```tsx
const ThemeContext = createContext('light');

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Child />
    </ThemeContext.Provider>
  );
}
```

## Performance

- `React.memo()`: skip re-render if props unchanged
- `useMemo`/`useCallback`: prevent unnecessary recalculations
- Code splitting: `React.lazy()` + `Suspense`
- Virtual lists: `react-window` for long lists

## Common pitfalls

- Missing dependency in useEffect array
- Stale closure in useEffect (use ref)
- Not cleaning up subscriptions/timers in useEffect return
- Creating objects/functions in render (causes child re-renders)
- Using index as key for dynamic lists
