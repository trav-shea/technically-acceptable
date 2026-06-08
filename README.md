# Technically Acceptable

A content-driven static site of replicable how-tos and project writeups — the
free, credibility-anchor tier of Imposter Syndrome. Built to last, no trackers.

**Stack:** [Astro](https://astro.build) + MDX + Zod content collections →
static HTML, deployed to Cloudflare **Pages** (static, no SSR).

> Status: in active build. This README is a stub — the full "how to add an
> entry" runbook lands in Phase 5.

## Local development

Prerequisites: **Node 24.16.0** (see `.nvmrc`) and npm.

```bash
npm install      # install dependencies
npm run dev      # local dev server at http://localhost:4321
npm run build    # build static site into dist/ (runs the static-output guard)
npm run preview  # serve the built dist/ locally
npm test         # run unit tests (vitest)
```

## Deploy — Cloudflare Pages (static)

This site is **pure static with no SSR adapter** (build brief §9). Use a
Cloudflare **Pages** project, *not* a Workers/SSR Astro project. Pin these
settings exactly:

| Setting                  | Value                          |
| ------------------------ | ------------------------------ |
| Project type             | **Pages** (static assets)      |
| Framework preset         | **Astro**                      |
| Build command            | `npm run build`                |
| Build output directory   | `dist`                         |
| `NODE_VERSION` (env var) | `24.16.0` (matches `.nvmrc`)   |
| Adapter                  | **none**                       |
| KV / D1 / bindings       | **none** (no `SESSION` KV)     |
| `wrangler.jsonc`         | **none**                       |

### Do not use the Workers / SSR template

Creating the project as a Cloudflare **Workers** Astro app (dashboard
"Workers → Astro", or `npm create cloudflare@latest -- --framework=astro`)
scaffolds the `@astrojs/cloudflare` adapter, sets `output: 'server'`, writes a
`wrangler.jsonc`, and auto-provisions a `SESSION` KV namespace. That produces
`dist/_worker.js` + `dist/server/` instead of plain static files and **will
break this deploy**. If you see those artifacts, you're on the SSR template —
recreate the project as Pages (static) with the settings above.

### Build guard

`npm run build` runs `scripts/assert-static.mjs` afterward (`postbuild`). It
fails the build if `dist/_worker.js` or `dist/server/` ever appears — a cheap
tripwire so an adapter can't sneak SSR in unnoticed, locally or in CI.
