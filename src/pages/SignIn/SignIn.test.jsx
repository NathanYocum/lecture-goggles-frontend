/* eslint-disable no-console */
import React from 'react';
import { render, cleanup, fireEvent, wait } from '@testing-library/react';
import axios from 'axios';

import SignIn from './SignIn';
import AuthContext from '../../contexts/AuthContext';

import 'jest-dom/extend-expect';

afterEach(cleanup);
jest.mock('axios');
jest.mock('react-router-dom');

describe('Behavior when not logged in', () => {
  const renderFunction = () => (
    <AuthContext.Provider value={{ signedInAs: '', setUser: () => {} }}>
      <SignIn />
    </AuthContext.Provider>
  );

  it('Renders an error when I enter an invalid email', async () => {
    const { queryByTestId } = render(renderFunction());
    fireEvent.change(queryByTestId('sign-in-email-input'), { target: { value: 'John' } });
    await wait(() => expect(queryByTestId('sign-in-email-error')).toBeInTheDocument());
  });

  it('Does not render an error when I enter an valid email', async () => {
    const { queryByTestId } = render(renderFunction());
    fireEvent.change(queryByTestId('sign-in-email-input'), { target: { value: 'John@Deer.com' } });
    await wait(() => expect(queryByTestId('sign-in-email-error')).not.toBeInTheDocument());
  });

  it('Makes a post on submission, then saves the JWT to localStorage', async () => {
    const { queryByTestId } = render(renderFunction());
    const { email, password } = { email: 'John@Deer.com', password: 'password123!' };
    fireEvent.change(queryByTestId('sign-in-email-input'), { target: { value: email } });
    fireEvent.change(queryByTestId('sign-in-password-input'), { target: { value: password } });

    console.error = jest.fn();

    axios.post.mockResolvedValue({ data: { access_token: 'some_jwt' } });
    axios.get.mockResolvedValue({ data: { logged_in_as: 'JohnDeer' } });

    await wait(() => expect(queryByTestId('sign-in-submit')).not.toHaveAttribute('disabled')).then(() => {
      fireEvent.click(queryByTestId('sign-in-submit'));
    });
    await wait(() =>
      expect(axios.post).toHaveBeenCalledWith('https://api.lecturegoggles.io/v1/users/login/', { email, password })
    ).then(() => {
      expect(localStorage.getItem('token')).toBe('some_jwt');
      expect(axios.get).toHaveBeenCalledWith('https://api.lecturegoggles.io/v1/users/auth/', {
        headers: { Authorization: 'Bearer some_jwt' }
      });
    });
  });
});

describe('Behavior while logged in', () => {
  const renderFunction = () => (
    <AuthContext.Provider value={{ signedInAs: 'JaneDoe', setUser: () => {} }}>
      <SignIn />
    </AuthContext.Provider>
  );

  it('Asks me to logout if I am signed in', () => {
    const { queryByTestId } = render(renderFunction());
    expect(queryByTestId('confirm-logout-button')).toBeInTheDocument();
    expect(queryByTestId('cancel-logout-button')).toBeInTheDocument();
  });

  it('Deletes my token if I press on the logout button', async () => {
    const { queryByTestId } = render(renderFunction());
    localStorage.setItem('token', 'some_jwt_here');
    expect(localStorage.getItem('token')).toMatch(/some_jwt_here/);
    fireEvent.click(queryByTestId('confirm-logout-button'));
    expect(localStorage.getItem('token')).toBeNull();
  });
});
