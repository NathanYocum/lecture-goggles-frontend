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

class LandingPage extends React.Component {
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
          <h1>Welcome!</h1>
          <p>
            Lecture Goggles is a a free, open-source, educational resource repository to help students gain a better
            understanding of school subjects.
          </p>
        </WelcomeStyle>
        <SignInButtonStyle>
          <GenericButton text="SIGN IN" />
        </SignInButtonStyle>
        <AccountCreateButtonStyle>
          <GenericButton text="CREATE AN ACCOUNT" />
        </AccountCreateButtonStyle>
      </GridBody>
    );
  }
}

export default LandingPage;
