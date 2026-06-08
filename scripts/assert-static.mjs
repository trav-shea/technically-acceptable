// assert-static.mjs — tripwire against accidental SSR output.
//
// This site is committed to a PURE STATIC build (no SSR adapter) — see the
// build brief §9 and README "Deploy". If something adds an adapter (e.g. a
// stray `astro add cloudflare`, or a Cloudflare *Workers* project template),
// the build starts emitting a worker + a server bundle into dist/. This
// script fails the build loudly the moment that happens, so the drift can't
// ship silently.
//
// Zero dependencies, runs as the `postbuild` npm script.
import { existsSync } from 'node:fs';
import { join } from 'node:path';

const dist = 'dist';

// The signatures of an SSR/worker build. Pure static output contains none.
const offenders = [
  { label: 'dist/_worker.js', path: join(dist, '_worker.js') },
  { label: 'dist/server/', path: join(dist, 'server') },
];

const found = offenders.filter((o) => existsSync(o.path));

if (found.length > 0) {
  console.error('\n[assert-static] FAIL — SSR/worker artifacts found in dist/:');
  for (const o of found) console.error(`  - ${o.label}`);
  console.error(
    '\nThis project must build to pure static HTML (no SSR adapter).\n' +
      'An adapter was almost certainly added. To fix:\n' +
      '  1. Remove the adapter import + `output: "server"` from astro.config.mjs\n' +
      '  2. `npm uninstall @astrojs/cloudflare` (or whichever adapter)\n' +
      '  3. Delete any wrangler.jsonc / KV bindings\n' +
      'If you INTEND to switch to SSR, update the brief and remove this guard\n' +
      'deliberately — do not bypass it silently.\n',
  );
  process.exit(1);
}

console.log('[assert-static] ok — dist/ is pure static (no _worker.js, no server/).');
