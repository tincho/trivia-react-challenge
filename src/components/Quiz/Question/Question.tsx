import type { QuestionData } from '@/domain/questionsService';
import { decode } from 'html-entities'

type QuestionProps = {
  question: QuestionData;
  totalQuestions: number;
  questionNumber: number;
  onAnswerCorrectly: () => void;
  onAnswerIncorrectly: () => void;
};

const shuffle = <T,>(arr: T[]) =>
  arr
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

export default function Question({
  question: { category, question, correct_answer, incorrect_answers },
  questionNumber,
  totalQuestions,
  onAnswerCorrectly,
  onAnswerIncorrectly,
}: QuestionProps) {
  const options = shuffle([correct_answer, ...incorrect_answers]);

  const onClickOption = (option: string) => () => {
    if (option === correct_answer) {
      onAnswerCorrectly();
    } else {
      onAnswerIncorrectly();
    }
  };

  return (
    <article>
      <header>
        <h2>{category}</h2>
      </header>
      <section>
        <p>{decode(question)}</p>
      </section>
      <section>
        {options.map((option) => (
          <button type="button" key={option} onClick={onClickOption(option)}>
            {option}
          </button>
        ))}
      </section>
      <footer>
        {questionNumber} of {totalQuestions}
      </footer>
    </article>
  );
}
