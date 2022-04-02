import { render, screen } from '@testing-library/react';
import React from 'react';
import { TodoFooter } from '.';



test('renders TodoBody Component with no todo', () => {
  render(<TodoFooter {...{filter: 'All'}}/>);
  const allBtn = screen.getByText(/All/i);
  expect(allBtn).toBeInTheDocument();
});