// ============================================================
// SITE IDENTITY — the single source of truth for site chrome.
//
// Every piece of text that appears in the masthead, status strip, page
// titles, and footer reads from this object. Rename the site, move the
// coordinate, or swap the footer handle in ONE place here — never by
// hand-editing markup across pages.
//
// What this does NOT do (yet): derive entry counts, "active" tallies, or
// the REV date. Those come from content collections at build time in
// Phase 1 and must never be typed in by hand (see the build brief).
// ============================================================

export interface SiteIdentity {
  /** Full brand name. Used in page <title> and as the masthead wordmark. */
  name: string;
  /**
   * The two words of the wordmark, rendered with an accent middot between
   * them (e.g. TECHNICALLY · ACCEPTABLE). Two parts because the design's
   * `.wordmark .em` separator sits between exactly two words.
   */
  wordmarkParts: [string, string];
  /**
   * Short mark for tight spots (e.g. the status-strip badge on narrow
   * screens) where the full two-word wordmark would overflow. Used only
   * where it's needed — not a global rename.
   */
  shortMark: string;
  /** Designation code shown in the status strip and masthead meta. */
  designation: string;
  /** The full designation line in the masthead meta row. */
  designationLine: string;
  /** Status-strip SECTOR coordinate (Abingdon, MD). */
  coordinate: string;
  /** Status-strip STATUS value on the home/index pages. */
  status: string;
  /** Footer handle — rendered as "— {footerHandle}". Parent brand. */
  footerHandle: string;
  /** Home masthead headline. `em` words get the accent color. */
  lede: string;
  /** Home masthead sub-headline. */
  subhead: string;
  /** External links. Empty string = not shown. Filled in as they exist. */
  links: {
    github: string;
    substack: string;
  };
}

export const site: SiteIdentity = {
  name: 'Technically Acceptable',
  wordmarkParts: ['TECHNICALLY', 'ACCEPTABLE'],
  shortMark: 'TA',
  designation: 'TA 1-0',
  designationLine: 'TA 1-0 / FIELD REFERENCE',
  coordinate: '39.4668°N 76.2916°W', // Abingdon, MD
  status: 'OPERATIONAL',
  footerHandle: 'Imposter Syndrome',
  lede: 'Replicable procedures for building and securing real systems.',
  subhead:
    'Not a blog. Each entry is a standalone how-to you can run end to end — read it, replicate it, verify it. Pick a subject to open its index.',
  links: {
    github: '', // TODO: set when the public repo URL exists (Phase 4)
    substack: '', // TODO: set if/when a top-level Substack link is wanted
  },
};
