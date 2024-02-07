import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Header from '../components/Header';

test('clicking on "Log out" or "Sign in" link triggers the logout function when user is logged in', () => {
  // Mock localStorage.getItem to simulate a logged-in user
  const originalLocalStorage = { ...global.localStorage };
  global.localStorage.getItem = jest.fn(() => 'mockAccessToken');

  render(<Header />);
  fireEvent.click(screen.getByText('Log out'));

  // Restore original localStorage
  global.localStorage = originalLocalStorage;
});
