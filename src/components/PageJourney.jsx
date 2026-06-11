import { useState } from 'react';

// Interactive "what happens when a browser loads a page" pipeline.
// Click a stage to reveal what the browser does there + a behind-the-scenes
// tip many developers have never thought about. Self-contained; no deps.
const STAGES = [
  {
    key: 'request',
    label: 'Request',
    sub: 'URL → one file',
    what: (
      <>The browser resolves DNS, opens a TCP/TLS connection, and asks the server for <strong>one</strong> thing: the HTML document.</>
    ),
    tip: (
      <>HTML is the only file the browser requests by name. Everything else — CSS, JS, images, fonts — it discovers by <em>reading</em> the HTML. Your document is effectively the page's manifest: nothing loads that the markup (or the files it pulls in) doesn't reference.</>
    )
  },
  {
    key: 'stream',
    label: 'Stream & parse',
    sub: 'bytes → tokens',
    what: (
      <>The browser doesn't wait for the whole file. It tokenizes the HTML <strong>as bytes arrive</strong> and starts building the page incrementally.</>
    ),
    tip: (
      <>A separate <em>preload scanner</em> races ahead of the main parser, peeking at HTML you haven't reached yet to start downloading <code>{'<link>'}</code>/<code>{'<script>'}</code>/<code>{'<img>'}</code> early. That's why the order of resource tags in your source still matters — even on a fast connection.</>
    )
  },
  {
    key: 'dom',
    label: 'Build the DOM',
    sub: 'tree of nodes',
    what: (
      <>The parser turns tokens into the <strong>DOM</strong> — a live tree of node objects the browser (and your JS) work against.</>
    ),
    tip: (
      <>The DOM is <strong>not</strong> your HTML file. The browser silently repairs mistakes — it inserts a <code>{'<tbody>'}</code> you never wrote, closes a forgotten <code>{'</li>'}</code>, moves stray text out of a table. <em>View source</em> shows your bytes; <em>Inspect / Elements</em> shows the DOM the browser built — they can differ.</>
    )
  },
  {
    key: 'cssom',
    label: 'CSS → CSSOM',
    sub: 'render-blocking',
    what: (
      <>Stylesheets are parsed into the <strong>CSSOM</strong>. The browser deliberately holds the first paint until it's ready.</>
    ),
    tip: (
      <>CSS is render-blocking <em>on purpose</em> — to avoid a flash of unstyled content (FOUC). That's the real reason stylesheets belong in <code>{'<head>'}</code>: the browser would rather wait a few ms than show you the page twice.</>
    )
  },
  {
    key: 'js',
    label: 'JavaScript',
    sub: 'can pause it all',
    what: (
      <>When the parser meets a plain <code>{'<script>'}</code> it <strong>stops</strong>, downloads, runs it, then resumes — because JS can rewrite the DOM mid-parse.</>
    ),
    tip: (
      <>The one most devs never picture: a <code>{'<script src>'}</code> in the middle of the body <strong>freezes</strong> DOM construction for everything below it. <code>defer</code> (run after parsing, in order), <code>async</code> (run ASAP), and <code>type="module"</code> (deferred) exist precisely to stop that. Default behaviour is blocking.</>
    )
  },
  {
    key: 'render',
    label: 'Render → Paint',
    sub: 'DOM + CSSOM',
    what: (
      <>The <strong>render tree</strong> combines visible nodes with their styles; <strong>layout</strong> computes geometry; <strong>paint</strong> fills pixels.</>
    ),
    tip: (
      <><code>display:none</code> removes a node from the render tree entirely (no box, never measured); <code>visibility:hidden</code> keeps its box and still takes space. Changing geometry forces a <em>reflow</em> (recompute layout) — far costlier than a <em>repaint</em>. Animating <code>transform</code>/<code>opacity</code> skips layout; animating <code>top</code>/<code>width</code> doesn't.</>
    )
  },
  {
    key: 'interactive',
    label: 'On screen',
    sub: 'visible ≠ ready',
    what: (
      <>Pixels appear — but event handlers may not be wired up yet, and assistive tech reads a parallel tree.</>
    ),
    tip: (
      <>The <strong>accessibility tree</strong> is built from your semantics alongside the DOM — screen readers read <em>that</em>, not your CSS. Solid, semantic HTML means the page is usable and accessible the instant it paints, before a single line of JS runs.</>
    )
  }
];

export default function PageJourney() {
  const [active, setActive] = useState(0);
  const s = STAGES[active];

  function onKey(e) {
    if (e.key === 'ArrowRight') { setActive((i) => Math.min(i + 1, STAGES.length - 1)); e.preventDefault(); }
    if (e.key === 'ArrowLeft') { setActive((i) => Math.max(i - 1, 0)); e.preventDefault(); }
  }

  return (
    <div className="journey">
      <ol className="journey__steps" onKeyDown={onKey} role="tablist" aria-label="Page load pipeline">
        {STAGES.map((stage, i) => (
          <li key={stage.key} className="journey__step">
            <button
              type="button"
              role="tab"
              aria-selected={i === active}
              className={'journey__chip' + (i === active ? ' is-active' : '')}
              onClick={() => setActive(i)}
            >
              <span className="journey__num">{i + 1}</span>
              <span className="journey__chiptext">
                <span className="journey__chiplabel">{stage.label}</span>
                <span className="journey__chipsub">{stage.sub}</span>
              </span>
            </button>
          </li>
        ))}
      </ol>

      <div className="journey__detail" role="tabpanel">
        <h4 className="journey__title"><span className="journey__titlenum">{active + 1}</span> {s.label}</h4>
        <p className="journey__what">{s.what}</p>
        <div className="journey__tip"><span className="journey__tiplabel">💡 Did you know?</span> {s.tip}</div>
      </div>
    </div>
  );
}
