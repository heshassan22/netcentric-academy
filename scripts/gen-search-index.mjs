// Build a search index from the raw MDX of every lesson.
// Run via `npm run index` (wired into dev + build). Reading the files directly
// (instead of a Vite `?raw` glob) avoids the MDX plugin compiling them away.
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const here = dirname(fileURLToPath(import.meta.url));
const CONTENT = join(here, '../src/content');
const OUT = join(here, '../src/lib/search-index.json');

function walk(dir) {
  let out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out = out.concat(walk(p));
    else if (name.endsWith('.mdx')) out.push(p);
  }
  return out;
}

function metaField(raw, key) {
  const m = raw.match(new RegExp(key + ':\\s*(["\'`])([\\s\\S]*?)\\1'));
  return m ? m[2] : '';
}

const index = [];
for (const file of walk(CONTENT)) {
  const raw = readFileSync(file, 'utf8');
  const rel = file.split('/src/content/')[1].replace(/\.mdx$/, '');
  const parts = rel.split('/');
  const track = parts[0];
  const slug = parts.slice(1).join('/');
  const title = metaField(raw, 'title') || slug;
  const num = metaField(raw, 'num');
  const text = raw.replace(/export const meta[\s\S]*?};\s*/, '');
  index.push({ track, slug, title, num, text });
}
index.sort((a, b) => (a.track + a.slug).localeCompare(b.track + b.slug));
writeFileSync(OUT, JSON.stringify(index));
console.log('search-index.json:', index.length, 'lessons');
