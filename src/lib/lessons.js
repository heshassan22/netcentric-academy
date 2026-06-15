// Discovers every lesson MDX file at build time and groups it by track.
// Each lesson .mdx must `export const meta = { order, title, topics }`.
// Adding a lesson = dropping a new .mdx file in src/content/<track>/.
const files = import.meta.glob('../content/**/*.mdx', { eager: true });

const byTrack = {};
for (const path in files) {
  const m = path.match(/content\/([^/]+)\/(.+)\.mdx$/);
  if (!m) continue;
  const track = m[1];
  const slug = m[2];
  const mod = files[path];
  const meta = mod.meta || {};
  (byTrack[track] || (byTrack[track] = [])).push({
    track,
    slug,
    Component: mod.default,
    order: meta.order ?? 0,
    title: meta.title || slug,
    num: meta.num ?? '',
    topics: meta.topics || ''
  });
}
for (const t in byTrack) {
  byTrack[t].sort((a, b) => a.order - b.order);
}

// Lessons shown in navigation (sidebar, track overview, prev/next).
// Answer pages are excluded everywhere — they're reachable only by direct URL.
export function getLessons(track) {
  return (byTrack[track] || []).filter((l) => !l.slug.endsWith('assignment-answer'));
}
// Resolve a single lesson by slug — includes answer pages, so their URLs still work.
export function getLesson(track, slug) {
  return (byTrack[track] || []).find((l) => l.slug === slug);
}
export function getAdjacent(track, slug) {
  const list = getLessons(track);
  const i = list.findIndex((l) => l.slug === slug);
  return { prev: i > 0 ? list[i - 1] : null, next: i >= 0 && i < list.length - 1 ? list[i + 1] : null };
}
