/**
 * @file App.test.jsx
 * @brief The app test file will test that all of the routes work and that they
 *        render the correct components on navigation.
 */

import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, cleanup, fireEvent } from 'react-testing-library';
import App from './App';

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

it('Renders a landing page on home', () => {
  const { queryByTestId } = renderWithRouter(<App />);
  expect(queryByTestId('landing-page')).not.toBeNull();
});

it('Navigates to /signIn when I press the SignIn button', () => {
  const { queryByTestId } = renderWithRouter(<App />);
  fireEvent.click(queryByTestId(/sign-in-button/gm).firstChild, { button: 0 });
  // expect(queryByTestId('sign-in')).not.toBeNull();
});

it('Navigates to /newAccount when I press SignUp button', () => {});
