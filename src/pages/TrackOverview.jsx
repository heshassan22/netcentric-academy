import { useParams, Link } from 'react-router-dom';
import { getTrack } from '../data/curriculum.js';
import { getLessons } from '../lib/lessons.js';
import ComingSoon from './ComingSoon.jsx';

export default function TrackOverview() {
  const { track } = useParams();
  const t = getTrack(track);

  if (!t) return <ComingSoon icon="❓" title="Unknown track" blurb="This track doesn't exist yet." />;
  if (!t.ready) return <ComingSoon icon={t.icon || '🚧'} title={t.title + ' Track'} blurb={t.blurb} />;

  const lessons = getLessons(track);
  return (
    <>
      <div className="lesson-head">
        <span className="kicker">{t.label} Track</span>
        <h1>{t.title}</h1>
        <p className="lead">{t.blurb}</p>
      </div>
      <div className="track-grid inline">
        {lessons.map((l) => (
          <Link key={l.slug} className="track" to={'/' + track + '/' + l.slug}>
            <span className="track-badge">{l.num || '•'}</span>
            <h3>{l.title}</h3>
            {l.topics && <p dangerouslySetInnerHTML={{ __html: l.topics }} />}
          </Link>
        ))}
      </div>
    </>
  );
}
