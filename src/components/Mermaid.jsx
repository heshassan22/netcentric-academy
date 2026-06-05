import { useEffect, useState } from 'react';

// Renders a Mermaid diagram from text. Mermaid is dynamically imported so it is
// code-split into its own chunk (only loaded on pages that have a diagram).
// Re-renders when the light/dark theme changes.
let counter = 0;

export default function Mermaid({ code }) {
  const [svg, setSvg] = useState('');
  const [err, setErr] = useState('');

  useEffect(() => {
    let cancelled = false;
    let observer;

    async function render() {
      try {
        const mermaid = (await import('mermaid')).default;
        const dark = document.documentElement.getAttribute('data-theme') === 'dark';
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: 'loose',
          theme: dark ? 'dark' : 'default',
          fontFamily: 'inherit'
        });
        const id = 'mmd-' + counter++;
        const out = await mermaid.render(id, String(code).trim());
        if (!cancelled) { setSvg(out.svg); setErr(''); }
      } catch (e) {
        if (!cancelled) setErr(String((e && e.message) || e));
      }
    }

    render();
    observer = new MutationObserver(render);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => { cancelled = true; if (observer) observer.disconnect(); };
  }, [code]);

  if (err) {
    return <div className="code"><pre><code>{'Diagram error: ' + err}</code></pre></div>;
  }
  return <figure className="mermaid-diagram" dangerouslySetInnerHTML={{ __html: svg }} />;
}
