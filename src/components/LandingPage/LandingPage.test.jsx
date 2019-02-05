import React from 'react';
import { render, cleanup } from 'react-testing-library';
import LandingPage from './LandingPage';

afterEach(cleanup);

it('Renders a sign in button', () => {
  const { getByText } = render(<LandingPage />);
  expect(getByText('SIGN IN')).toBeTruthy();
  expect(getByText('SIGN IN').parentElement.outerHTML).toContain('href="/signIn"');
});

it("Renders a 'create an account' button", () => {
  const { getByText } = render(<LandingPage />);
  expect(getByText('CREATE AN ACCOUNT')).toBeTruthy();
  expect(getByText('CREATE AN ACCOUNT').parentElement.outerHTML).toContain('href="/newAccount"');
});

it('Renders a hamburger menu before 768px', () => {
  global.innerWidth = 767;
  const { queryByTestId } = render(<LandingPage />);
  expect(queryByTestId(/hamburger-button/gm)).not.toBeNull();
});

it('Renders a hamburger menu at 768px', () => {
  global.innerWidth = 768;
  const { queryByTestId } = render(<LandingPage />);
  expect(queryByTestId(/hamburger-button/gm)).toBeNull();
});
