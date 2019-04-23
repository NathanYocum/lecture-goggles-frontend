import React from 'react';
import { render, cleanup } from 'react-testing-library';
import LandingPage from './LandingPage';
import AuthContext from '../../contexts/AuthContext';

afterEach(cleanup);

it('Renders a sign in button', () => {
  const { getByText } = render(
    <AuthContext.Provider value={{ signedInAs: '', userData: { isStaff: false }, setUser: () => {} }}>
      <LandingPage />
    </AuthContext.Provider>
  );
  expect(getByText('SIGN IN')).toBeTruthy();
  expect(getByText('SIGN IN').parentElement.outerHTML).toContain('href="/signIn"');
});

it("Renders a 'create an account' button", () => {
  const { getByText } = render(
    <AuthContext.Provider value={{ signedInAs: '', userData: { isStaff: false }, setUser: () => {} }}>
      <LandingPage />
    </AuthContext.Provider>
  );
  expect(getByText('CREATE AN ACCOUNT')).toBeTruthy();
  expect(getByText('CREATE AN ACCOUNT').parentElement.outerHTML).toContain('href="/newAccount"');
});
