import { getTopLevelTracks, getGroupMembers } from '../data/curriculum.js';
import { getLessons } from '../lib/lessons.js';
import { TrackCard } from '../components/TrackGrid.jsx';

// A group card (e.g. BE) counts its member modules; a normal track counts lessons.
function cardCount(t) {
  return t.isGroup ? getGroupMembers(t.id).length : getLessons(t.id).length;
}

export default function Home() {
  return (
    <>
      <section className="hero">
        <span className="eyebrow">Netcentric Academy</span>
        <h1>Learn the stack, one track at a time</h1>
        <p>Hands-on lessons and exercises for the Academy tech curriculum. Pick a track to get started.</p>
      </section>
      <main className="track-grid">
        {getTopLevelTracks().map((t) => (
          <TrackCard key={t.id} track={t} count={cardCount(t)} />
        ))}
      </main>
    </>
  );
}
