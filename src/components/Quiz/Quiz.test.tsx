/* eslint-disable react/jsx-props-no-spreading */
import { render } from '@testing-library/react';
import Quiz, { QuizView } from './Quiz';

const mockOnEnd = jest.fn();
const mockOnReset = jest.fn();
jest.mock('@/application/appContext', () => ({
  useAppContext: () => ({
    onEnd: mockOnEnd,
    onReset: mockOnReset,
  }),
}));

const mockSetLoading = jest.fn();
const setErrorMock: jest.Mock = jest.fn();
const loadQuestionsMock: jest.Mock = jest.fn();
const onAnswerMock: jest.Mock = jest.fn();
jest.mock('@/domain/quiz', () => ({
  useQuiz: () => ({
    setLoading: mockSetLoading,
    setError: setErrorMock,
    loadQuestions: loadQuestionsMock,
    onAnswer: onAnswerMock,
  }),
}));

const mockGetQuesions = jest.fn();
jest.mock('@/domain/questionsService', () => {
  const exps = {
    getQuestions: async (...args: any[]) => mockGetQuesions(...args),
  };
  return exps;
});

const mockQuestion = {
  category: 'Entertainment: Video Games',
  type: 'boolean',
  difficulty: 'hard',
  question: 'Unturned originally started as a Roblox game.',
  correct_answer: 'True',
  incorrect_answers: ['False'],
};

describe('Quiz view', () => {
  test('should show Spinner on idle', async () => {
    const props = {
      status: 'idle' as const,
      goHome: () => {},
      question: mockQuestion,
      totalQuestions: 0,
      questionNumber: 0,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onAnswer: (a: string) => {},
    };
    const { container } = render(<QuizView {...props} />);
    expect(container.querySelector('.spinner')).toBeInTheDocument();
  });
  test('should show Spinner on loading', async () => {
    const props = {
      status: 'loading' as const,
      goHome: () => {},
      question: mockQuestion,
      totalQuestions: 0,
      questionNumber: 0,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onAnswer: (a: string) => {},
    };
    const { container } = render(<QuizView {...props} />);
    expect(container.querySelector('.spinner')).toBeInTheDocument();  });
  test('should show ErrorMessage on error', async () => {
    const props = {
      status: 'error' as const,
      errorMessage: 'Failed to fetch',
      goHome: () => {},
      question: mockQuestion,
      totalQuestions: 0,
      questionNumber: 0,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onAnswer: (a: string) => {},
    };
    const { container } = render(<QuizView {...props} />);
    expect(container.querySelector('pre')?.textContent).toBe('Failed to fetch');
  });
  test('should show Question on success', async () => {
    const props = {
      status: 'success' as const,
      goHome: () => {},
      question: mockQuestion,
      totalQuestions: 0,
      questionNumber: 0,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onAnswer: (a: string) => {},
    };
    const { container } = render(<QuizView {...props} />);

    expect(container.querySelector('.question')?.textContent).toBe(mockQuestion.question);
  });
});
