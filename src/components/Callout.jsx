export default function Callout({ type = 'note', children }) {
  return <div className={'callout ' + type}>{children}</div>;
}
