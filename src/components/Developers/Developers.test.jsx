import 'jest-styled-components';
import React from 'react';
import { render } from 'react-testing-library';
import DevelopersPage from './Developers';

it('Matches the snapshot', () => {
  const { container } = render(<DevelopersPage />);
  expect(container.innerHTML).toMatchSnapshot();
});
