import { Link, useParams } from 'react-router-dom';
import { TRACKS } from '../data/curriculum.js';
import ThemeToggle from './ThemeToggle.jsx';

export default function Header({ hasSidebar, onToggleSidebar }) {
  const { track } = useParams();
  return (
    <header className="site-header">
      <Link className="brand" to="/">
        <span className="logo">N</span>
        <span>Netcentric Academy</span>
      </Link>
      <nav className="nav">
        {TRACKS.filter((t) => !t.hidden).map((t) => (
          <Link
            key={t.id}
            to={'/' + t.id}
            className={(t.id === track ? 'is-active' : '') + (t.ready ? '' : ' soon')}
            title={t.ready ? undefined : 'Coming soon'}
          >
            {t.label}
          </Link>
        ))}
      </nav>
      <ThemeToggle />
      {hasSidebar && (
        <button className="icon-btn sidebar-toggle" type="button" aria-label="Lessons" onClick={onToggleSidebar}>
          ☰
        </button>
      )}
    </header>
  );
}
