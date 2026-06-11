import { useState } from 'react';

// Interactive Flexbox / Grid lab: toggle each property with chips (and, for the
// grid templates, type any value) and watch the boxes react. Pass mode="flex"
// or mode="grid". Self-contained, no deps.
//
// Each control: { prop } is the React inline-style key (camelCase), { css } is
// the CSS property name shown in the generated snippet, { options } are preset
// values, { editable } adds a free-text input that accepts any value.

const FLEX_CONTROLS = [
  { prop: 'flexDirection', css: 'flex-direction', options: ['row', 'row-reverse', 'column', 'column-reverse'] },
  { prop: 'justifyContent', css: 'justify-content', options: ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'] },
  { prop: 'alignItems', css: 'align-items', options: ['stretch', 'flex-start', 'center', 'flex-end', 'baseline'] },
  { prop: 'flexWrap', css: 'flex-wrap', options: ['nowrap', 'wrap', 'wrap-reverse'] },
  { prop: 'gap', css: 'gap', options: ['0', '8px', '16px', '24px'] }
];

const GRID_CONTROLS = [
  { prop: 'gridTemplateColumns', css: 'grid-template-columns', editable: true, options: ['repeat(3, 1fr)', 'repeat(4, 1fr)', '120px 1fr', '1fr 2fr', 'repeat(3, 80px)', 'repeat(auto-fit, minmax(60px, 1fr))'] },
  { prop: 'gridTemplateRows', css: 'grid-template-rows', editable: true, options: ['', 'repeat(2, 60px)', '80px 1fr', 'repeat(2, 1fr)'] },
  { prop: 'gap', css: 'gap', options: ['0', '8px', '16px', '24px'] },
  { prop: 'gridAutoFlow', css: 'grid-auto-flow', options: ['row', 'column', 'dense'] },
  { prop: 'justifyItems', css: 'justify-items', options: ['stretch', 'start', 'center', 'end'] },
  { prop: 'alignItems', css: 'align-items', options: ['stretch', 'start', 'center', 'end'] },
  { prop: 'justifyContent', css: 'justify-content', options: ['start', 'center', 'end', 'space-between', 'space-around', 'space-evenly', 'stretch'] },
  { prop: 'alignContent', css: 'align-content', options: ['start', 'center', 'end', 'space-between', 'space-around', 'space-evenly', 'stretch'] }
];

const PALETTE = ['#6b2fb3', '#9b6dd6', '#2f8fb3', '#b3692f', '#2fb37a', '#b32f6b', '#5a5fb3', '#b3a72f'];

export default function LayoutLab({ mode = 'flex' }) {
  const controls = mode === 'grid' ? GRID_CONTROLS : FLEX_CONTROLS;
  const [vals, setVals] = useState(() => {
    const o = {};
    controls.forEach((c) => { o[c.prop] = c.options[c.prop === 'gap' ? 2 : 0]; });
    if (mode === 'flex') { o.justifyContent = 'space-between'; o.alignItems = 'center'; }
    return o;
  });
  const [count, setCount] = useState(mode === 'grid' ? 6 : 5);

  function set(prop, value) { setVals((v) => ({ ...v, [prop]: value })); }

  // Apply only non-empty values as inline styles.
  const applied = {};
  Object.keys(vals).forEach((k) => { if (vals[k] !== '') applied[k] = vals[k]; });
  const containerStyle =
    mode === 'grid'
      ? { display: 'grid', gridAutoRows: '52px', minHeight: '210px', ...applied }
      : { display: 'flex', minHeight: '180px', ...applied };

  // generated CSS snippet — skip empty values and a zero gap
  const selector = mode === 'grid' ? '.grid' : '.flex';
  const lines = [`display: ${mode};`].concat(
    controls
      .filter((c) => vals[c.prop] !== '' && !(c.prop === 'gap' && vals.gap === '0'))
      .map((c) => `${c.css}: ${vals[c.prop]};`)
  );

  const boxes = [];
  for (let i = 0; i < count; i++) {
    const bg = PALETTE[i % PALETTE.length];
    // vary font-size in flex mode so `align-items: baseline` is visible
    const fontSize = mode === 'flex' ? [1, 1.5, 0.85, 1.25, 1, 1.4, 0.9, 1.1][i % 8] + 'rem' : '1rem';
    boxes.push(<div key={i} className="lab__box" style={{ background: bg, fontSize }}>{i + 1}</div>);
  }

  return (
    <div className="lab">
      <div className="lab__controls">
        {controls.map((c) => (
          <div className="lab__row" key={c.prop}>
            <span className="lab__prop">{c.css}</span>
            <div className="lab__chips">
              {c.options.map((opt) => (
                <button
                  key={opt || 'auto'}
                  type="button"
                  className={'lab__chip' + (vals[c.prop] === opt ? ' is-active' : '')}
                  onClick={() => set(c.prop, opt)}
                >
                  {opt === '' ? 'auto' : opt}
                </button>
              ))}
              {c.editable && (
                <input
                  className="lab__input"
                  type="text"
                  value={vals[c.prop]}
                  spellCheck={false}
                  placeholder="type any value…"
                  aria-label={'custom ' + c.css}
                  onChange={(e) => set(c.prop, e.target.value)}
                />
              )}
            </div>
          </div>
        ))}
        <div className="lab__row">
          <span className="lab__prop">items</span>
          <div className="lab__chips">
            {[3, 5, 6, 8].map((n) => (
              <button
                key={n}
                type="button"
                className={'lab__chip' + (count === n ? ' is-active' : '')}
                onClick={() => setCount(n)}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="lab__stage" style={containerStyle}>{boxes}</div>

      <pre className="lab__code"><code>{selector} {'{'}
{lines.map((l) => '\n  ' + l)}
{'\n}'}</code></pre>
    </div>
  );
}
