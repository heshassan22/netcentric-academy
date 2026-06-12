import { useEffect, useRef, useState, useCallback } from 'react';

// Prototype "Slides mode": a toggle (top-right) that turns the lesson into a
// deck. Content is split into slides at each <h2> (everything before the first
// <h2> — title + intro — is the first slide). Prev/next + arrow keys navigate.
// Implemented by toggling display on the already-rendered top-level blocks, so
// it works with whatever MDX produced (callouts, playgrounds, tables, …).
export default function SlideDeck({ children }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  const [slides, setSlides] = useState([]); // array of arrays of elements
  const [i, setI] = useState(0);

  // group the rendered children into slides at each H2
  useEffect(() => {
    if (!on || !ref.current) return;
    const kids = Array.from(ref.current.children);
    const groups = [];
    let cur = [];
    kids.forEach((el) => {
      if (el.tagName === 'H2' && cur.length) { groups.push(cur); cur = []; }
      cur.push(el);
    });
    if (cur.length) groups.push(cur);
    setSlides(groups);
    setI(0);
  }, [on]);

  // show only the active slide's elements
  useEffect(() => {
    if (!ref.current) return;
    const kids = Array.from(ref.current.children);
    if (!on) { kids.forEach((el) => { el.style.display = ''; }); return; }
    const active = new Set(slides[i] || []);
    kids.forEach((el) => { el.style.display = active.size && !active.has(el) ? 'none' : ''; });
  }, [on, slides, i]);

  // immersive: hide chrome while presenting
  useEffect(() => {
    document.body.classList.toggle('slides-active', on);
    return () => document.body.classList.remove('slides-active');
  }, [on]);

  // full-screen the whole page (great paired with slides mode)
  const [fs, setFs] = useState(false);
  useEffect(() => {
    const sync = () => setFs(!!(document.fullscreenElement || document.webkitFullscreenElement));
    document.addEventListener('fullscreenchange', sync);
    document.addEventListener('webkitfullscreenchange', sync);
    return () => {
      document.removeEventListener('fullscreenchange', sync);
      document.removeEventListener('webkitfullscreenchange', sync);
    };
  }, []);
  function toggleFullscreen() {
    const active = document.fullscreenElement || document.webkitFullscreenElement;
    if (active) {
      (document.exitFullscreen || document.webkitExitFullscreen).call(document);
    } else {
      const el = document.documentElement;
      const req = el.requestFullscreen || el.webkitRequestFullscreen;
      if (req) Promise.resolve(req.call(el)).catch(() => {});
    }
  }

  const next = useCallback(() => setI((n) => Math.min(n + 1, slides.length - 1)), [slides.length]);
  const prev = useCallback(() => setI((n) => Math.max(n - 1, 0)), []);

  useEffect(() => {
    if (!on) return;
    const onKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') { next(); e.preventDefault(); }
      else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { prev(); e.preventDefault(); }
      else if (e.key === 'Escape') { setOn(false); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [on, next, prev]);

  return (
    <div className={'deck' + (on ? ' is-slides' : '')}>
      <div className="deck__bar">
        <button
          className="deck__btn"
          type="button"
          onClick={toggleFullscreen}
          aria-pressed={fs}
          title={fs ? 'Exit full screen' : 'Full screen'}
        >
          {fs ? '🡼 Exit full screen' : '⛶ Full screen'}
        </button>
        <button
          className={'deck__btn' + (on ? ' is-active' : '')}
          type="button"
          onClick={() => setOn((v) => !v)}
          aria-pressed={on}
          title={on ? 'Exit slides (Esc)' : 'View as slides'}
        >
          {on ? '✕ Exit' : '▦ Slides'}
        </button>
      </div>

      <div className="deck__content" ref={ref}>{children}</div>

      {on && slides.length > 0 && (
        <div className="deck__nav" role="group" aria-label="Slide navigation">
          <button type="button" onClick={prev} disabled={i === 0} aria-label="Previous slide">‹</button>
          <span className="deck__count">{i + 1} / {slides.length}</span>
          <button type="button" onClick={next} disabled={i === slides.length - 1} aria-label="Next slide">›</button>
        </div>
      )}
    </div>
  );
}
