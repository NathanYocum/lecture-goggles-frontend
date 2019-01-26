import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import ArrowButton from './arrow';

afterEach(cleanup);

it('Add an onClick function to the button', () => {
  const fn = jest.fn();
  const { getByRole } = render(<ArrowButton onClickFunction={fn} />);
  fireEvent.click(getByRole('button'), { button: 0 });
  expect(fn).toHaveBeenCalledTimes(1);
});
