// ============================================================
// CONTENT COLLECTIONS: the typed shape of all site content.
//
// Two collections, both loaded from the filesystem with the `glob` loader:
//   sections: one YAML data file per subject (no body)
//   entries:  one MDX file per writeup (frontmatter + article body)
//
// Zod validates every file's frontmatter at build time. A missing or
// wrong-typed field FAILS `astro build` loudly. That is the guardrail, not
// a nicety. (tests/ feeds a deliberately-broken object to prove it rejects.)
//
// Note on slugs: the glob loader derives a stable `id` from each filename
// (e.g. vlans.mdx -> "vlans"). We use that id as the URL slug rather than a
// separate hand-typed `slug` field, so a file can never disagree with its
// own route.
// ============================================================
import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

const sections = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/sections' }),
  schema: z.object({
    /** Display name, e.g. "Home Lab". */
    name: z.string(),
    /** Display order on the Home grid (1-based). */
    order: z.number().int().positive(),
    /** The mono tag on the card, e.g. "NET / INFRA". */
    label: z.string(),
    /** Drives card styling and the home "active" tally. */
    status: z.enum(['active', 'in-progress', 'soon']),
    /** Card description on Home (short). */
    summary: z.string(),
    /**
     * Section-landing intro paragraph (longer than `summary`).
     * Schema extension beyond the brief. The prototype's section page shows
     * a richer intro than the home card. Flagged for sign-off.
     */
    intro: z.string(),
  }),
});

const entries = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/entries' }),
  schema: z.object({
    /** Article title. */
    title: z.string(),
    /** Which subject this entry belongs to (references a sections id). */
    section: reference('sections'),
    /** Order within its section (1-based). Also drives prev/next. */
    order: z.number().int().positive(),
    /** Display status badge. Distinct from `draft` (see below). */
    status: z.enum(['published', 'in-progress', 'draft']),
    /** Optional override for the .doc-kicker line; derived if omitted. */
    kicker: z.string().optional(),
    /** The .standfirst intro sentence on the article. */
    standfirst: z.string(),
    /**
     * Short teaser shown as the lesson-row description on the section index.
     * Schema extension beyond the brief. Distinct from `standfirst`, which
     * is the longer article opener. Flagged for sign-off.
     */
    description: z.string(),
    /**
     * Estimated read time in minutes. Schema extension beyond the brief,
     * the prototype displays per-lesson read times and a section "Min Total".
     * Flagged for sign-off.
     */
    minutes: z.number().int().positive(),
    /** First published date. */
    date: z.coerce.date(),
    /** Last meaningful update, if any. Feeds the derived REV date. */
    updated: z.coerce.date().optional(),
    /** Free-form tags. */
    tags: z.array(z.string()).optional(),
    /** GitHub link for code projects. */
    repo: z.string().url().optional(),
    /** Cross-link to a deeper Substack piece. */
    substack: z.string().url().optional(),
    /**
     * Build-exclusion switch (orthogonal to `status`): true removes the
     * entry from the production build entirely. `status` only changes the
     * visible badge; `draft` controls whether the page exists at all.
     */
    draft: z.boolean().default(false),
  }),
});

export const collections = { sections, entries };
