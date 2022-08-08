import { useAppContext } from '@/application/appContext';
import { useEffectOnce, Spinner } from '@/application/utils';

import { getQuestions, QuestionData } from '@/domain/questionsService';
import { useQuiz } from '@/domain/quiz';

import Question from '@/components/Quiz/Question';
import ErrorMessage from '@/components/Quiz/ErrorMessage';

type QuizViewProps = {
  status: 'idle' | 'loading' | 'error' | 'success';
  errorMessage?: string;
  goHome: () => void;
  question: QuestionData;
  totalQuestions: number;
  questionNumber: number;
  onAnswer: (option: string) => void;
};
export function QuizView({
  status,
  errorMessage = '',
  goHome,
  question,
  totalQuestions,
  questionNumber,
  onAnswer,
}: QuizViewProps) {
  if (status === 'error') {
    return <ErrorMessage message={errorMessage} goHome={goHome} />;
  }

  if (['loading', 'idle'].includes(status) || !question /* quiz ended, redirecting... (you shouldnt see this!) */) {
    return <Spinner />;
  }

  return (
    <Question question={question} totalQuestions={totalQuestions} questionNumber={questionNumber} onAnswer={onAnswer} />
  );
}
QuizView.defaultProps = {
  errorMessage: '',
};

/**
 * you can see Quiz as a "connector"
 * this is the point in the app where:
 *  * App Context,
 *  * Quiz state,
 *  * questionsService, and
 *  * Question view
 * converge into the logic that procceses everything and passes it through the (dumb) QuizView
 * @returns {ReactNode} QuizView
 */
export default function Quiz() {
  const { onEnd, onReset /* questionsType, questionsCount */ } = useAppContext();

  const {
    status,
    setLoading,
    setError,
    errorMessage,
    loadQuestions,
    question,
    questionNumber,
    totalQuestions,
    onAnswer,
  } = useQuiz({
    onEnd,
  });

  useEffectOnce(() => {
    const doFetch = async () => {
      try {
        const questions = await getQuestions(/* { amount: questionsCount, type: questionsType } */);
        loadQuestions(questions);
      } catch (err) {
        setError((err as Error).message);
      }
    };
    if (status === 'idle') {
      setLoading();
      doFetch();
    }
  });

  return (
    <QuizView
      status={status}
      errorMessage={errorMessage}
      goHome={onReset}
      question={question}
      totalQuestions={totalQuestions}
      questionNumber={questionNumber}
      onAnswer={onAnswer}
    />
  );
}
