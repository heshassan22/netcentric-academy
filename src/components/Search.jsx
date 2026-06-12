import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { search } from '../lib/search.js';

// Command-palette style search over all lesson content.
// Open with the header button, Cmd/Ctrl+K, or "/". Esc closes.
export default function Search() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const results = open ? search(q) : [];

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); setOpen(true); }
      else if (e.key === 'Escape') { setOpen(false); }
      else if (e.key === '/' && !open) {
        const tag = (document.activeElement && document.activeElement.tagName) || '';
        if (!/INPUT|TEXTAREA/.test(tag)) { e.preventDefault(); setOpen(true); }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => { if (open && inputRef.current) inputRef.current.focus(); }, [open]);

  function go(r) {
    setOpen(false);
    setQ('');
    navigate('/' + r.track + '/' + r.slug);
  }

  const ready = q.trim().length >= 2;

  return (
    <>
      <button className="icon-btn" type="button" aria-label="Search lessons" title="Search (⌘K)" onClick={() => setOpen(true)}>🔍</button>

      {open && createPortal(
        <div className="search-overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) setOpen(false); }}>
          <div className="search-modal" role="dialog" aria-label="Search lessons">
            <input
              ref={inputRef}
              className="search-input"
              type="text"
              placeholder="Search lessons…  e.g. @forward"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <div className="search-results">
              {!ready && <p className="search-hint">Type at least 2 characters. <kbd>Esc</kbd> to close.</p>}
              {ready && results.length === 0 && <p className="search-hint">No matches for “{q}”.</p>}
              {ready && results.map((r) => (
                <button key={r.track + '/' + r.slug} type="button" className="search-result" onClick={() => go(r)}>
                  <span className="search-result__top">
                    <span className="search-result__title">{r.num ? r.num + ' · ' : ''}{r.title}</span>
                    <span className="search-result__track">{r.trackLabel}{r.count ? ' · ' + r.count + '×' : ''}</span>
                  </span>
                  <span className="search-result__snippet" dangerouslySetInnerHTML={{ __html: highlight(r.snippet, q) }} />
                </button>
              ))}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

function highlight(text, q) {
  const escHtml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const safe = escHtml(text);
  const needle = q.trim();
  if (!needle) return safe;
  const pattern = escHtml(needle).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return safe.replace(new RegExp('(' + pattern + ')', 'ig'), '<mark>$1</mark>');
}
