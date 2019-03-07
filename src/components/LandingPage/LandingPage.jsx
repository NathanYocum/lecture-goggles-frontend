import React, { useContext } from 'react';
import styled from 'styled-components';
import LectureGogglesLogo from '../logo/logo';
import GenericButton from '../button/button';
import GridBody from '../gridBody';
import AuthContext from '../../contexts/AuthContext';

const LogoStyle = styled.div`
  grid-column: 2;
  grid-row: 2;
  justify-self: center;
  align-self: center;
  text-align: center;
`;

const WelcomeStyle = styled.div`
  grid-row: 3;
  grid-column: 2;
  color: #0d47a1;
  text-align: center;
`;

const SignInButtonStyle = styled.div`
  grid-row: 4;
  grid-column: 2;
  font-size: 20px;
  @media (max-width: 700px) {
    width: 80%;
  }
  @media (min-width: 700px) {
    width: 373px;
  }

  margin-bottom: 16px;
  height: 56px;
`;

const AccountCreateButtonStyle = styled(SignInButtonStyle)`
  grid-row: 5;
`;

const LandingPage = () => {
  const { signedInAs } = useContext(AuthContext);
  console.log(signedInAs);
  return (
    <GridBody data-testid="landing-page">
      <LogoStyle>
        <LectureGogglesLogo width={200} height={200} />
      </LogoStyle>
      <WelcomeStyle>
        <h1>Welcome!</h1>
        <p>
          Lecture Goggles is a free, open-source, educational resource repository to help students gain a better
          understanding of school subjects.
        </p>
      </WelcomeStyle>
      <SignInButtonStyle>
        <a data-testid="sign-in-button" href="/signIn">
          <GenericButton text="SIGN IN" />
        </a>
      </SignInButtonStyle>
      <AccountCreateButtonStyle>
        <a href="/newAccount">
          <GenericButton text="CREATE AN ACCOUNT" />
        </a>
      </AccountCreateButtonStyle>
    </GridBody>
  );
};

export default LandingPage;
