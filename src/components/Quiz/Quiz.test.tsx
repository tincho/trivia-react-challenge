import { render } from '@testing-library/react';
import Quiz from './Quiz';

describe('Quiz component', () => {
  test('render', async () => {
    const { container } = render(<Quiz />);
  });
});
