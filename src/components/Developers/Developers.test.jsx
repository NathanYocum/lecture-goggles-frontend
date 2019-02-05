import 'jest-styled-components';
import React from 'react';
import { render, cleanup } from 'react-testing-library';
import DevelopersPage from './Developers';

afterEach(cleanup);

it('Matches the snapshot', () => {
  const { container } = render(<DevelopersPage />);
  expect(container.innerHTML).toMatchSnapshot();
});

it('Renders a hamburger menu before 768px', () => {
  global.innerWidth = 767;
  const { queryByTestId } = render(<DevelopersPage />);
  expect(queryByTestId(/hamburger-button/gm)).not.toBeNull();
});

it('Renders a hamburger menu at 768px', () => {
  global.innerWidth = 768;
  const { queryByTestId } = render(<DevelopersPage />);
  expect(queryByTestId(/hamburger-button/gm)).toBeNull();
});
