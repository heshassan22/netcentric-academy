// Track registry. Order here drives the header nav and the home page grid.
// `ready: false` renders a "coming soon" page.
export const TRACKS = [
  {
    id: 'htl',
    label: 'HTL',
    badge: 'H',
    title: 'HTML Template Language',
    blurb: 'HTL (Sightly) — the view layer of AEM. Lessons plus a hands-on REPL assignment.',
    ready: true
  },
  {
    id: 'component-creation',
    label: 'Components',
    badge: '⚙',
    title: 'AEM Component Creation',
    blurb: 'Build an AEM component end to end: structure, dialog, clientlibs, policies, Style System.',
    ready: true
  },
  {
    id: 'html',
    label: 'HTML',
    badge: '<>',
    title: 'HTML',
    blurb: 'From the document skeleton to semantic structure, forms, media, embeds, and accessible, valid HTML5.',
    ready: true
  },
  {
    id: 'css',
    label: 'CSS',
    badge: 'C',
    title: 'CSS',
    blurb: 'From the cascade and selectors to Flexbox, Grid, container queries, layers, and modern CSS.',
    ready: true
  },
  {
    id: 'sass',
    label: 'Sass',
    badge: 'S',
    title: 'Sass / SCSS',
    blurb: 'The preprocessor superpowers: variables, operators, nesting, functions, and mixins.',
    ready: true
  },
  {
    id: 'js',
    label: 'JavaScript',
    badge: 'J',
    title: 'JavaScript',
    blurb: 'Core language, modern ES features, and the Netcentric component-loader patterns.',
    ready: true
  },
  {
    id: 'unit-testing',
    label: 'Unit Testing',
    badge: 'T',
    title: 'Unit Testing',
    blurb: 'Testing Java (JUnit / AEM Mocks) and front-end code with confidence.',
    ready: false,
    icon: '✅'
  }
];

export function getTrack(id) {
  return TRACKS.find(function (t) { return t.id === id; });
}
