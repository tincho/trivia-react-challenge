import { decode } from 'html-entities';
import { useAppContext } from '@/application/appContext';

export default function Results() {
  const {
    quizResults: { answeredCorrectly, questions, answers },
    onReset,
  } = useAppContext();

  const isCorrect = (idx: number) => answeredCorrectly.includes(idx);

  return (
    <>
      <header>
        <h2>You scored</h2>
        <h3>
          {answeredCorrectly.length} of {questions.length}
        </h3>
      </header>
      <ul className="results">
        {questions.map((question, idx) => {
          const mark = isCorrect(idx) ? '+' : '-';
          return (
            <li key={question}>
              {mark} {decode(question)}
              <br />
              (You answered: {answers[idx]})
            </li>
          );
        })}
      </ul>
      <button type="button" onClick={onReset} className="btn--play-again">
        play again?
      </button>
    </>
  );
}
