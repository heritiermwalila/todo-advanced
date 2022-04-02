import { render, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import React from 'react';
import { TodoBody } from '.';

const server = setupServer(
    rest.get('/todos', (req, res, ctx) => {
      return res(ctx.json([{id:1, name: 'My todo', status: 'Incomplete'}]))
    }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('renders TodoBody Component with no todo', () => {
  render(<TodoBody {...{filter: 'All'}}/>);
  const placeholder = screen.getByText(/No todo/i);
  expect(placeholder).toBeInTheDocument();
});