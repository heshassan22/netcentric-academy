// Track registry. Order here drives the header nav and the home page grid.
// `ready: false` renders a "coming soon" page.
//
// Tracks with `group: '<id>'` are NOT shown at the top level — they live inside
// the group track (e.g. the "BE" backend landing). A track with `isGroup: true`
// renders a landing page listing its member tracks instead of lessons.
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

  // ── BE (Backend) — a landing that groups the backend-developer modules ──
  {
    id: 'be',
    label: 'BE',
    badge: '☕',
    title: 'Backend (BE)',
    blurb: 'AEM from the backend developer perspective: Advanced AEM, Java, Sling Models & components, Core Components, unit testing, context-aware configuration, Groovy scripting, workflows, Sling Jobs, and ACS Commons.',
    ready: true,
    isGroup: true
  },
  {
    id: 'aem-advanced',
    group: 'be',
    groupOrder: 1,
    label: 'Advanced AEM',
    badge: '⚡',
    title: 'Advanced AEM',
    blurb: 'Author→publish replication, DAM assets & renditions, workflows, MSM live copies, permissions as code (AC Tool), plus the dev/ops backbone: dispatcher, OSGi & run modes, packages & deployment, and Oak querying/indexing.',
    ready: true
  },
  {
    id: 'java',
    group: 'be',
    groupOrder: 2,
    label: 'Java',
    badge: 'Jv',
    title: 'Java',
    blurb: 'Java language best practices and pitfalls for AEM developers: collections, equals/hashCode vs Comparable, interfaces vs abstract classes, the Streams API, and debugging.',
    ready: true
  },
  {
    id: 'sling-models',
    group: 'be',
    groupOrder: 3,
    label: 'Sling Models',
    badge: 'SM',
    title: 'Sling Models & Component Creation',
    blurb: 'Build robust components with Sling Models: adaptation, injection annotations, constructor vs @Activate, request vs resource adaptables, deployment, OSGi services and configurations.',
    ready: true
  },
  {
    id: 'core-components',
    group: 'be',
    groupOrder: 4,
    label: 'Core Components',
    badge: 'CC',
    title: 'Core Components',
    blurb: 'Reuse the Sling Models from Adobe Core Components in your extended components — model composition / delegation — and set up unit testing for them.',
    ready: true
  },
  {
    id: 'aem-unit-testing',
    group: 'be',
    groupOrder: 5,
    label: 'Unit Testing',
    badge: '🧪',
    title: 'Unit Testing (AEM)',
    blurb: 'Test AEM Java code with JUnit, Mockito and the AEM Mocks (io.wcm / wcm.io) — AemContext, mocking resources and services, and best practices.',
    ready: true
  },
  {
    id: 'context-aware-config',
    group: 'be',
    groupOrder: 6,
    label: 'Context-Aware Config',
    badge: 'CA',
    title: 'Context-Aware Configuration',
    blurb: 'What Context-Aware Configuration is and how to use it: the OSGi-annotation API, context-aware resources and configs, unit testing, and the wcm.io CAC editor.',
    ready: true
  },
  {
    id: 'groovy',
    group: 'be',
    groupOrder: 7,
    label: 'Groovy',
    badge: 'Gr',
    title: 'Scripting / Groovy Console',
    blurb: 'Use the AEM Groovy Console to script content modifications: a quick Groovy primer, installing the console, and writing safe bulk-update scripts.',
    ready: true
  },
  {
    id: 'workflows',
    group: 'be',
    groupOrder: 8,
    label: 'Workflows',
    badge: 'WF',
    title: 'Workflows',
    blurb: 'How AEM workflows work, designing your own in the editor, and extending them with custom Java workflow processes — plus best practices.',
    ready: true
  },
  {
    id: 'sling-jobs',
    group: 'be',
    groupOrder: 9,
    label: 'Sling Jobs',
    badge: 'SJ',
    title: 'Sling Jobs',
    blurb: 'Run asynchronous background processing in AEM: the Sling Job API, registering jobs, job consumers, scheduled vs immediate, and queue configuration.',
    ready: true
  },
  {
    id: 'acs-commons',
    group: 'be',
    groupOrder: 10,
    label: 'ACS Commons',
    badge: 'AC',
    title: 'ACS AEM Commons',
    blurb: 'What ACS AEM Commons is, how to deploy it, and a tour of the most useful tools and features it adds to a project.',
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

// Member tracks of a group (e.g. the BE backend modules), in display order.
export function getGroupMembers(groupId) {
  return TRACKS.filter(function (t) { return t.group === groupId; }).sort(
    function (a, b) { return (a.groupOrder || 0) - (b.groupOrder || 0); }
  );
}

// Top-level tracks for nav + home grid: not hidden, and not nested in a group.
export function getTopLevelTracks() {
  return TRACKS.filter(function (t) { return !t.hidden && !t.group; });
}
