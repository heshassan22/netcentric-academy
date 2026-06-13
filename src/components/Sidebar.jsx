import { NavLink } from 'react-router-dom';
import { getLessons } from '../lib/lessons.js';
import { getTrack } from '../data/curriculum.js';

export default function Sidebar({ track, onNavigate, collapsed, onToggleCollapse }) {
  const lessons = getLessons(track);
  const t = getTrack(track);
  if (!lessons.length) return null;
  const cls = ({ isActive }) => (isActive ? 'is-active' : '');
  return (
    <aside className="sidebar">
      <div className="sidebar-inner">
        <button
          type="button"
          className="sidebar-collapse"
          onClick={onToggleCollapse}
          aria-label={collapsed ? 'Expand lesson menu' : 'Collapse lesson menu'}
          title={collapsed ? 'Expand' : 'Collapse'}
        >
          {collapsed ? '»' : '«'}
        </button>
        <h4>{t ? t.title : track}</h4>
        <ol>
          <li>
            <NavLink end to={'/' + track} className={cls} onClick={onNavigate}>
              <span className="num">·</span><span>Overview</span>
            </NavLink>
          </li>
          {lessons.filter((l) => !l.slug.endsWith('assignment-answer')).map((l) => (
            <li key={l.slug}>
              <NavLink to={'/' + track + '/' + l.slug} className={cls} onClick={onNavigate}>
                <span className="num">{l.num || '·'}</span><span>{l.title}</span>
              </NavLink>
            </li>
          ))}
        </ol>
      </div>
    </aside>
  );
}
