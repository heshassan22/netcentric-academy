import { Link } from 'react-router-dom';

export function TrackCard({ track, count }) {
  const unit = track.isGroup ? 'modules' : 'lessons';
  return (
    <Link className={'track' + (track.ready ? '' : ' disabled')} to={'/' + track.id}>
      {!track.ready && <span className="soon">Coming soon</span>}
      <span className="track-badge">{track.badge}</span>
      <h3>{track.title}</h3>
      <p>{track.blurb}</p>
      <span className="meta">
        {track.ready ? (count ? count + ' ' + unit + ' →' : 'Open →') : 'In preparation'}
      </span>
    </Link>
  );
}
