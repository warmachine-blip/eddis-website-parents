// Fails the build when a rendered <title> or meta description runs past what
// Google will display. Seven descriptions and seven titles had drifted over,
// one edit at a time, with nothing to catch them.
//
// Runs as `postbuild` rather than `prebuild` deliberately. The values checked
// here only exist once Next has resolved them: the title template in
// layout.tsx, the per-route metadata, and the lib data behind the condition,
// service, location and blog routes are combined at render time. Checking
// before the build would mean re-implementing that resolution and letting the
// copy drift from it. Reading the prerendered HTML measures exactly what ships.
//
// A failing postbuild exits non-zero, so `npm run build` fails and nothing
// deploys.
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const BUILD = ".next/server/app";

/** Google truncates around 580px of title and 920px of description; these are
 *  the usual character approximations of that. */
const LIMITS = { title: 60, description: 160 };

const ENTITIES = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };
const decode = (s) =>
  s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&([a-z]+);/gi, (m, name) => ENTITIES[name.toLowerCase()] ?? m);

function htmlFiles(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    // Next's own error pages are not indexed; skip them and their segment dirs.
    if (entry.name.startsWith("_")) continue;
    const path = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...htmlFiles(path));
    else if (entry.name.endsWith(".html")) out.push(path);
  }
  return out;
}

if (!existsSync(BUILD)) {
  console.warn(`[check-metadata] no prerendered output at ${BUILD}; nothing checked`);
  process.exit(0);
}

const files = htmlFiles(BUILD);
if (files.length === 0) {
  console.warn(`[check-metadata] no HTML under ${BUILD}; nothing checked`);
  process.exit(0);
}

const failures = [];
for (const file of files) {
  const html = readFileSync(file, "utf8");
  const route = "/" + file.slice(BUILD.length + 1, -".html".length).replace(/^index$/, "");
  const found = {
    title: html.match(/<title>([^<]*)<\/title>/)?.[1],
    description: html.match(/<meta name="description" content="([^"]*)"/)?.[1],
  };
  for (const [field, limit] of Object.entries(LIMITS)) {
    if (found[field] === undefined) continue;
    const text = decode(found[field]);
    if (text.length > limit) failures.push({ route, field, len: text.length, limit, text });
  }
}

if (failures.length > 0) {
  failures.sort((a, b) => b.len - a.len);
  console.error(`\n[check-metadata] ${failures.length} over the display limit:\n`);
  for (const f of failures) {
    console.error(`  ${f.route}`);
    console.error(`    ${f.field}: ${f.len} chars, limit ${f.limit} (${f.len - f.limit} over)`);
    console.error(`    ${f.text}\n`);
  }
  console.error(`Shorten each above, then rebuild. Limits live in scripts/check-metadata.mjs.\n`);
  process.exit(1);
}

console.log(
  `[check-metadata] ${files.length} routes: all titles ≤ ${LIMITS.title}, descriptions ≤ ${LIMITS.description}`
);
