import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import GenericButton from './button';

afterEach(cleanup);

it('Add an onClick function to the button', () => {
  const fn = jest.fn();
  const { getByRole } = render(<GenericButton text="ok" onClickFunction={fn} />);
  fireEvent.click(getByRole('button'), { button: 0 });
  expect(fn).toHaveBeenCalledTimes(1);
});
