import React from 'react';
import { render, cleanup, fireEvent, waitForElement } from 'react-testing-library';
import SignUp from './SignUp';

afterEach(cleanup);

it('Renders a hamburger menu before 768px', () => {
  global.innerWidth = 767;
  const { queryByTestId } = render(<SignUp />);
  expect(queryByTestId(/hamburger-button/gm)).not.toBeNull();
});

it('Renders a hamburger menu at 768px', () => {
  global.innerWidth = 768;
  const { queryByTestId } = render(<SignUp />);
  expect(queryByTestId(/hamburger-button/gm)).toBeNull();
});

it('Renders an error when I type in an incorrect first name', async () => {
  const { queryByTestId } = render(<SignUp />);
  fireEvent.change(queryByTestId('first-name-input'), { target: { value: '---' } });
  await waitForElement(() => queryByTestId('first-name-error'));

  expect(queryByTestId('first-name-error')).not.toBeNull();
});
