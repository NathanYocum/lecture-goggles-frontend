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
  width: 100%;
`;

const ContinueButtonStyle = styled.div`
  grid-row: 4;
  grid-column: 2;
  justify-self: center;
  font-size: 32px;
  margin: 30px;
`;

class SignUp extends React.Component {
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
          <p>Lecture Goggles</p>
        </LogoStyle>
        <WelcomeStyle>
          <form>
            <label htmlFor="firstName">
              First Name
              <br />
              <input type="text" name="firstName" />
            </label>
            <br />
            <label htmlFor="firstName">
              Last Name
              <br />
              <input type="text" name="firstName" />
            </label>
            <br />
            <label htmlFor="firstName">
              Email
              <br />
              <input type="text" name="firstName" />
            </label>
            <br />
            <label htmlFor="firstName">
              Confirm Email
              <br />
              <input type="text" name="firstName" />
            </label>
            <br />
            <label htmlFor="firstName">
              Password
              <br />
              <input type="password" name="firstName" />
            </label>
            <br />
            <label htmlFor="firstName">
              Confirm Password
              <br />
              <input type="password" name="firstName" />
            </label>
            <br />
            <label htmlFor="firstName">
              Institution
              <br />
              <input type="text" name="firstName" />
            </label>
            <br />
            <label htmlFor="firstName">
              Are you an instructor at your institution?
              <br />
              <input type="radio" name="firstName" />
              Yes
              <input type="radio" name="firstName" />
              No
            </label>
            <br />
          </form>
        </WelcomeStyle>
        <ContinueButtonStyle>
          <GenericButton text="Continue" />
          <GenericButton text="Cancel" />
        </ContinueButtonStyle>
      </GridBody>
    );
  }
}

export default SignUp;
