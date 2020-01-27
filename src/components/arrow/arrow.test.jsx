import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import ArrowButton from './arrow';

afterEach(cleanup);

it('Add an onClick function to the button', () => {
  const fn = jest.fn();
  const { queryByTestId } = render(<ArrowButton onClickFunction={fn} />);
  fireEvent.click(queryByTestId('arrow-button'), { button: 0 });
  expect(fn).toHaveBeenCalledTimes(1);
});
