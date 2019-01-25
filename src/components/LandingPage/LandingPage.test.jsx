import React from 'react';
import { render, cleanup } from 'react-testing-library';
import LandingPage from './LandingPage';

afterEach(cleanup);

it('Renders a sign in button', () => {
  const { getByText } = render(<LandingPage />);
  expect(getByText('SIGN IN')).toBeTruthy();
  expect(getByText('SIGN IN').parentElement.parentElement.innerHTML).toContain('href="/signIn"');
});

it("Renders a 'create an account' button", () => {
  const { getByText } = render(<LandingPage />);
  expect(getByText('CREATE AN ACCOUNT')).toBeTruthy();
  expect(getByText('CREATE AN ACCOUNT').parentElement.parentElement.innerHTML).toContain('href="/newAccount"');
});
