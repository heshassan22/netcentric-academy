import { Link } from 'react-router-dom';
import { getAdjacent } from '../lib/lessons.js';

function cell(track, lesson, dir, cls) {
  if (!lesson) return <span className="spacer" />;
  return (
    <Link className={cls} to={'/' + track + '/' + lesson.slug}>
      <div className="dir">{dir}</div>
      <div className="ttl">{(lesson.num ? lesson.num + ' · ' : '') + lesson.title}</div>
    </Link>
  );
}

export default function Pager({ track, slug }) {
  const { prev, next } = getAdjacent(track, slug);
  return (
    <div className="pager">
      {cell(track, prev, '← Previous', 'prev')}
      {cell(track, next, 'Next →', 'next')}
    </div>
  );
}
