export default function ReplLink({ children, href = 'https://github.com/adobe/aem-htl-repl' }) {
  return (
    <a className="repl-link" href={href} target="_blank" rel="noreferrer">
      {children || 'Open in HTL REPL ↗'}
    </a>
  );
}
