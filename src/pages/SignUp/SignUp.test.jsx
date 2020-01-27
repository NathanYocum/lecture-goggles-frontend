/* eslint-disable no-console */
import React from 'react';
import { render, cleanup, fireEvent, waitForElement, wait } from '@testing-library/react';
// import axios from 'axios';

import SignUp from './SignUp';
import AuthContext from '../../contexts/AuthContext';
import 'jest-dom/extend-expect';

afterEach(cleanup);
jest.mock('axios');
jest.mock('react-router-dom');

const renderSignUp = value => (
  <AuthContext.Provider value={{ signedInAs: value, setUser: () => {} }}>
    <SignUp />
  </AuthContext.Provider>
);

it('Renders an error when I type in an incorrect first name', async () => {
  const { queryByTestId } = render(renderSignUp(''));
  fireEvent.change(queryByTestId('first-name-input'), { target: { value: '---' } });
  await waitForElement(() => queryByTestId('first-name-error'));

  expect(queryByTestId('first-name-error')).not.toBeNull();
  expect(queryByTestId('continue-button')).toHaveAttribute('disabled');
});

it('Renders an error when I type in an incorrect last name', async () => {
  const { queryByTestId } = render(renderSignUp(''));
  fireEvent.change(queryByTestId('last-name-input'), { target: { value: '---' } });
  await waitForElement(() => queryByTestId('last-name-error'));

  expect(queryByTestId('last-name-error')).not.toBeNull();
  expect(queryByTestId('continue-button')).toHaveAttribute('disabled');
});

it('Renders an error when I type in an incorrect email', async () => {
  const { queryByTestId } = render(renderSignUp(''));
  fireEvent.change(queryByTestId('email-input'), { target: { value: '---' } });
  fireEvent.change(queryByTestId('confirm-email-input'), { target: { value: '---' } });
  await waitForElement(() => queryByTestId('email-error'));
  await waitForElement(() => queryByTestId('confirm-email-error'));

  expect(queryByTestId('email-error')).not.toBeNull();
  expect(queryByTestId('confirm-email-error')).not.toBeNull();
  expect(queryByTestId('continue-button')).toHaveAttribute('disabled');
});

it('Renders an error with two correct emails, and the error disappears after the emails match', async () => {
  const { queryByTestId } = render(renderSignUp(''));
  fireEvent.change(queryByTestId('email-input'), { target: { value: 'example@example.com' } });
  fireEvent.change(queryByTestId('confirm-email-input'), { target: { value: 'test@test.com' } });
  await waitForElement(() => queryByTestId('email-error'));
  await waitForElement(() => queryByTestId('confirm-email-error'));

  expect(queryByTestId('email-error')).not.toBeNull();
  expect(queryByTestId('email-error').innerHTML).toMatch('Emails do not match');
  expect(queryByTestId('confirm-email-error')).not.toBeNull();
  expect(queryByTestId('confirm-email-error').innerHTML).toMatch('Emails do not match');
  expect(queryByTestId('continue-button')).toHaveAttribute('disabled');

  fireEvent.change(queryByTestId('confirm-email-input'), { target: { value: 'example@example.com' } });
  // Wait until the error goes away
  await wait(() => expect(queryByTestId('email-error')).toBeNull());
  expect(queryByTestId('email-error')).toBeNull();
  expect(queryByTestId('confirm-email-error')).toBeNull();
});

it('Renders an error when password is < 6 characters', async () => {
  const { getByTestId } = render(renderSignUp(''));
  fireEvent.change(getByTestId('password-input'), { target: { value: '!1A' } });
  fireEvent.change(getByTestId('confirm-password-input'), { target: { value: '!1A' } });
  await waitForElement(() => getByTestId('confirm-password-error'));
  await waitForElement(() => getByTestId('password-error'));

  expect(getByTestId('password-error')).not.toBeNull();
  expect(getByTestId('password-error').innerHTML).toMatch('Password must be at least 6 characters long');
  expect(getByTestId('confirm-password-error')).not.toBeNull();
  expect(getByTestId('confirm-password-error').innerHTML).toMatch('Password must be at least 6 characters long');
  expect(getByTestId('continue-button')).toHaveAttribute('disabled');
});

it('Renders an error when passwords do not match, that disappears when the passwords do match', async () => {
  const { queryByTestId, getByTestId } = render(renderSignUp(''));
  fireEvent.change(getByTestId('password-input'), { target: { value: 'password123!' } });
  fireEvent.change(getByTestId('confirm-password-input'), { target: { value: '123password!' } });
  await waitForElement(() => [getByTestId('confirm-password-error'), getByTestId('password-error')]);

  expect(getByTestId('password-error')).not.toBeNull();
  expect(getByTestId('password-error').innerHTML).toMatch('Passwords do not match');
  expect(getByTestId('confirm-password-error')).not.toBeNull();
  expect(getByTestId('confirm-password-error').innerHTML).toMatch('Passwords do not match');
  expect(getByTestId('continue-button')).toHaveAttribute('disabled');
  fireEvent.change(getByTestId('confirm-password-input'), { target: { value: 'password123!' } });
  await wait(() => expect(queryByTestId('password-error')).not.toBeInTheDocument());
});

