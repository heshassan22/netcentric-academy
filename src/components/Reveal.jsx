export default function Reveal({ title = 'Reveal answer', children }) {
  return (
    <details className="reveal">
      <summary>{title}</summary>
      <div className="reveal-body">{children}</div>
    </details>
  );
}
