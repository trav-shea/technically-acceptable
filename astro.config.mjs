// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// Pure static site (no SSR adapter). Output is plain HTML in dist/.
// `site` is intentionally left unset until Phase 3, when the sitemap and RSS
// integrations need a real canonical URL. Setting a fake placeholder now would
// be a silent lie that leaks into generated <link> tags — so it stays absent
// and loud-by-omission until the domain is decided.

// Shiki theme mapped to the approved oxide-amber palette (field-notes.css
// tokens). Code is highlighted at build time via fenced ```lang blocks, which
// preserve whitespace exactly (Python-safe). Token *assignment* is grammar-
// based, so the distribution differs slightly from the prototype's hand-
// annotation, but the colours are the same palette.
const codeTheme = {
  name: 'technically-acceptable',
  type: 'dark',
  colors: {
    'editor.background': '#0d0c0b', // --bg-inset
    'editor.foreground': '#e9e4d8', // --ink
  },
  settings: [
    { scope: ['comment', 'punctuation.definition.comment'], settings: { foreground: '#6a655b' } }, // --ink-faint
    { scope: ['string', 'string.quoted', 'constant.other.symbol'], settings: { foreground: '#c8a96a' } }, // c-str tan
    {
      scope: ['keyword', 'keyword.control', 'storage.type', 'storage.modifier', 'entity.name.function', 'support.function'],
      settings: { foreground: '#df8042' }, // --accent-bright
    },
    { scope: ['variable', 'variable.parameter', 'constant.numeric', 'constant.language', 'support.type', 'entity.name.tag'], settings: { foreground: '#9b958a' } }, // --ink-dim
    { scope: ['punctuation', 'meta.brace', 'keyword.operator'], settings: { foreground: '#9b958a' } },
  ],
};

export default defineConfig({
  // site: 'https://<decided-in-phase-3>',
  integrations: [mdx()],
  markdown: {
    shikiConfig: {
      theme: codeTheme,
      wrap: false,
    },
  },
});
