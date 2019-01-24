import React from 'react';
import { createMemoryHistory } from 'history';
import { render, fireEvent } from 'react-testing-library';
import { Router } from 'react-router-dom';
import LandingPage from './LandingPage';

function renderWithRouter(ui, { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {}) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history
  };
}

it('Resizes the window correctly.', () => {
  const { container } = renderWithRouter(<LandingPage />);
  console.log(container);
});
