---
name: frontend-deployment
description: "Frontend deployment and hosting. Use when the user says 'Vercel', 'Netlify', 'Docker static', 'preview deployment', 'CI/CD frontend', or 'build'."
---

# Frontend Deployment

## Vercel (recommended for Next.js)

- Zero-config: connect Git repo, auto-deploys on push
- Preview deployments: every PR gets a unique URL
- Environment variables: set in Vercel dashboard
- Custom domain: add in Settings > Domains

## Docker (self-hosted)

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/out /usr/share/nginx/html
EXPOSE 80
```

## CI/CD

```yaml
# GitHub Actions
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npm run typecheck
      - run: npm run lint
      - run: npm test
      - run: npm run build
      - run: npx vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
```

## Build optimization

- Bundle analysis: `npx @next/bundle-analyzer`
- Tree shaking: remove unused imports
- Code splitting: dynamic `import()` for routes/components
- Image optimization: use Next.js `<Image>` component
- Font optimization: `next/font` for self-hosted fonts

## Pitfalls

- Not setting `NODE_ENV=production` in builds
- Missing environment variables in CI
- Not testing the build locally before pushing
- Forgetting to update build command when framework changes
