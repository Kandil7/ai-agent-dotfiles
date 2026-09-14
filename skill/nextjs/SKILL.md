---
name: nextjs
description: "Next.js App Router patterns. Use when the user says 'nextjs', 'next.js', 'app router', 'server components', 'layouts', 'page.tsx', 'route.ts', 'middleware', or 'Vercel'."
---

# Next.js (App Router)

## File-based routing

```
app/
  layout.tsx           # root layout (wraps all pages)
  page.tsx             # home page (/)
  about/
    page.tsx           # /about
  blog/
    [slug]/
      page.tsx         # /blog/my-post
  dashboard/
    layout.tsx         # nested layout
    settings/
      page.tsx         # /dashboard/settings
```

## Server Components (default)

```tsx
// app/page.tsx — Server Component by default
async function HomePage() {
  const posts = await fetch('https://api.example.com/posts').then(r => r.json());
  return <PostList posts={posts} />;
}
```

- No `"use client"` = Server Component
- Can be async, can fetch data directly
- No hooks, no event handlers (use Client Components for those)

## Client Components

```tsx
"use client";

import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

## Data fetching patterns

- Server Components: `fetch()` directly, cached by default
- Route Handlers: `app/api/.../route.ts` for API endpoints
- Server Actions: mutations from Server Components (no API layer needed)

## Layouts and loading

```tsx
// loading.tsx — shown while page loads
export default function Loading() {
  return <Spinner />;
}

// error.tsx — error boundary
export default function Error({ error, reset }) {
  return <button onClick={reset}>Try again</button>;
}
```

## Middleware

```ts
// middleware.ts (root)
import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token');
  if (!token) return NextResponse.redirect(new URL('/login', request.url));
  return NextResponse.next();
}

export const config = { matcher: ['/dashboard/:path*'] };
```

## Deployment

- Vercel: zero-config, `next start` or `next build` with output: 'standalone'
- Docker: `output: 'standalone'` in next.config.js
- Self-hosted: `npm run build && npm run start`

## Pitfalls

- Using `"use client"` when not needed (loses SSR benefits)
- Fetching in useEffect on the client (use Server Components instead)
- Not using `Suspense` boundaries (loading states)
- Ignoring metadata (use `generateMetadata` for SEO)
