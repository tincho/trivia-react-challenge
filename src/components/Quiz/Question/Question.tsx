import { decode } from 'html-entities';
import type { QuestionData } from '@/domain/questionsService';

type QuestionProps = {
  question: QuestionData;
  totalQuestions: number;
  questionNumber: number;
  onAnswer: (option: string) => void;
};

const shuffle = <T,>(arr: T[]) =>
  arr
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

export default function Question({ question, questionNumber, totalQuestions, onAnswer }: QuestionProps) {
  const {
    category,
    question: questionText,
    correct_answer: correctAnswer,
    incorrect_answers: incorrectAnswers,
  } = question;
  const options = shuffle([correctAnswer, ...incorrectAnswers]);

  const onClickOption = (option: string) => () => {
    onAnswer(option);
  };

  return (
    <article>
      <header>
        <h2>{category}</h2>
      </header>
      <section>
        <p>{decode(questionText)}</p>
      </section>
      <section>
        {options.map((option) => {
          const id = `${questionNumber}-${option}`;
          return (
            <button type="button" key={id} onClick={onClickOption(option)} data-testid={id}>
              {option}
            </button>
          );
        })}
      </section>
      <footer>
        {questionNumber} of {totalQuestions}
      </footer>
    </article>
  );
}
