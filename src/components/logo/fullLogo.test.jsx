import React from 'react';
import { render, cleanup } from '@testing-library/react';
import FullLectureGogglesLogo from './fullLogo';

afterEach(cleanup);

it('Renders a default of 100px x 50px', () => {
  const { container } = render(<FullLectureGogglesLogo />);
  expect(container.innerHTML).toMatch(/<svg.*width="100" height="50".*/);
});

it('Renders a specified width', () => {
  const { container } = render(<FullLectureGogglesLogo width={456} />);
  expect(container.innerHTML).toMatch(/<svg.*width="456".*/);
});

it('Renders a specified height', () => {
  const { container } = render(<FullLectureGogglesLogo height={456} />);
  expect(container.innerHTML).toMatch(/<svg.*height="456".*/);
});
