# Quartett

A Next.js app exported as a static site.

**Live: https://dynalon.github.io/synonym-preparation/**

## Development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build
```

The static site is written to `out/`.

## Deployment

Every push to `main` runs [.github/workflows/deploy.yml](.github/workflows/deploy.yml), which builds the site and force-pushes `out/` to the `gh-pages` branch. GitHub Pages serves that branch at the URL above.

Since the site is served from a sub-path, the build sets `NEXT_PUBLIC_BASE_PATH=/synonym-preparation`, which feeds `basePath` in [next.config.ts](next.config.ts). Locally the variable is unset, so the app runs at the root path.

One-time repository setup: Settings → Pages → Source "Deploy from a branch" → branch `gh-pages`, folder `/ (root)`.
