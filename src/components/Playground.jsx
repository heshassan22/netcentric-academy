import { useState, useEffect } from 'react';

// Reusable, self-hosted live playground (a mini-CodePen) for HTML / CSS / JS.
// Authors pass code as template-literal props (a pane appears only for what you pass):
//   <Playground html={`<div class="box">Hi</div>`} css={`.box { color: red; }`} />
//   <Playground html={`<button>Go</button>`} js={`document.querySelector('button')...`} />
//   <Playground html={`<div class="card">Hi</div>`} scss={`$brand:#6b2fb3; .card{ color:$brand; &:hover{opacity:.8} }`} />
// CSS/JS preview live in a sandboxed iframe. SCSS needs compilation, so SCSS playgrounds
// show the editors + an "Open in CodePen" button (CodePen compiles the SCSS).
// Wrapped in <details> so the preview iframe only mounts when opened.

function scriptTag(body) {
  return '<scr' + 'ipt>' + body + '</scr' + 'ipt>';
}

function buildDoc({ html, css, js }) {
  const hasJs = Boolean(js);
  const base =
    ':root{color-scheme:light}body{font-family:system-ui,-apple-system,sans-serif;margin:1rem;color:#1c1c28}' +
    '.__console{margin-top:1rem;border-top:1px dashed #ccc;padding-top:.5rem;font:12px/1.6 ui-monospace,Menlo,Consolas,monospace;white-space:pre-wrap;color:#0a7f5a}';
  const consoleBox = hasJs ? '<div class="__console"></div>' : '';
  const captureScript = hasJs
    ? scriptTag(
        '(function(){var o=document.querySelector(".__console");' +
        '["log","info","warn","error"].forEach(function(m){var f=console[m];console[m]=function(){' +
        'var s=[].map.call(arguments,function(a){try{return typeof a==="object"?JSON.stringify(a):String(a)}catch(e){return String(a)}}).join(" ");' +
        'var d=document.createElement("div");d.textContent=s;if(m==="error")d.style.color="#c0392b";if(m==="warn")d.style.color="#9a6b00";' +
        'o.appendChild(d);if(f)f.apply(console,arguments)};});' +
        'window.addEventListener("error",function(e){console.error(e.message)});})();'
      )
    : '';
  const userJs = hasJs ? scriptTag(js) : '';
  return (
    '<!doctype html><html><head><meta charset="utf-8"><style>' + base + (css || '') + '</style></head><body>' +
    (html || '') + consoleBox + captureScript + userJs +
    '</body></html>'
  );
}

function Editor({ initial, hideHtml, hideJs }) {
  const [html, setHtml] = useState(initial.html || '');
  const [css, setCss] = useState(initial.css || '');
  const [scss, setScss] = useState(initial.scss || '');
  const [js, setJs] = useState(initial.js || '');
  const has = {
    html: initial.html !== null,
    css: initial.css !== null,
    scss: initial.scss !== null,
    js: initial.js !== null
  };
  const livePreview = !has.scss; // SCSS can't be compiled in-browser here → CodePen only

  const [doc, setDoc] = useState(() => buildDoc({ html, css, js }));
  useEffect(() => {
    if (!livePreview) return;
    const id = setTimeout(() => setDoc(buildDoc({
      html: has.html ? html : '', css: has.css ? css : '', js: has.js ? js : ''
    })), 280);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [html, css, js]);

  function reset() {
    setHtml(initial.html || ''); setCss(initial.css || '');
    setScss(initial.scss || ''); setJs(initial.js || '');
  }

  function openInCodePen() {
    // CodePen Prefill API: the preprocessor SOURCE goes in `css`, with css_pre_processor set.
    const data = JSON.stringify({
      title: 'Netcentric Academy — example',
      html: has.html ? html : '',
      css: has.scss ? scss : (has.css ? css : ''),
      css_pre_processor: has.scss ? 'scss' : 'none',
      js: has.js ? js : '',
      editors: '111'
    });
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://codepen.io/pen/define';
    form.target = '_blank';
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'data';
    input.value = data;
    form.appendChild(input);
    document.body.appendChild(form);
    form.submit();
    // Detach on the next tick — removing it synchronously can cancel the
    // target="_blank" navigation in some browsers (the intermittent "broken link").
    setTimeout(() => form.remove(), 0);
  }

  const pane = (label, value, setter, wide) => (
    <label className={'playground__pane' + (wide ? ' playground__pane--wide' : '')}>
      <span>{label}</span>
      <textarea value={value} spellCheck={false} onChange={(e) => setter(e.target.value)} />
    </label>
  );

  return (
    <div className="playground__inner">
      <div className="playground__editors">
        {has.html && !hideHtml && pane('HTML', html, setHtml)}
        {has.css && pane('CSS', css, setCss)}
        {has.scss && pane('SCSS', scss, setScss, true)}
        {has.js && !hideJs && pane('JS', js, setJs, true)}
      </div>

      <div className="playground__toolbar">
        <button type="button" onClick={reset}>Reset</button>
        {livePreview && <button type="button" onClick={openInCodePen}>Open in CodePen ↗</button>}
        <span className="playground__hint">
          {!livePreview
            ? ''
            : has.js
              ? 'Edit the code — preview + console update live.'
              : 'Edit the code — preview updates live. Drag the preview edge to test responsiveness.'}
        </span>
      </div>

      {livePreview ? (
        <div className="playground__previewwrap">
          <iframe className="playground__preview" title="Live preview" sandbox="allow-scripts allow-forms" srcDoc={doc} />
        </div>
      ) : (
        <div className="playground__codepen">
          <span>▶ Edit the SCSS above, then</span>
          <button type="button" onClick={openInCodePen}>Open in CodePen ↗</button>
          <span>to compile &amp; preview it.</span>
        </div>
      )}
    </div>
  );
}

// Props default to `null` so a pane only appears when the author passes that language.
export default function Playground({ html = null, css = null, scss = null, js = null, hideHtml = false, hideJs = false, title = 'Live playground — edit me' }) {
  const [mounted, setMounted] = useState(false);
  return (
    <details className="playground" onToggle={(e) => { if (e.currentTarget.open) setMounted(true); }}>
      <summary>🎨 {title}</summary>
      {mounted && <Editor initial={{ html, css, scss, js }} hideHtml={hideHtml} hideJs={hideJs} />}
    </details>
  );
}
