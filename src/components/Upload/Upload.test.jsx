import React from 'react';
import { cleanup, render, fireEvent, wait } from 'react-testing-library';
import UploadPage from './Upload';
import 'jest-dom/extend-expect';

afterEach(cleanup);

it('Renders a hamburger menu when the window is smaller than 768px', () => {
  global.innerWidth = 767;
  const { queryByTestId } = render(<UploadPage />);
  expect(queryByTestId('hamburger-button')).not.toBeNull();
});

it('Renders a hamburger menu when the window is >= 768px', () => {
  global.innerWidth = 768;
  const { queryByTestId } = render(<UploadPage />);
  expect(queryByTestId('hamburger-button')).toBeNull();
});

it('Renders an error when I input an invalid URL', async () => {
  const { getByTestId } = render(<UploadPage />);
  fireEvent.change(getByTestId('url-upload-input'), { target: { value: 'hi mom!' } });
  await wait(() => expect(getByTestId('url-upload-error')).toBeInTheDocument());
  expect(getByTestId('url-upload-error').innerHTML).toMatch('Invalid URL');
});
