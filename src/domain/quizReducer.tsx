import { Reducer } from 'react';
import type { QuestionData } from '@/domain/questionsService';

export type QuizState = {
  status: 'idle' | 'loading' | 'success' | 'error';
  errorMessage: string;
  questions: QuestionData[] | Array<never>;
  answers: string[];
  currentQuestion: number;
  answeredCorrectly: number[];
  answeredIncorrectly: number[];
};

type QuizStateAction = {
  type: string;
  payload?: string | number | QuestionData[];
};

export const initialValue: QuizState = {
  status: 'idle',
  errorMessage: '',
  questions: [],
  answers: [],
  currentQuestion: 0,
  answeredCorrectly: [],
  answeredIncorrectly: [],
};

export const quizReducer: Reducer<QuizState, QuizStateAction> = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'loading':
      return {
        ...state,
        errorMessage: '',
        status: 'loading',
      };
    case 'loadQuestions':
      return {
        ...state,
        errorMessage: '',
        status: 'success',
        questions: payload as QuestionData[],
      };
    case 'error':
      return {
        ...state,
        status: 'error',
        errorMessage: payload as string,
      };
    case 'answerCorrectly': {
      const { questions, currentQuestion, answeredCorrectly, answers } = state;
      return {
        ...state,
        currentQuestion: Math.min(questions.length, currentQuestion + 1),
        answeredCorrectly: [...answeredCorrectly, currentQuestion],
        answers: [...answers, payload as string],
      };
    }
    case 'answerIncorrectly': {
      const { questions, currentQuestion, answeredIncorrectly, answers } = state;
      return {
        ...state,
        currentQuestion: Math.min(questions.length, currentQuestion + 1),
        answeredIncorrectly: [...answeredIncorrectly, currentQuestion],
        answers: [...answers, payload as string],
      };
    }
    case 'reset':
      return initialValue;
    default: {
      throw new Error(`Invalid action: ${action.type}`);
    }
  }
};
