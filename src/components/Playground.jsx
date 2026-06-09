import { useState, useEffect } from 'react';

// Reusable, self-hosted live playground (a mini-CodePen) for HTML/CSS/JS.
// Authors pass code as template-literal props:
//   <Playground html={`<div class="box">Hi</div>`} css={`.box { color: red; }`} />
//   <Playground html={`<button>Go</button>`} js={`document.querySelector('button')...`} />
// When `js` is provided, a JS editor + a live console pane (captured console.* output) appear.
// Wrapped in <details> so the preview iframe only mounts when opened.
function buildDoc(html, css, js) {
  const hasJs = Boolean(js);
  const capture = hasJs
    ? '<div class="__console"></div><scr' + 'ipt>(function(){var o=document.querySelector(".__console");' +
      '["log","info","warn","error"].forEach(function(m){var f=console[m];console[m]=function(){' +
      'var s=[].map.call(arguments,function(a){try{return typeof a==="object"?JSON.stringify(a):String(a)}catch(e){return String(a)}}).join(" ");' +
      'var d=document.createElement("div");d.textContent=s;if(m==="error")d.style.color="#c0392b";if(m==="warn")d.style.color="#9a6b00";' +
      'o.appendChild(d);if(f)f.apply(console,arguments)};});' +
      'window.addEventListener("error",function(e){console.error(e.message)});})();</scr' + 'ipt>'
    : '';
  const userJs = hasJs ? '<scr' + 'ipt>' + js + '</scr' + 'ipt>' : '';
  return (
    '<!doctype html><html><head><meta charset="utf-8">' +
    '<style>:root{color-scheme:light}body{font-family:system-ui,-apple-system,sans-serif;margin:1rem;color:#1c1c28}' +
    '.__console{margin-top:1rem;border-top:1px dashed #ccc;padding-top:.5rem;font:12px/1.6 ui-monospace,Menlo,Consolas,monospace;white-space:pre-wrap;color:#0a7f5a}' +
    css +
    '</style></head><body>' + html + capture + userJs + '</body></html>'
  );
}

function Editor({ initialHtml, initialCss, initialJs }) {
  const hasHtml = initialHtml !== null;
  const hasJs = initialJs !== null;
  const [html, setHtml] = useState(initialHtml || '');
  const [css, setCss] = useState(initialCss || '');
  const [js, setJs] = useState(initialJs || '');
  const [doc, setDoc] = useState(() => buildDoc(initialHtml || '', initialCss || '', initialJs || ''));

  useEffect(() => {
    const id = setTimeout(() => setDoc(buildDoc(html, css, hasJs ? js : '')), 250);
    return () => clearTimeout(id);
  }, [html, css, js, hasJs]);

  function reset() { setHtml(initialHtml || ''); setCss(initialCss || ''); setJs(initialJs || ''); }

  function openInCodePen() {
    const data = JSON.stringify({ title: 'Netcentric Academy — example', html, css, js, editors: hasJs ? '111' : '110' });
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
    form.remove();
  }

  return (
    <div className="playground__inner">
      <div className="playground__editors">
        {hasHtml && (
          <label className="playground__pane">
            <span>HTML</span>
            <textarea value={html} spellCheck={false} onChange={(e) => setHtml(e.target.value)} />
          </label>
        )}
        {initialCss !== null && (
          <label className="playground__pane">
            <span>CSS</span>
            <textarea value={css} spellCheck={false} onChange={(e) => setCss(e.target.value)} />
          </label>
        )}
        {hasJs && (
          <label className="playground__pane">
            <span>JS</span>
            <textarea value={js} spellCheck={false} onChange={(e) => setJs(e.target.value)} />
          </label>
        )}
      </div>

      <div className="playground__toolbar">
        <button type="button" onClick={reset}>Reset</button>
        <button type="button" onClick={openInCodePen}>Open in CodePen ↗</button>
        <span className="playground__hint">
          {hasJs ? 'Edit the code — preview + console update live.' : 'Edit the code — the preview updates live.'}
        </span>
      </div>

      <iframe className="playground__preview" title="Live preview" sandbox="allow-scripts allow-forms" srcDoc={doc} />
    </div>
  );
}

// Props default to `null` so a pane only appears when the author passes that language.
export default function Playground({ html = null, css = null, js = null, title = 'Live playground — edit me' }) {
  const [mounted, setMounted] = useState(false);
  return (
    <details className="playground" onToggle={(e) => { if (e.currentTarget.open) setMounted(true); }}>
      <summary>🎨 {title}</summary>
      {mounted && <Editor initialHtml={html} initialCss={css} initialJs={js} />}
    </details>
  );
}
