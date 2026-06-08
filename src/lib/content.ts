// content.ts: thin glue over Astro's content collections.
//
// Centralizes two things the page templates would otherwise repeat:
//   1. draft exclusion: draft:true entries are dropped from PRODUCTION
//      builds only (still visible in `astro dev` so you can preview them).
//   2. ordering + section grouping.
//
// This file imports astro:content, so it is not unit-tested (it's glue, per
// the brief's "skip tests for trivial glue"). The real logic it leans on,
// pager and counts, lives in pure, tested modules.
import { getCollection, type CollectionEntry } from 'astro:content';
import { latestDate, formatRev } from './counts';

export type Section = CollectionEntry<'sections'>;
export type Entry = CollectionEntry<'entries'>;

/** All sections, sorted by display order. */
export async function getSections(): Promise<Section[]> {
  const sections = await getCollection('sections');
  return sections.sort((a, b) => a.data.order - b.data.order);
}

/**
 * All entries that should appear in the current build. draft:true entries are
 * excluded from production but kept in dev for previewing.
 */
export async function getVisibleEntries(): Promise<Entry[]> {
  const entries = await getCollection('entries');
  return entries.filter((entry) => !(entry.data.draft && import.meta.env.PROD));
}

/** The visible entries belonging to one section, in order. */
export function entriesInSection(entries: Entry[], sectionId: string): Entry[] {
  return entries
    .filter((entry) => entry.data.section.id === sectionId)
    .sort((a, b) => a.data.order - b.data.order);
}

/** Zero-padded two-digit string, e.g. 2 -> "02". Used for designations. */
export function pad2(n: number): string {
  return String(n).padStart(2, '0');
}

/**
 * The site REV string ("YYYY.MM") derived from the newest entry date, or null
 * if there are no entries yet (caller decides what to show in that case).
 */
export function revString(entries: Entry[]): string | null {
  if (entries.length === 0) return null;
  const dates = entries.map((e) => e.data.updated ?? e.data.date);
  return formatRev(latestDate(dates));
}
