import React from 'react';
import { cleanup, render } from '@testing-library/react';
import LectureGogglesLogo from './logo';

afterEach(cleanup);

it('Renders a 50px x 50px logo by default', () => {
  const { container } = render(<LectureGogglesLogo />);
  expect(container.innerHTML).toMatch(/<svg.*width="50" height="50".*/);
});

it('Renders a specified width', () => {
  const { container } = render(<LectureGogglesLogo width={5000} />);
  expect(container.innerHTML).toMatch(/<svg.*width="5000".*/);
});

it('Renders a specified height', () => {
  const { container } = render(<LectureGogglesLogo height={2575} />);
  expect(container.innerHTML).toMatch(/<svg.*height="2575".*/);
});
