import React from 'react';
import { render, cleanup, fireEvent, wait } from 'react-testing-library';

import SignIn from './SignIn';
import AuthContext from '../../contexts/AuthContext';

import 'jest-dom/extend-expect';

afterEach(cleanup);

describe('Behavior when not logged in', () => {
  it('Renders an error when I enter an invalid email', async () => {
    const { queryByTestId } = render(
      <AuthContext.Provider value={{ signedInAs: '', setUser: () => {} }}>
        <SignIn />
      </AuthContext.Provider>
    );
    fireEvent.change(queryByTestId('sign-in-email-input'), { target: { value: 'John' } });
    await wait(() => expect(queryByTestId('sign-in-email-error')).toBeInTheDocument());
  });

  it('Does not render an error when I enter an valid email', async () => {
    const { queryByTestId } = render(
      <AuthContext.Provider value={{ signedInAs: '', setUser: () => {} }}>
        <SignIn />
      </AuthContext.Provider>
    );
    fireEvent.change(queryByTestId('sign-in-email-input'), { target: { value: 'John@Deer.com' } });
    await wait(() => expect(queryByTestId('sign-in-email-error')).not.toBeInTheDocument());
  });
});

describe('Behavior while logged in', () => {
  it('Asks me to logout if I am signed in', () => {
    const { queryByTestId } = render(
      <AuthContext.Provider value={{ signedInAs: 'JaneDoe', setUser: () => {} }}>
        <SignIn />
      </AuthContext.Provider>
    );
    expect(queryByTestId('confirm-logout-button')).toBeInTheDocument();
    expect(queryByTestId('cancel-logout-button')).toBeInTheDocument();
  });

  it('Deletes my token if I press on the logout button', async () => {
    const { queryByTestId } = render(
      <AuthContext.Provider value={{ signedInAs: 'JaneDoe', setUser: () => {} }}>
        <SignIn />
      </AuthContext.Provider>
    );
    localStorage.setItem('token', 'some_jwt_here');
    expect(localStorage.getItem('token')).toMatch(/some_jwt_here/);
    fireEvent.click(queryByTestId('confirm-logout-button'));
    expect(localStorage.getItem('token')).toBeNull();
  });
});
