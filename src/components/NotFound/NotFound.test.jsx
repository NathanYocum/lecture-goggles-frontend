import React from 'react';
import { cleanup, render } from 'react-testing-library';
import NotFound from './NotFound';

afterEach(cleanup);

it('Renders a hamburger menu when the window is smaller than 768px', () => {
  global.innerWidth = 767;
  const { queryByTestId } = render(<NotFound />);
  expect(queryByTestId('hamburger-button')).not.toBeNull();
});

it('Renders a hamburger menu when the window is >= 768px', () => {
  global.innerWidth = 768;
  const { queryByTestId } = render(<NotFound />);
  expect(queryByTestId('hamburger-button')).toBeNull();
});
