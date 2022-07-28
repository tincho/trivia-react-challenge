import { render, screen } from '@testing-library/react';
import App from './App';

describe('Render the app correctly', () => {
  test('should render main container', async () => {
    render(<App />);

    const app = await screen.findByTestId('app');

    expect(app).toBeInTheDocument();
  });
});
