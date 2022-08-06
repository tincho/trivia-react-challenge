/* eslint-disable import/prefer-default-export */
import { useEffect, useReducer } from 'react';

import type { ResultsType } from '@/application/appContext';

import type { QuestionData } from '@/domain/questionsService';

import { initialValue, quizReducer } from '@/domain/quizReducer';

type QuizHookArgs = {
  onEnd: (quizResults: ResultsType) => void;
};
type QuizHookAPI = {
  status: string;
  errorMessage: string;
  setLoading: () => void;
  setError: (message: string) => void;
  loadQuestions: (payload: QuestionData[]) => void;
  question: QuestionData;
  questionNumber: number;
  totalQuestions: number;
  onAnswerCorrectly: () => void;
  onAnswerIncorrectly: () => void;
};

export const useQuiz = ({ onEnd }: QuizHookArgs): QuizHookAPI => {
  const [quizState, dispatch] = useReducer(quizReducer, initialValue);

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
  const onAnswerCorrectly = () => dispatch({ type: 'answerCorrectly' });
  const onAnswerIncorrectly = () => dispatch({ type: 'answerIncorrectly' });

  const { questions, currentQuestion, answeredCorrectly, answeredIncorrectly, status, errorMessage } = quizState;

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

  return {
    status,
    setLoading,
    setError,
    errorMessage,
    loadQuestions,
    question: questions[currentQuestion],
    questionNumber: currentQuestion + 1,
    totalQuestions: questions.length,
    onAnswerCorrectly,
    onAnswerIncorrectly,
  };
};
