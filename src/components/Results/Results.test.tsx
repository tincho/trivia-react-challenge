import { render, fireEvent } from '@testing-library/react';
import { ResultsView } from './Results';

// mock appcontext
const mockReset = jest.fn();

const mockQuestions = [
  {
    question: 'hello',
    answer: 'world',
    correct: true,
  },
  {
    question: 'world',
    answer: 'hello',
    correct: false,
  },
];

describe('Results view', () => {
  test('should show score', async () => {
    const { findByTestId } = render(<ResultsView score={10} playAgain={mockReset} questions={Array(10)} />);
    expect((await findByTestId('score')).textContent).toBe('10 of 10');
  });
  test('should show correct questions with + mark', async () => {
    const { container } = render(<ResultsView score={10} playAgain={mockReset} questions={mockQuestions} />);
    expect(container.querySelector('article .mark')?.textContent).toBe('+');
  });
  test('should show incorrect questions with - mark', async () => {
    const reversedQuestions = [...mockQuestions].reverse()
    const { container } = render(<ResultsView score={10} playAgain={mockReset} questions={reversedQuestions} />);
    expect(container.querySelector('article .mark')?.textContent).toBe('-');
  });
  test('should show user answers', async () => {
    const { container } = render(<ResultsView score={10} playAgain={mockReset} questions={mockQuestions} />);
    expect(container.querySelector('.answer')?.textContent).toBe('(You answered: world)');
  });
  test('should call onReset when click play again', async () => {
    const { container } = render(<ResultsView score={10} playAgain={mockReset} questions={mockQuestions} />);
    fireEvent.click(container.querySelector('.btn--play-again') as HTMLButtonElement);
    expect(mockReset).toHaveBeenCalled()
  });
});
