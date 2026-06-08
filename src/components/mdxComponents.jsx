import CodeBlock from './CodeBlock.jsx';
import Mermaid from './Mermaid.jsx';
import { Tabs, Tab } from './Tabs.jsx';
import Callout from './Callout.jsx';
import Reveal from './Reveal.jsx';
import ReplLink from './ReplLink.jsx';
import InlineDemo from './InlineDemo.jsx';

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

export const mdxComponents = { pre: Pre, Tabs, Tab, Callout, Reveal, ReplLink, InlineDemo };
