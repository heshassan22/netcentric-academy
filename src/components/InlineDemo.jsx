import { useState } from 'react';

// Inline "code ⇄ result" toggle for table cells and prose.
// Pass the raw markup as a string: <InlineDemo html='<strong>x</strong>' />
// Default shows the rendered result; the button flips to the source and back.
export default function InlineDemo({ html }) {
  const [showCode, setShowCode] = useState(false);
  const markup = String(html);
  return (
    <span className="inline-demo">
      {showCode ? (
        <code className="inline-demo__code">{markup}</code>
      ) : (
        <span className="inline-demo__out" dangerouslySetInnerHTML={{ __html: markup }} />
      )}
      <button
        type="button"
        className="inline-demo__toggle"
        onClick={() => setShowCode((s) => !s)}
        aria-label={showCode ? 'Show rendered result' : 'Show source code'}
        title={showCode ? 'Show result' : 'Show code'}
      >
        {showCode ? 'result' : 'code'}
      </button>
    </span>
  );
}
