import React from 'react';
import { render, cleanup, fireEvent, wait } from 'react-testing-library';
import SignIn from './SignIn';
import 'jest-dom/extend-expect';

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

it('Renders an error when I enter an invalid email', async () => {
  const { queryByTestId } = render(<SignIn />);
  fireEvent.change(queryByTestId('sign-in-email-input'), { target: { value: 'John' } });
  await wait(() => expect(queryByTestId('sign-in-email-error')).toBeInTheDocument());
});

it('Does not render an error when I enter an valid email', async () => {
  const { queryByTestId } = render(<SignIn />);
  fireEvent.change(queryByTestId('sign-in-email-input'), { target: { value: 'John@Deer.com' } });
  await wait(() => expect(queryByTestId('sign-in-email-error')).not.toBeInTheDocument());
});
