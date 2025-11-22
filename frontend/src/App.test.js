import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Feedback System heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/Feedback System/i);
  expect(headingElement).toBeInTheDocument();
});
