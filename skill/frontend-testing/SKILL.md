---
name: frontend-testing
description: "Frontend testing patterns. Use when the user says 'Jest', 'Vitest', 'React Testing Library', 'Playwright', 'Cypress', 'MSW', 'unit test', or 'E2E'."
---

# Frontend Testing

## Test pyramid

| Level | Tool | What | Speed |
|-------|------|------|-------|
| Unit | Jest/Vitest | Components, hooks, utils | Fast |
| Integration | RTL | Component + API interaction | Medium |
| E2E | Playwright/Cypress | Full user flows | Slow |

## React Testing Library

```tsx
import { render, screen, fireEvent } from '@testing-library/react';

test('increments counter', async () => {
  render(<Counter />);
  fireEvent.click(screen.getByRole('button', { name: /increment/i }));
  expect(screen.getByText('1')).toBeInTheDocument();
});
```

### Principles
- Test behavior, not implementation
- Use `getByRole`, `getByLabelText`, `getByText` (not `getByTestId`)
- `userEvent` over `fireEvent` (more realistic)

## Jest / Vitest

```typescript
describe('calculateTotal', () => {
  it('sums line items', () => {
    expect(calculateTotal([{ price: 10, qty: 2 }, { price: 5, qty: 1 }])).toBe(25);
  });
});
```

## MSW (Mock Service Worker)

```typescript
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  http.get('/api/users', () => {
    return HttpResponse.json([{ id: 1, name: 'Ahmed' }]);
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

## Playwright (E2E)

```typescript
import { test, expect } from '@playwright/test';

test('login flow', async ({ page }) => {
  await page.goto('/login');
  await page.fill('input[name="email"]', 'test@test.com');
  await page.fill('input[name="password"]', 'password');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('/dashboard');
});
```

## Coverage

- Target: >80% on critical paths (auth, payments, data flow)
- Don't chase 100% (diminishing returns)
- Use `--coverage` flag, review uncovered lines

## Pitfalls

- Testing implementation details (test user-visible behavior)
- Flaky E2E tests (use data-testid, wait for network idle)
- Not mocking API calls (tests hit real backend)
- Testing CSS (test structure, not styles)
