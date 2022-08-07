import { decode } from 'html-entities';
import { useAppContext } from '@/application/appContext';

import './Results.css';

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
        <h3 data-testid="score">
          {answeredCorrectly.length} of {questions.length}
        </h3>
      </header>
      <section className="results">
        {questions.map((question, idx) => {
          const correct = isCorrect(idx);
          const mark = correct ? '+' : '-';
          return (
            <article key={question}>
              <div className="results-question">
                <span className="mark">{mark}</span>
                {decode(question)}
              </div>
              <div className={`answer ${correct ? 'answer--correct' : 'answer--incorrect'}`}>
                (You answered: {answers[idx]})
              </div>
            </article>
          );
        })}
      </section>
      <button type="button" onClick={onReset} className="btn--play-again">
        play again?
      </button>
    </>
  );
}
