// Client-side search over all lesson content. The index is generated at
// build time from the raw MDX (scripts/gen-search-index.mjs → search-index.json)
// — reading the files directly, so it matches anything in a lesson, prose or
// code, including `@forward` inside a fenced block.
import { getTrack } from '../data/curriculum.js';
import DATA from './search-index.json';

const INDEX = DATA
  .filter((it) => { const t = getTrack(it.track); return !(t && t.hidden); }) // hide hidden tracks
  .map((it) => ({ ...it, trackLabel: (getTrack(it.track) || {}).label || it.track }));

export function search(query) {
  const q = String(query || '').trim();
  if (q.length < 2) return [];
  const needle = q.toLowerCase();
  const out = [];

  for (const it of INDEX) {
    const hay = it.text.toLowerCase();
    let idx = hay.indexOf(needle);
    const titleHit = it.title.toLowerCase().includes(needle);

    if (idx === -1 && !titleHit) continue;

    // count occurrences in the body
    let count = 0;
    if (idx !== -1) {
      let from = 0;
      let i;
      while ((i = hay.indexOf(needle, from)) !== -1) { count++; from = i + needle.length; }
    }

    // snippet around the first body match (or the title if body had none)
    let snippet;
    if (idx !== -1) {
      const start = Math.max(0, idx - 48);
      const end = Math.min(it.text.length, idx + needle.length + 64);
      snippet = it.text.slice(start, end).replace(/\s+/g, ' ').trim();
      if (start > 0) snippet = '… ' + snippet;
      if (end < it.text.length) snippet += ' …';
    } else {
      snippet = 'Matches the lesson title';
    }

    out.push({ track: it.track, slug: it.slug, trackLabel: it.trackLabel, title: it.title, num: it.num, count, titleHit });
    out[out.length - 1].snippet = snippet;
  }

  // most mentions first; title-only matches keep their place by count 0
  out.sort((a, b) => b.count - a.count);
  return out.slice(0, 40);
}
