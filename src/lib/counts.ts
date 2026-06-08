// counts.ts — derived tallies and the REV date.
//
// Pure and Astro-free. The brief's hard rule: counts and dates are derived
// from content at build time, never typed by hand. These helpers are where
// that derivation lives; the page templates feed them collection data.

/** Count items, e.g. published entries in a section. Just length, named. */
export function entryCount<T>(items: T[]): number {
  return items.length;
}

/** Sum a numeric field, e.g. read-minutes across a section's entries. */
export function sumMinutes(minutes: number[]): number {
  return minutes.reduce((total, m) => total + m, 0);
}

/**
 * The most recent date across all published entries — the site "REV" date.
 * Each entry contributes its `updated` if present, else its `date`.
 *
 * Fails loudly: throws on an empty list rather than inventing a date. The
 * caller decides what to show when there is genuinely no content yet.
 */
export function latestDate(dates: Date[]): Date {
  if (dates.length === 0) {
    throw new Error('latestDate: cannot derive a REV date from zero entries.');
  }
  return dates.reduce((latest, d) => (d > latest ? d : latest));
}

/** Format a Date as the masthead REV string, e.g. "REV 2026.06". */
export function formatRev(date: Date): string {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  return `${year}.${month}`;
}
