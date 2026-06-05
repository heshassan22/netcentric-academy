import { useState } from 'react';
import { highlight } from '../lib/highlight.js';

function label(lang) {
  if (!lang) return 'HTL';
  if (lang.toLowerCase() === 'html') return 'HTL';
  return lang.toUpperCase();
}

export default function CodeBlock({ code, lang = 'HTL' }) {
  const clean = String(code).replace(/\n+$/, '');
  const [copied, setCopied] = useState(false);

  function onCopy() {
    const done = () => { setCopied(true); setTimeout(() => setCopied(false), 1400); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(clean).then(done, done);
    } else {
      const ta = document.createElement('textarea');
      ta.value = clean; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); } catch (e) {}
      document.body.removeChild(ta); done();
    }
  }

  return (
    <div className="code">
      <div className="code-head">
        <span className="code-lang">{label(lang)}</span>
        <button className={'copy-btn' + (copied ? ' copied' : '')} type="button" onClick={onCopy}>
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre><code dangerouslySetInnerHTML={{ __html: highlight(clean, lang) }} /></pre>
    </div>
  );
}
