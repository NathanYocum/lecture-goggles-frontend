/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import styled from 'styled-components';
import NavBar from '../navBar/navBar';
import LectureGogglesLogo from '../logo/logo';
import GenericButton from '../button/button';
import GridBody from '../gridBody';
import useWindowWidth from '../__hooks__/useWindowWidth';

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
  background-color: #ffffff;
  color: #0d47a1;
  padding: 20px;
  width: 100%;
`;

const ContinueButtonStyle = styled.div`
  grid-row: 4;
  grid-column: 2;
  justify-self: center;
  font-size: 32px;
  margin: 30px;
`;

const LabelStyle = styled.label`
  text-align: center;
  font-size: 24px;
  display: block;
`;

const InputStyle = styled.input`
  width: 80%;
  margin-left: 10%;
  margin-right: 10%;
  border-radius: 4px;
  border: 1px solid #0074d9;
  text-align: center;
  height: 56px;
  font-size: 24px;
`;

const SignUp = () => {
  const width = useWindowWidth();
  return (
    <GridBody data-testid="sign-up">
      <NavBar renderButton={width < 768} />
      <LogoStyle>
        <LectureGogglesLogo width={200} height={200} />
        <p>Lecture Goggles</p>
      </LogoStyle>
      <WelcomeStyle>
        <form>
          <LabelStyle htmlFor="firstName">
            First Name
            <br />
            <InputStyle type="text" name="firstName" />
          </LabelStyle>
          <br />
          <LabelStyle htmlFor="lastName">
            Last Name
            <br />
            <InputStyle type="text" name="lastName" />
          </LabelStyle>
          <br />
          <LabelStyle htmlFor="email">
            Email
            <br />
            <InputStyle type="text" name="email" />
          </LabelStyle>
          <br />
          <LabelStyle htmlFor="confirmEmail">
            Confirm Email
            <br />
            <InputStyle type="text" name="confirmEmail" />
          </LabelStyle>
          <br />
          <LabelStyle htmlFor="password">
            Password
            <br />
            <InputStyle type="password" name="password" />
          </LabelStyle>
          <br />
          <LabelStyle htmlFor="confirmPassword">
            Confirm Password
            <br />
            <InputStyle type="password" name="confirmPassword" />
          </LabelStyle>
          <br />
          <LabelStyle htmlFor="institution">
            Institution
            <br />
            <InputStyle type="text" name="institution" />
          </LabelStyle>
          <br />
          <LabelStyle htmlFor="firstName">
            Are you an instructor at your institution?
            <br />
            <input type="radio" name="firstName" />
            Yes
            <input type="radio" name="firstName" />
            No
          </LabelStyle>
          <br />
          <ContinueButtonStyle>
            <GenericButton type="submit" text="Continue" />
            <a href="/">
              <GenericButton backgroundColor="#90A4AE" color="#0D47A1" text="Cancel" />
            </a>
          </ContinueButtonStyle>
        </form>
      </WelcomeStyle>
    </GridBody>
  );
};

export default SignUp;
