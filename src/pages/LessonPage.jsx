import { useParams } from 'react-router-dom';
import { getLesson } from '../lib/lessons.js';
import Pager from '../components/Pager.jsx';

export default function LessonPage() {
  const { track, slug } = useParams();
  const lesson = getLesson(track, slug);

  if (!lesson) {
    return (
      <div className="lesson-head">
        <h1>Lesson not found</h1>
        <p className="lead">No lesson <code>{slug}</code> in this track.</p>
      </div>
    );
  }

  const Body = lesson.Component;
  return (
    <>
      <div className="lesson-head">
        <span className="kicker">{lesson.num ? 'Lesson ' + lesson.num : 'Hands-on'}</span>
        <h1>{lesson.title}</h1>
        {lesson.topics && <p className="topics-line" dangerouslySetInnerHTML={{ __html: lesson.topics }} />}
      </div>
      <Body />
      <Pager track={track} slug={slug} />
    </>
  );
}
