import { Link, useParams } from 'react-router-dom';
import { getTopLevelTracks, getTrack } from '../data/curriculum.js';
import ThemeToggle from './ThemeToggle.jsx';
import Search from './Search.jsx';
import OfflineButton from './OfflineButton.jsx';

export default function Header({ hasSidebar, onToggleSidebar }) {
  const { track } = useParams();
  // Highlight the group entry (e.g. BE) when viewing one of its member modules.
  const current = getTrack(track);
  const activeTop = current && current.group ? current.group : track;
  return (
    <header className="site-header">
      <Link className="brand" to="/">
        <span className="logo">N</span>
        <span>Netcentric Academy</span>
      </Link>
      <nav className="nav">
        {getTopLevelTracks().map((t) => (
          <Link
            key={t.id}
            to={'/' + t.id}
            className={(t.id === activeTop ? 'is-active' : '') + (t.ready ? '' : ' soon')}
            title={t.ready ? undefined : 'Coming soon'}
          >
            {t.label}
          </Link>
        ))}
      </nav>
      <Search />
      <OfflineButton />
      <ThemeToggle />
      {hasSidebar && (
        <button className="icon-btn sidebar-toggle" type="button" aria-label="Lessons" onClick={onToggleSidebar}>
          ☰
        </button>
      )}
    </header>
  );
}
