import { useEffect, useReducer, useContext } from 'react';
import { AppContext } from '@/application/appContext';
import { QuestionData, getQuestions } from '@/domain/questionsService';
import { questionsReducer, initialValue } from '@/domain/questions';
import Question from '@/components/Quiz/Question';

export default function Quiz() {
  const { onEnd } = useContext(AppContext);
  const [state, dispatch] = useReducer(questionsReducer, initialValue);

  const setLoading = () =>
    dispatch({
      type: 'loading',
    });
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
  const answerCorrectly = () =>
    dispatch({
      type: 'answerCorrectly',
    });
  const answerIncorrectly = () =>
    dispatch({
      type: 'answerIncorrectly',
    });

  useEffect(() => {
    const doFetch = async () => {
      try {
        const questions = await getQuestions();
        loadQuestions(questions);
      } catch (err) {
        setError((err as Error).message);
      }
    };
    setLoading();
    doFetch();
  }, []);

  const { status } = state;

  if (status === 'loading') {
    return <p>loadin...</p>;
  }

  const { questions, currentQuestion } = state;
  const question = questions[currentQuestion];

  console.log('***', questions);
  console.log('***', currentQuestion);

  if (questions.length && currentQuestion >= questions.length) {
    // eslint-disable-next-line no-debugger
    debugger;
    const { answeredCorrectly, answeredIncorrectly } = state;
    onEnd({
      answeredCorrectly,
      answeredIncorrectly,
      questions: questions.map((q) => q.question),
    });
    return null;
  }

  return (
    <>
      sarasa
      {status === 'success' && (
        <Question
          totalQuestions={questions.length}
          questionNumber={currentQuestion + 1}
          question={question}
          onAnswerCorrectly={answerCorrectly}
          onAnswerIncorrectly={answerIncorrectly}
        />
      )}
    </>
  );
}
