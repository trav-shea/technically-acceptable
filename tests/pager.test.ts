import { describe, it, expect } from 'vitest';
import { getPager, type PagerItem } from '../src/lib/pager';

// Deliberately out of order to prove getPager sorts by `order`, not array order.
const items: PagerItem[] = [
  { slug: 'c', title: 'Third', order: 3 },
  { slug: 'a', title: 'First', order: 1 },
  { slug: 'b', title: 'Second', order: 2 },
];

describe('getPager', () => {
  it('returns null prev at the first entry', () => {
    const { prev, next } = getPager(items, 'a');
    expect(prev).toBeNull();
    expect(next?.slug).toBe('b');
  });

  it('returns both neighbours for a middle entry', () => {
    const { prev, next } = getPager(items, 'b');
    expect(prev?.slug).toBe('a');
    expect(next?.slug).toBe('c');
  });

  it('returns null next at the last entry', () => {
    const { prev, next } = getPager(items, 'c');
    expect(prev?.slug).toBe('b');
    expect(next).toBeNull();
  });

  it('returns null on both sides for a single-entry section', () => {
    const solo: PagerItem[] = [{ slug: 'only', title: 'Only', order: 1 }];
    expect(getPager(solo, 'only')).toEqual({ prev: null, next: null });
  });

  it('throws when the current slug is not in the list (no silent miss)', () => {
    expect(() => getPager(items, 'missing')).toThrow(/not in the provided items/);
  });
});
