// pager.ts — prev/next navigation within a section.
//
// Pure and Astro-free: operates on plain objects so it can be unit-tested
// without a build. The page template maps content-collection entries into
// PagerItem[] before calling this.

export interface PagerItem {
  /** URL slug (the entry's file-derived id). */
  slug: string;
  /** Display title shown in the pager. */
  title: string;
  /** Sort key within the section (1-based). */
  order: number;
}

export interface Pager {
  prev: PagerItem | null;
  next: PagerItem | null;
}

/**
 * Given the entries of one section and the current entry's slug, return its
 * previous and next neighbours by `order`. Returns null at each boundary.
 *
 * Fails loudly: throws if `currentSlug` is not among `items`, rather than
 * silently returning {prev:null,next:null} and hiding a wiring bug.
 */
export function getPager(items: PagerItem[], currentSlug: string): Pager {
  const ordered = [...items].sort((a, b) => a.order - b.order);
  const index = ordered.findIndex((item) => item.slug === currentSlug);

  if (index === -1) {
    throw new Error(
      `getPager: current slug "${currentSlug}" is not in the provided items ` +
        `(${ordered.map((i) => i.slug).join(', ') || 'none'}).`,
    );
  }

  return {
    prev: index > 0 ? ordered[index - 1] : null,
    next: index < ordered.length - 1 ? ordered[index + 1] : null,
  };
}
