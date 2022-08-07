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
  onAnswer: (answer: string) => void;
};

/**
 * useQuiz hook
 * @param {Function} onEnd fn to be exec when the final question gets answered
 * @returns {QuizHookAPI} some info an fns to interact with the Quiz State
 */
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

  const { questions, currentQuestion, answers, answeredCorrectly, answeredIncorrectly, status, errorMessage } =
    quizState;

  useEffect(() => {
    if (questions.length && currentQuestion >= questions.length) {
      onEnd({
        answeredCorrectly,
        answeredIncorrectly,
        questions: questions.map((q) => q.question),
        answers,
      });
    }
    // this eslint rule is not suitable for this use case
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions.length, currentQuestion]);

  const question = questions[currentQuestion];

  const onAnswer = (answer: string) => {
    const isCorrect = answer === question.correct_answer;
    dispatch({
      type: isCorrect ? 'answerCorrectly' : 'answerIncorrectly',
      payload: answer,
    });
  };

  return {
    status,
    setLoading,
    setError,
    errorMessage,
    loadQuestions,
    question,
    questionNumber: currentQuestion + 1,
    totalQuestions: questions.length,
    onAnswer,
  };
};
