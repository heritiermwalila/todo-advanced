import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import {AddTodo} from '.';
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import { act } from 'react-dom/test-utils';

const server = setupServer(
    rest.get('/todos', (req, res, ctx) => {
      return res(ctx.json([{id:1, name: 'My todo', status: 'Incomplete'}]))
    }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('renders AddTodo Component', () => {
  render(<AddTodo />);
  const placeholder = screen.getByPlaceholderText(/Create a new todo/i);
  expect(placeholder).toBeInTheDocument();
});

test('Should add a new todo', () => {
    // const onSubmit = jest.fn();
    act(() => {
        render(<AddTodo />);
    })
    act(() => {
        fireEvent.change(screen.getByPlaceholderText(/Create a new todo/i), {target: {value: 'New todo'}})
        // fireEvent.keyDown(document.getElementsByTagName('input')[0], {key: 'Enter', code: 'Enter'})
    })

    // act(() => {
    //     fireEvent.keyDown(document.getElementsByTagName('input')[0], {key: 'Enter', code: 'Enter'})
    // })
    // expect(onSubmit).toHaveBeenCalled()

})
