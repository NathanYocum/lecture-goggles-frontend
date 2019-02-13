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
  expect(getByTestId('submit-button')).toHaveAttribute('disabled');
});

it('Does not render an error when I input a valid URL', async () => {
  const { queryByTestId } = render(<UploadPage />);
  fireEvent.change(queryByTestId('url-upload-input'), { target: { value: 'https://www.github.com' } });
  await wait(() => expect(queryByTestId('url-upload-error')).not.toBeInTheDocument());
});

it('Renders an error when I do not put in a title', async () => {
  const { getByTestId } = render(<UploadPage />);
  fireEvent.change(getByTestId('title-upload-input'), { target: { value: ' ' } });
  fireEvent.change(getByTestId('title-upload-input'), { target: { value: '' } });
  await wait(() => expect(getByTestId('title-upload-error')).toBeInTheDocument());
  expect(getByTestId('title-upload-error').innerHTML).toMatch('Required');
  expect(getByTestId('submit-button')).toHaveAttribute('disabled');
});

it('Renders an error when I do not put in a title that is too long', async () => {
  const { getByTestId } = render(<UploadPage />);
  fireEvent.change(getByTestId('title-upload-input'), {
    target: { value: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' }
  });
  await wait(() => expect(getByTestId('title-upload-error')).toBeInTheDocument());
  expect(getByTestId('title-upload-error').innerHTML).toMatch("Titles can't be over 40 characters");
  expect(getByTestId('submit-button')).toHaveAttribute('disabled');
});

it('Does not render an error if a description is not included', async () => {
  const { queryByTestId } = render(<UploadPage />);
  fireEvent.change(queryByTestId('description-upload-input'), { target: { value: ' ' } });
  fireEvent.change(queryByTestId('description-upload-input'), { target: { value: '' } });
  await wait(() => expect(queryByTestId('description-upload-error')).not.toBeInTheDocument());
});

it('Renders an error when a description is > 240 characters', async () => {
  const { queryByTestId } = render(<UploadPage />);
  fireEvent.change(queryByTestId('description-upload-input'), {
    target: {
      value: `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
      aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
      aaaaaaaaaaaaaa`
    }
  });
  await wait(() => expect(queryByTestId('description-upload-error')).toBeInTheDocument());
  expect(queryByTestId('description-upload-error').innerHTML).toMatch(
    /Description can't be longer than 240 characters/gm
  );
});
