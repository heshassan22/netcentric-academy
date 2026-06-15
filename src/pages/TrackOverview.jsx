import { useParams, Link } from 'react-router-dom';
import { getTrack, getGroupMembers } from '../data/curriculum.js';
import { getLessons } from '../lib/lessons.js';
import { TrackCard } from '../components/TrackGrid.jsx';
import ComingSoon from './ComingSoon.jsx';

export default function TrackOverview() {
  const { track } = useParams();
  const t = getTrack(track);

  if (!t) return <ComingSoon icon="❓" title="Unknown track" blurb="This track doesn't exist yet." />;
  if (!t.ready) return <ComingSoon icon={t.icon || '🚧'} title={t.title + ' Track'} blurb={t.blurb} />;

  // Group landing (e.g. BE): list the member modules as cards instead of lessons.
  if (t.isGroup) {
    const members = getGroupMembers(t.id);
    return (
      <div className="container landing">
        <div className="lesson-head">
          <span className="kicker">{t.label}</span>
          <h1>{t.title}</h1>
          <p className="lead">{t.blurb}</p>
        </div>
        <div className="track-grid inline">
          {members.map((m) => (
            <TrackCard key={m.id} track={m} count={getLessons(m.id).length} />
          ))}
        </div>
      </div>
    );
  }

  const lessons = getLessons(track);
  const parent = t.group ? getTrack(t.group) : null;
  return (
    <>
      <div className="lesson-head">
        <span className="kicker">
          {parent && (
            <Link to={'/' + parent.id} className="kicker-link">← {parent.title}</Link>
          )}
          {parent ? ' · ' : ''}{t.label} Track
        </span>
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
