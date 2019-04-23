/**
 * @file App.test.jsx
 * @brief The app test file will test that all of the routes work and that they
 *        render the correct components on navigation.
 */

import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, cleanup } from 'react-testing-library';
import App from './App';
import AuthContext from './contexts/AuthContext';

function renderWithRouter(ui, { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {}) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history
  };
}

afterEach(cleanup);

describe('Application routes', () => {
  it('Renders a landing page on home', () => {
    const { queryByTestId } = renderWithRouter(
      <AuthContext.Provider value={{ userData: { is_staff: false } }}>
        <App />
      </AuthContext.Provider>
    );
    expect(queryByTestId('landing-page')).not.toBeNull();
  });

  it('Routes to SignIn on /signIn', () => {
    const { queryByTestId } = renderWithRouter(<App />, { route: '/signIn' });
    expect(queryByTestId('sign-in')).not.toBeNull();
  });

  it('Routes to New Account on /newAccount', () => {
    const { queryByTestId } = renderWithRouter(<App />, { route: '/newAccount' });
    expect(queryByTestId('sign-up')).not.toBeNull();
  });

  it('Routes to Subjects on /subjects', () => {
    const { queryByTestId } = renderWithRouter(<App />, { route: '/subjects' });
    expect(queryByTestId('subjects')).not.toBeNull();
  });

  it('Routes to Topics on /topics', () => {
    const { queryByTestId } = renderWithRouter(<App />, { route: '/topics' });
    expect(queryByTestId('topics')).not.toBeNull();
  });

  it('Routes to Resources on /resources', () => {
    const { queryByTestId } = renderWithRouter(<App />, { route: '/resources' });
    expect(queryByTestId('resources')).not.toBeNull();
  });

  it('Routes to Developers on /developers', () => {
    const { queryByTestId } = renderWithRouter(<App />, { route: '/developers' });
    expect(queryByTestId('developers')).not.toBeNull();
  });

  // it('Routes to Account on /account', () => {
  //   const { queryByTestId } = renderWithRouter(<App />, { route: '/account' });
  //   expect(queryByTestId('account')).not.toBeNull();
  // });

  it('Routes to Upload on /upload', () => {
    const { queryByTestId } = renderWithRouter(<App />, { route: '/upload' });
    expect(queryByTestId('upload')).not.toBeNull();
  });

  it('Routes to NotFound on an unknown route', () => {
    const { queryByTestId } = renderWithRouter(<App />, { route: '/asdfasdf' });
    expect(queryByTestId('not-found')).not.toBeNull();
  });
});
