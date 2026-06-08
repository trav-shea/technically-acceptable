import { defineConfig } from 'vitest/config';

// Plain Node-environment unit tests for the pure logic in src/lib/.
// These libs deliberately take plain arrays (not Astro collection objects),
// so the tests need no Astro/Vite runtime — just vitest.
export default defineConfig({
  test: {
    include: ['tests/**/*.test.ts'],
  },
});
