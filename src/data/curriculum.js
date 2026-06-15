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
    blurb: 'From the cascade and selectors to Flexbox, Grid, responsive media queries, layers, and modern CSS.',
    ready: true
  },
  {
    id: 'sass',
    label: 'Sass',
    badge: 'S',
    title: 'Sass / SCSS',
    blurb: 'Preprocessor superpowers — variables, nesting, functions, mixins — plus styling AEM components: clientlibs, BEM, architecture, and best practices.',
    ready: true
  },
  {
    id: 'js',
    label: 'JavaScript',
    badge: 'J',
    title: 'JavaScript',
    blurb: 'Core language, modern ES, the Netcentric component-loader patterns, and AEM front-end best practices.',
    ready: true
  },
  {
    id: 'unit-testing',
    label: 'Unit Testing',
    badge: 'T',
    title: 'Unit Testing',
    blurb: 'Front-end unit testing with Jest: structure, matchers, mocking, async, DOM testing, and coverage.',
    ready: true
  },
  {
    id: 'web-performance',
    label: 'Web Performance',
    badge: '🚀',
    title: 'Web Performance',
    blurb: 'Make pages fast: the critical rendering path, resource loading, hints, images, fonts, and lazy-loading — plus a hands-on challenge.',
    ready: true
  },
  {
    id: 'aem-advanced',
    label: 'Advanced AEM',
    badge: '⚡',
    title: 'Advanced AEM',
    blurb: 'Author→publish replication, DAM assets, metadata & renditions, workflows, Multi-Site Management live copies, and managing permissions as code with the AC Tool.',
    ready: true
  },
  {
    id: 'copilot',
    label: 'Copilot',
    badge: '🤖',
    title: 'GitHub Copilot for AEM',
    blurb: 'Use Copilot efficiently as an AEM front-end / full-stack dev: completions, Chat, context, custom instructions, and AEM-specific workflows — with the review habits that keep it safe.',
    ready: true,
    hidden: true // temporarily hidden from nav + home grid; route still works
  }
];

export function getTrack(id) {
  return TRACKS.find(function (t) { return t.id === id; });
}
