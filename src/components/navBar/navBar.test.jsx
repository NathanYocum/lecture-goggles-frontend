import React from 'react';
import { render, cleanup } from 'react-testing-library';
import NavBar from './navBar';

afterEach(cleanup);

it("Doesn't render a hamburger menu by default", () => {
  const { queryByTestId } = render(<NavBar />);
  expect(queryByTestId('hamburger-button')).toBeNull();
});

it('Renders a hamburger menu when renderButton is ture', () => {
  // Use a similar approach to how we expect the navbar would be used
  global.innerWidth = 320;
  const { getByTestId } = render(<NavBar renderButton={window.innerWidth < 768} />);
  expect(getByTestId('hamburger-button')).not.toBeNull();
});
