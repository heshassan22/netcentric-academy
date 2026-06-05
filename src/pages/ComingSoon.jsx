import { Link } from 'react-router-dom';

export default function ComingSoon({ icon = '🚧', title, blurb }) {
  return (
    <main className="container">
      <div className="empty-state">
        <div className="big">{icon}</div>
        <h1>{title}</h1>
        <p>{blurb}</p>
        <Link className="repl-link" to="/">← Back to tracks</Link>
      </div>
    </main>
  );
}
