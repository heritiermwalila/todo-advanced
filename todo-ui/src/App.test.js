import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Drag and drop to reorder list/i);
  expect(linkElement).toBeInTheDocument();
});
