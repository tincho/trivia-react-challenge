import { decode } from 'html-entities';
import { useContext } from 'react';
import { AppContext } from '@/application/appContext';

export default function Results() {
  const {
    quizResults: { answeredCorrectly, questions },
    onReset,
  } = useContext(AppContext);

  const isCorrect = (idx: number) => answeredCorrectly.includes(idx);

  return (
    <>
      <header>
        <h2>You scored</h2>
        <h3>
          {answeredCorrectly.length} of {questions.length}
        </h3>
      </header>
      <ul>
        {questions.map((question, idx) => {
          const mark = isCorrect(idx) ? '+' : '-';
          return (
            <li>
              {mark} {decode(question)}
            </li>
          );
        })}
      </ul>
      <button type="button" onClick={onReset}>
        play again?
      </button>
    </>
  );
}
