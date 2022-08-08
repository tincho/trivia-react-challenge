import { decode } from 'html-entities';
import { useAppContext } from '@/application/appContext';

import './Results.css';

type ResultsQuestion = {
  question: string;
  answer: string;
  correct: boolean;
};
type ResultsViewProps = {
  score: number;
  questions?: ResultsQuestion[];
  playAgain: () => void;
};

function ResultsView({ score, questions = [], playAgain }: ResultsViewProps) {
  return (
    <>
      <header>
        <h2>You scored</h2>
        <h3 data-testid="score">
          {score} of {questions.length}
        </h3>
      </header>
      <section className="results">
        {questions.map(({ question, answer, correct }) => {
          const mark = correct ? '+' : '-';
          return (
            <article key={question}>
              <div className="results-question">
                <span className="mark">{mark}</span>
                {decode(question)}
              </div>
              <div className={`answer ${correct ? 'answer--correct' : 'answer--incorrect'}`}>
                (You answered: {answer})
              </div>
            </article>
          );
        })}
      </section>
      <button type="button" onClick={playAgain} className="btn--play-again">
        play again?
      </button>
    </>
  );
}
ResultsView.defaultProps = {
  questions: [] as const,
};

/**
 * reads data & methods from App Context and injects them into (dumb) ResultsView
 * @returns {ReactNode} ResultsView
 */
export default function Results() {
  const {
    quizResults: { answeredCorrectly, questions, answers },
    onReset,
  } = useAppContext();

  const isCorrect = (idx: number) => answeredCorrectly.includes(idx);

  const questionsData = questions.map((question, idx) => ({
    question,
    answer: answers[idx],
    correct: isCorrect(idx),
  }));

  return <ResultsView score={answeredCorrectly.length} questions={questionsData} playAgain={onReset} />;
}
