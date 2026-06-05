# Netcentric Academy

Interactive learning site for the Netcentric Academy tech tracks. Built with
**Vite + React + MDX** so lessons are easy to author and maintain.

## Tracks

| Track | Status |
|-------|--------|
| **HTL** (HTML Template Language / Sightly) | ✅ 7 lessons + hands-on assignment |
| **AEM Component Creation** | ✅ 6 lessons (structure → no-dialog → dialog → clientlibs → policies → Style System) |
| **HTML** | ✅ 10 lessons (fundamentals → DOM/attributes → semantics → text/links → lists/tables → forms → media → iframe → metadata/SEO → standards + capstone) |
| **CSS** | ✅ 9 lessons (cascade → selectors → box model → custom props → responsive/container queries → Flexbox/Grid → transitions → layers/scope → modern CSS) |
| **Sass / SCSS** | ✅ 4 lessons (preprocessor → values/operators → nesting/& → functions/mixins) |
| **JavaScript** | ✅ 6 lessons (basics → modern ES → component loader → params/DOM → events → custom events) |
| **Web Performance** | ✅ 7 lessons (critical rendering path → resource loading → resource hints → images → web fonts → lazy loading → challenge) |
| **Unit Testing** | ✅ 8 lessons (fundamentals → Jest basics → matchers → mocking → async → DOM testing → organization → coverage & quality) |

## Develop

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # static output in dist/
npm run preview    # serve the built dist/
```

`base` is set to `./` so the built `dist/` works from any sub-path or from disk.
Routing uses a hash (`#/htl/01-blocks-tags`), so it also works on plain static hosting
(GitHub Pages, S3) with no rewrite rules.

## How it's structured

```
src/
├── main.jsx               # router + MDXProvider
├── styles/site.css        # design system (light/dark)
├── data/curriculum.js     # TRACKS — drives nav + home grid
├── lib/
│   ├── lessons.js         # auto-discovers content/**/*.mdx
│   └── highlight.js        # tiny syntax highlighter
├── components/            # Layout, Header, Sidebar, Pager, CodeBlock, Tabs, Reveal, Callout, ReplLink
├── pages/                 # Home, TrackOverview, LessonPage, ComingSoon
└── content/
    ├── htl/*.mdx
    └── component-creation/*.mdx
```

## Authoring

**Add a lesson:** drop a new `.mdx` file in `src/content/<track>/`. It must export `meta`:

```mdx
export const meta = { order: 5, num: '05', title: 'My Lesson', topics: 'a · b · c' };

Lesson body in markdown…

<Callout type="do">A tip.</Callout>

<Tabs>
<Tab label="Code">

```html
${some.htl}
```

</Tab>
<Tab label="Result">…</Tab>
</Tabs>
```

The sidebar, nav, pager, and overview update automatically (sorted by `meta.order`).

**Add a track:** add an entry to `TRACKS` in `src/data/curriculum.js` and create
`src/content/<id>/` lessons. Set `ready: false` for a "coming soon" placeholder.

### MDX gotcha
In MDX prose, `{` starts a JSX expression — so write literal HTL (`${...}`) inside
**backtick code spans** or fenced code blocks, never in plain text or `<code>` tags.

## Available MDX components

`<Callout type="note|do|dont|warn">`, `<Tabs><Tab label="…">`, `<Reveal>`, `<ReplLink>`,
and fenced code blocks (auto-styled with a copy button + highlighting).

Content source: the workshop components under `../code/.../components/workshop` and the docs in
`../docs/workshop/`.
