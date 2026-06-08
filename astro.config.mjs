// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// Pure static site (no SSR adapter). Output is plain HTML in dist/.
// `site` is intentionally left unset until Phase 3, when the sitemap and RSS
// integrations need a real canonical URL. Setting a fake placeholder now would
// be a silent lie that leaks into generated <link> tags — so it stays absent
// and loud-by-omission until the domain is decided.
export default defineConfig({
  // site: 'https://<decided-in-phase-3>',
  integrations: [mdx()],
});
