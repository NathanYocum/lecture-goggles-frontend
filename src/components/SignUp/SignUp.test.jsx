import React from 'react';
import { render, cleanup, fireEvent, waitForElement } from 'react-testing-library';
import SignUp from './SignUp';
import 'jest-dom/extend-expect';

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
  expect(queryByTestId('continue-button')).toHaveAttribute('disabled');
});

it('Renders an error when I type in an incorrect last name', async () => {
  const { queryByTestId } = render(<SignUp />);
  fireEvent.change(queryByTestId('last-name-input'), { target: { value: '---' } });
  await waitForElement(() => queryByTestId('last-name-error'));

  expect(queryByTestId('last-name-error')).not.toBeNull();
  expect(queryByTestId('continue-button')).toHaveAttribute('disabled');
});

it('Renders an error when I type in an incorrect email', async () => {
  const { queryByTestId } = render(<SignUp />);
  fireEvent.change(queryByTestId('email-input'), { target: { value: '---' } });
  fireEvent.change(queryByTestId('confirm-email-input'), { target: { value: '---' } });
  await waitForElement(() => queryByTestId('email-error'));
  await waitForElement(() => queryByTestId('confirm-email-error'));

  expect(queryByTestId('email-error')).not.toBeNull();
  expect(queryByTestId('confirm-email-error')).not.toBeNull();
  expect(queryByTestId('continue-button')).toHaveAttribute('disabled');
});

it('Renders an error when I type in two incorrect emails', async () => {
  const { queryByTestId } = render(<SignUp />);
  fireEvent.change(queryByTestId('email-input'), { target: { value: 'exammple@example.com' } });
  fireEvent.change(queryByTestId('confirm-email-input'), { target: { value: 'test@test.com' } });
  await waitForElement(() => queryByTestId('email-error'));
  await waitForElement(() => queryByTestId('confirm-email-error'));

  expect(queryByTestId('email-error')).not.toBeNull();
  expect(queryByTestId('email-error').innerHTML).toMatch('Emails do not match');
  expect(queryByTestId('confirm-email-error')).not.toBeNull();
  expect(queryByTestId('confirm-email-error').innerHTML).toMatch('Emails do not match');
  expect(queryByTestId('continue-button')).toHaveAttribute('disabled');
});

it('Does not render an error when emails are valid', async () => {
  const { queryByTestId } = render(<SignUp />);
  fireEvent.change(queryByTestId('email-input'), { target: { value: 'example@example.com' } });
  fireEvent.change(queryByTestId('confirm-email-input'), { target: { value: 'example@examle.com' } });

  expect(queryByTestId('email-error')).toBeNull();
  expect(queryByTestId('confirm-email-error')).toBeNull();
  expect(queryByTestId('continue-button')).not.toHaveAttribute('disabled');
});
