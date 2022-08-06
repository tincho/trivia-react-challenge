import { useEffect, useReducer, useContext } from 'react';
import { AppContext } from '@/application/appContext';
import { useEffectOnce, Spinner } from '@/application/utils';

import { QuestionData, getQuestions } from '@/domain/questionsService';
import { initialValue, quizReducer } from '@/domain/quizReducer';
import Question from '@/components/Quiz/Question';
import ErrorMessage from '@/components/Quiz/ErrorMessage';

export default function Quiz() {
  const { onEnd } = useContext(AppContext);
  const [state, dispatch] = useReducer(quizReducer, initialValue);

  const setLoading = () => dispatch({ type: 'loading' });
  const setError = (message: string) =>
    dispatch({
      type: 'error',
      payload: message,
    });
  const loadQuestions = (payload: QuestionData[]) =>
    dispatch({
      type: 'loadQuestions',
      payload,
    });
  const answerCorrectly = () => dispatch({ type: 'answerCorrectly' });
  const answerIncorrectly = () => dispatch({ type: 'answerIncorrectly' });

  const { status } = state;

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

  const { questions, currentQuestion, answeredCorrectly, answeredIncorrectly } = state;

  useEffect(() => {
    if (questions.length && currentQuestion >= questions.length) {
      onEnd({
        answeredCorrectly,
        answeredIncorrectly,
        questions: questions.map((q) => q.question),
      });
    }
    // this eslint rule is not suitable for this use case
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions.length, currentQuestion]);

  if (['loading', 'idle'].includes(status)) {
    return <Spinner />;
  }

  if (status === 'error') {
    return <ErrorMessage message={state.errorMessage} />;
  }

  const question = questions[currentQuestion];

  if (!question) {
    // quiz ended, redirecting... (you shouldnt see this!)
    return <Spinner />;
  }

  return (
    <Question
      question={question}
      totalQuestions={questions.length}
      questionNumber={currentQuestion + 1}
      onAnswerCorrectly={answerCorrectly}
      onAnswerIncorrectly={answerIncorrectly}
    />
  );
}
