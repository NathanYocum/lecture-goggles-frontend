import React from 'react';
import styled from 'styled-components';
import NavBar from '../navBar/navBar';
import PlaceholderItem from '../placeholder/placeholder';
import LectureGogglesLogo from '../logo/logo';
import GenericButton from '../button/button';
import GridBody from '../gridBody';

const HeaderStyle = styled.div`
  grid-row: 2;
  grid-column: 1 / span 3;
  justify-self: center;
`;

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
  color: hsla(197, 100%, 20%, 1);
`;

const SignInButtonStyle = styled.div`
  grid-row: 4;
  grid-column: 2;
  background-color: #7fdbff;
  color: hsla(197, 100%, 20%, 1);
  font-size: 32px;
  margin: 30px;
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
        <HeaderStyle>
          <PlaceholderItem width={width.toString()} viewBox={`0 0 ${width.toString()} 200`} fillColor="#aaaaaa" />
        </HeaderStyle>
        <LogoStyle>
          <LectureGogglesLogo width={200} height={200} />
          <p>Lecture Goggles</p>
        </LogoStyle>
        <WelcomeStyle>
          <h1>Welcome to Lecture Goggles!</h1>
          <p>
            Lecture Goggles is a a free, open-source, educational resource repository to help students gain a better
            understanding of school subjects.
          </p>
        </WelcomeStyle>
        <SignInButtonStyle>
          <GenericButton text="Sign In" />
        </SignInButtonStyle>
        <AccountCreateButtonStyle>
          <GenericButton text="Create An Account" />
        </AccountCreateButtonStyle>
      </GridBody>
    );
  }
}

export default LandingPage;
