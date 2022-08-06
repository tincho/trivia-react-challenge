import { useAppContext } from '@/application/appContext';
import { useEffectOnce, Spinner } from '@/application/utils';

import { getQuestions } from '@/domain/questionsService';
import { useQuiz } from '@/domain/quiz';

import Question from '@/components/Quiz/Question';
import ErrorMessage from '@/components/Quiz/ErrorMessage';

export default function Quiz() {
  const { onEnd, onReset } = useAppContext();

  const {
    status,
    setLoading,
    setError,
    errorMessage,
    loadQuestions,
    question,
    questionNumber,
    totalQuestions,
    onAnswerCorrectly,
    onAnswerIncorrectly,
  } = useQuiz({
    onEnd,
  });

  useEffectOnce(() => {
    const doFetch = async () => {
      try {
        const questions = await getQuestions();
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

  if (['loading', 'idle'].includes(status)) {
    return <Spinner />;
  }

  if (status === 'error') {
    return <ErrorMessage message={errorMessage} goHome={onReset} />;
  }

  if (!question) {
    // quiz ended, redirecting... (you shouldnt see this!)
    return <Spinner />;
  }

  return (
    <Question
      question={question}
      totalQuestions={totalQuestions}
      questionNumber={questionNumber}
      onAnswerCorrectly={onAnswerCorrectly}
      onAnswerIncorrectly={onAnswerIncorrectly}
    />
  );
}
