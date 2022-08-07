import { render, fireEvent } from '@testing-library/react';
import ErrorMessage from './ErrorMessage';

describe('ErrorMessage component', () => {
  test('should show message if provided', async () => {
    const { container } = render(<ErrorMessage message="Lorem ipsum" />);
    expect(container.querySelector('pre')?.textContent).toBe('Lorem ipsum');
  });
  test('should call goHome on click the buton', async () => {
    const goHome = jest.fn();
    const { container } = render(<ErrorMessage goHome={goHome} />);
    fireEvent.click(container.querySelector('button') as HTMLButtonElement);
    expect(goHome).toBeCalled();
  });
});
