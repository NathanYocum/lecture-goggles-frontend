import React from 'react';
import styled from 'styled-components';
import NavBar from '../navBar/navBar';
import LectureGogglesLogo from '../logo/logo';
import GenericButton from '../button/button';
import GridBody from '../gridBody';

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
`;

const ContinueButtonStyle = styled.div`
  grid-row: 5;
  grid-column: 2;
  background-color: #ffffff;
  justify-self: center;
  font-size: 32px;
  margin: 30px;
`;

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0
    };
    this.getWindowWidth = this.getWindowWidth.bind(this);
  }

  componentDidMount() {
    this.getWindowWidth();
    window.addEventListener('resize', this.getWindowWidth);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.getWindowWidth);
  }

  getWindowWidth() {
    this.setState({ width: window.innerWidth });
  }

  render() {
    const { width } = this.state;
    return (
      <GridBody>
        <NavBar renderButton={width < 768} />
        <LogoStyle>
          <LectureGogglesLogo width={200} height={200} />
        </LogoStyle>
        <WelcomeStyle>
          <h3> Sign In </h3>
          <form>
            <label htmlFor="firstName">
              Email
              <br />
              <input type="text" name="firstName" />
            </label>
            <br />
            <label htmlFor="firstName">
              Password
              <br />
              <input type="password" name="firstName" />
              <br />
              <a href="/">Forgot your password?</a>
            </label>
            <br />
          </form>
        </WelcomeStyle>
        <ContinueButtonStyle>
          <GenericButton text="Continue" />
          <a href="/">
            <GenericButton backgroundColor="#90A4AE" color="#0D47A1" text="Cancel" />
          </a>
          <a href="/newAccount">
            <GenericButton backgroundColor="#90A4AE" color="#0D47A1" text="Create An Account" />
          </a>
        </ContinueButtonStyle>
      </GridBody>
    );
  }
}

export default SignIn;
