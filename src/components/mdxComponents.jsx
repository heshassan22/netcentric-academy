import { useState } from 'react';
import CodeBlock from './CodeBlock.jsx';
import Mermaid from './Mermaid.jsx';
import { Tabs, Tab } from './Tabs.jsx';
import Callout from './Callout.jsx';
import Reveal from './Reveal.jsx';
import ReplLink from './ReplLink.jsx';
import InlineDemo from './InlineDemo.jsx';
import Playground from './Playground.jsx';
import PageJourney from './PageJourney.jsx';
import LayoutLab from './LayoutLab.jsx';

// MDX renders fenced code as <pre><code class="language-xxx">{string}</code></pre>.
// A ```mermaid fence becomes a rendered diagram; everything else becomes a
// styled, copyable CodeBlock.
function Pre(props) {
  const codeEl = props.children;
  const childProps = (codeEl && codeEl.props) || {};
  const className = childProps.className || '';
  const lang = (className.match(/language-([\w-]+)/) || [])[1] || 'HTL';
  let code = childProps.children;
  if (Array.isArray(code)) code = code.join('');
  if (typeof code !== 'string') code = '';
  if (lang === 'mermaid') return <Mermaid code={code} />;
  return <CodeBlock code={code} lang={lang} />;
}

// remark-gfm renders task-list items as DISABLED checkboxes. Swap in an
// interactive one so students can tick assignment steps off as they go.
function TaskCheckbox({ checked }) {
  const [on, setOn] = useState(Boolean(checked));
  return (
    <input
      type="checkbox"
      className="task-checkbox"
      checked={on}
      onChange={() => setOn((v) => !v)}
    />
  );
}

function Input(props) {
  if (props.type === 'checkbox') return <TaskCheckbox checked={props.checked} />;
  return <input {...props} />;
}

export const mdxComponents = { pre: Pre, input: Input, Tabs, Tab, Callout, Reveal, ReplLink, InlineDemo, Playground, PageJourney, LayoutLab };
