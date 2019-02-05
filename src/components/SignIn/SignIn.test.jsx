import React from 'react';
import { render, cleanup } from 'react-testing-library';
import SignIn from './SignIn';

afterEach(cleanup);

it('Renders a hamburger menu before 768px', () => {
  global.innerWidth = 767;
  const { queryByTestId } = render(<SignIn />);
  expect(queryByTestId(/hamburger-button/gm)).not.toBeNull();
});

it('Renders a hamburger menu at 768px', () => {
  global.innerWidth = 768;
  const { queryByTestId } = render(<SignIn />);
  expect(queryByTestId(/hamburger-button/gm)).toBeNull();
});
