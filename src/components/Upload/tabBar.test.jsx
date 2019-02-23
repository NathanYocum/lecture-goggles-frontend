import React from 'react';
import { render, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';
import TabBar from './tabBar';

afterEach(cleanup);

it('Renders', () => {
  const { getByTestId } = render(<TabBar onClickFunction={() => {}} tabNames={['a']} />);
  expect(getByTestId('tab-bar')).toBeInTheDocument();
});

it('Renders a list of tabs given an array of names', () => {
  const tabs = ['a', 'b', 'c'];
  const { queryByTestId } = render(<TabBar onClickFunction={() => {}} currentTab={tabs[0]} tabNames={tabs} />);
  expect(queryByTestId('a-tab')).toBeInTheDocument();
  expect(queryByTestId('b-tab')).toBeInTheDocument();
  expect(queryByTestId('c-tab')).toBeInTheDocument();
});
