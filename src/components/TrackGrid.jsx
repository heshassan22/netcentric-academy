import { Link } from 'react-router-dom';

export function TrackCard({ track, lessonsCount }) {
  return (
    <Link className={'track' + (track.ready ? '' : ' disabled')} to={'/' + track.id}>
      {!track.ready && <span className="soon">Coming soon</span>}
      <span className="track-badge">{track.badge}</span>
      <h3>{track.title}</h3>
      <p>{track.blurb}</p>
      <span className="meta">
        {track.ready ? (lessonsCount ? lessonsCount + ' lessons →' : 'Open →') : 'In preparation'}
      </span>
    </Link>
  );
}