it('Renders an error when no institution is included', async () => {
  const { queryByTestId } = render(renderSignUp(''));
  fireEvent.change(queryByTestId('institution-input'), { target: { value: ' ' } });
  fireEvent.change(queryByTestId('institution-input'), { target: { value: '' } });
  await waitForElement(() => queryByTestId('institution-error'));
  expect(queryByTestId('institution-error').innerHTML).toMatch('Required');
});

// it('Does not render any errors when the form is filled out correctly', async () => {
//   const { queryByTestId, getByTestId } = render(renderSignUp(''));
//   fireEvent.change(getByTestId('user-name-input'), { target: { value: 'JohnDoe' } });
//   fireEvent.change(getByTestId('first-name-input'), { target: { value: 'John' } });
//   fireEvent.change(getByTestId('last-name-input'), { target: { value: 'Doe' } });
//   fireEvent.change(getByTestId('email-input'), { target: { value: 'example@example.com' } });
//   fireEvent.change(getByTestId('confirm-email-input'), { target: { value: 'example@example.com' } });
//   fireEvent.change(getByTestId('password-input'), { target: { value: 'password123!' } });
//   fireEvent.change(getByTestId('confirm-password-input'), { target: { value: 'password123!' } });
//   fireEvent.change(getByTestId('institution-input'), { target: { value: 'university of nevada, reno' } });
//   await wait(() => expect(queryByTestId(/.*-error/gm)).toBeNull());
//   expect(getByTestId('continue-button')).not.toHaveAttribute('disabled');
// });

// it('Lets me choose whether I am an instructor or not', () => {
//   const { queryByTestId } = render(renderSignUp(''));
//   expect(queryByTestId('yes-confirmInstructor').value).toBe('yes-confirmInstructor');
//   expect(queryByTestId('yes-confirmInstructor')).not.toHaveAttribute('checked');
//   expect(queryByTestId('no-confirmInstructor').value).toBe('no-confirmInstructor');
//   expect(queryByTestId('no-confirmInstructor')).toHaveAttribute('checked');
//   // We put the confirm instructor value in the group label.
//   // This is just a good way to keep track of it -- may change
//   expect(queryByTestId('confirmInstructor')).toHaveAttribute('value', 'no-confirmInstructor');
//   fireEvent.click(queryByTestId('yes-confirmInstructor'));
//   expect(queryByTestId('confirmInstructor')).toHaveAttribute('value', 'yes-confirmInstructor');
// });

// it('Makes a post to /users/signup request on form submission', async () => {
//   console.log(
//     'There is an error with react-dom and hooks when testing. See: https://github.com/facebook/react/issues/14769#issuecomment-470097212'
//   );

//   // Mocking this until fixed
//   console.error = jest.fn();

//   const { queryByTestId } = render(renderSignUp(''));
//   fireEvent.change(queryByTestId('user-name-input'), { target: { value: 'JohnDoe' } });
//   fireEvent.change(queryByTestId('first-name-input'), { target: { value: 'John' } });
//   fireEvent.change(queryByTestId('last-name-input'), { target: { value: 'Doe' } });
//   fireEvent.change(queryByTestId('email-input'), { target: { value: 'example@example.com' } });
//   fireEvent.change(queryByTestId('confirm-email-input'), { target: { value: 'example@example.com' } });
//   fireEvent.change(queryByTestId('password-input'), { target: { value: 'password123!' } });
//   fireEvent.change(queryByTestId('confirm-password-input'), { target: { value: 'password123!' } });
//   fireEvent.change(queryByTestId('institution-input'), { target: { value: 'University of Nevada, Reno' } });

//   axios.post.mockResolvedValue({ data: true });
//   await wait(() => expect(queryByTestId('continue-button')).not.toHaveAttribute('disabled')).then(() => {
//     fireEvent.click(queryByTestId('continue-button'));
//   });
//   await wait(() =>
//     expect(axios.post).toHaveBeenCalledWith('https://api.lecturegoggles.io/v1/users/signup/', {
//       email: 'example@example.com',
//       password: 'password123!',
//       firstname: 'John',
//       lastname: 'Doe',
//       school: 'University of Nevada, Reno',
//       username: 'JohnDoe',
//       is_teacher: false
//     })
//   );
// });
