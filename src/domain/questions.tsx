import { Reducer } from 'react';
import type { QuestionData } from './questionsService';

type QuizState = {
  status: 'idle' | 'loading' | 'success' | 'error';
  questions: QuestionData[];
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
  questions: [],
  currentQuestion: 0,
  answeredCorrectly: [],
  answeredIncorrectly: [],
};

export const questionsReducer: Reducer<QuizState, QuizStateAction> = (state, action) => {
  if (!action) throw Error();
  const { type, payload } = action;
  switch (type) {
    case 'loading':
      return {
        ...state,
        status: 'loading',
      };
    case 'loadQuestions':
      return {
        ...state,
        status: 'success',
        questions: payload as QuestionData[],
      };
    case 'error':
      return {
        ...state,
        status: 'error',
      };
    case 'answerCorrectly': {
      const { questions, currentQuestion, answeredCorrectly } = state;
      return {
        ...state,
        currentQuestion: Math.min(questions.length, currentQuestion + 1),
        answeredCorrectly: [...answeredCorrectly, currentQuestion],
      };
    }
    case 'answerIncorrectly': {
      const { questions, currentQuestion, answeredIncorrectly } = state;
      return {
        ...state,
        currentQuestion: Math.min(questions.length, currentQuestion + 1),
        answeredIncorrectly: [...answeredIncorrectly, currentQuestion],
      };
    }
    case 'reset':
      return initialValue;
    default: {
      throw new Error(`Invalid action: ${action.type}`);
    }
  }
};
