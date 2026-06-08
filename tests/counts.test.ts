import { describe, it, expect } from 'vitest';
import { entryCount, sumMinutes, latestDate, formatRev } from '../src/lib/counts';

describe('entryCount', () => {
  it('counts the items it is given', () => {
    expect(entryCount([1, 2, 3])).toBe(3);
    expect(entryCount([])).toBe(0);
  });
});

describe('sumMinutes', () => {
  it('sums read-minutes across entries', () => {
    expect(sumMinutes([10, 14, 8])).toBe(32);
  });

  it('is zero for no entries', () => {
    expect(sumMinutes([])).toBe(0);
  });
});

describe('latestDate', () => {
  it('returns the most recent date', () => {
    const dates = [new Date('2026-01-15'), new Date('2026-06-08'), new Date('2026-03-01')];
    expect(latestDate(dates)).toEqual(new Date('2026-06-08'));
  });

  it('throws on an empty list rather than inventing a date', () => {
    expect(() => latestDate([])).toThrow(/zero entries/);
  });
});

describe('formatRev', () => {
  it('formats as YYYY.MM with a zero-padded month', () => {
    expect(formatRev(new Date('2026-06-08T00:00:00Z'))).toBe('2026.06');
    expect(formatRev(new Date('2026-11-20T00:00:00Z'))).toBe('2026.11');
  });
});
