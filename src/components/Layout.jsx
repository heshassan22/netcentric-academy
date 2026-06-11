import { useState, useEffect } from 'react';
import { Outlet, useParams, useLocation } from 'react-router-dom';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';
import { getLessons } from '../lib/lessons.js';
import { getTrack } from '../data/curriculum.js';

export default function Layout() {
  const { track } = useParams();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(() => {
    try { return localStorage.getItem('nc-sidebar-collapsed') === '1'; } catch (e) { return false; }
  });

  useEffect(() => {
    try { localStorage.setItem('nc-sidebar-collapsed', collapsed ? '1' : '0'); } catch (e) { /* ignore */ }
  }, [collapsed]);

  const t = getTrack(track);
  const hasSidebar = !!(track && t && t.ready && getLessons(track).length);

  useEffect(() => {
    window.scrollTo(0, 0);
    setSidebarOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.classList.toggle('sidebar-open', sidebarOpen);
  }, [sidebarOpen]);

  return (
    <>
      <Header hasSidebar={hasSidebar} onToggleSidebar={() => setSidebarOpen((o) => !o)} />
      {hasSidebar ? (
        <div className={'layout' + (collapsed ? ' is-collapsed' : '')}>
          <Sidebar
            track={track}
            collapsed={collapsed}
            onToggleCollapse={() => setCollapsed((c) => !c)}
            onNavigate={() => setSidebarOpen(false)}
          />
          <main className="content"><Outlet /></main>
        </div>
      ) : (
        <Outlet />
      )}
      <footer className="site-footer">
        Netcentric Academy · hands-on learning tracks ·{' '}
        <a href="https://github.com/Netcentric/aem-htl-style-guide">HTL Style Guide</a> ·{' '}
        <a href="https://github.com/adobe/aem-htl-repl">HTL REPL</a>
      </footer>
    </>
  );
}
