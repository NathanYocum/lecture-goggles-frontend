import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import GenericButton from './button';

afterEach(cleanup);

it('Adds an onClick function to the button', () => {
  const fn = jest.fn();
  const { queryByTestId } = render(<GenericButton text="ok" onClickFunction={fn} />);
  fireEvent.click(queryByTestId('generic-button'), { button: 0 });
  expect(fn).toHaveBeenCalledTimes(1);
});
