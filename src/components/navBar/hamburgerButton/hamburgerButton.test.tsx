import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import HamburgerButton from './hamburgerButton';

afterEach(cleanup);

it('Adds an onClick function to the button', () => {
  const fn = jest.fn();
  const { getByRole } = render(<HamburgerButton onClickFunction={fn} />);
  fireEvent.click(getByRole('button'), { button: 0 });
  expect(fn).toHaveBeenCalledTimes(1);
});
