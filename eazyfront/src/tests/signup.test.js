import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Signup from '../components/signup';

const server = setupServer(
  rest.post('http://localhost:3005/customers/signup', (req, res, ctx) => {
    return res(ctx.json({ message: 'Signup successful' }), ctx.status(200));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders Signup component', () => {
  render(<Signup />);
  // Add more specific assertions based on your component's content and structure
  expect(screen.getByText(/Sign up/i)).toBeInTheDocument();
});

test('signup form submission', async () => {
  render(<Signup />);

  // Fill out the form
  fireEvent.change(screen.getByPlaceholderText(/Name/i), { target: { value: 'John Doe' } });
  fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'john.doe@example.com' } });
  fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'password123' } });

  // Mock the successful API response
  server.use(
    rest.post('http://localhost:3005/customers/signup', (req, res, ctx) => {
      return res(ctx.json({ message: 'Signup successful' }), ctx.status(200));
    })
  );

  // Trigger the form submission
  fireEvent.click(screen.getByText(/Sign Up/i));

  // Wait for the API call to complete and the navigation to /login
  await waitFor(() => expect(screen.getByText(/Log in/i)).toBeInTheDocument());
});

test('already have an account link navigates to login', () => {
  render(<Signup />);

  fireEvent.click(screen.getByText(/Log in/i));

  // Add assertions based on your navigation logic
  // For example, you can check if the navigation link leads to /login
});
