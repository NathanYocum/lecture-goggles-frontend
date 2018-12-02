import React from 'react';
import styled from 'styled-components';
import NavBar from '../components/navBar/navBar';
import PlaceholderItem from '../components/placeholder/placeholder';
import LectureGogglesLogo from '../components/logo/logo';

const LandingStyle = styled.div`
  display: grid;
  grid-template-rows: 100px;
  grid-template-columns: 1fr 4fr 1fr;
  background-color: #ffffff;
  justify-items: center;
`;

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
  background-color: #7fdbff;
  color: hsla(197, 100%, 20%, 1);
  width: 100%;
`;

class DevelopersPage extends React.Component {
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
      <LandingStyle>
        <NavBar renderButton={width < 768} />
        <HeaderStyle>
          <PlaceholderItem width={width.toString()} viewBox={`0 0 ${width.toString()} 200`} fillColor="#aaaaaa" />
        </HeaderStyle>
        <LogoStyle>
          <LectureGogglesLogo width={200} height={200} />
          <p>Lecture Goggles</p>
        </LogoStyle>
        <WelcomeStyle>
          <h1>Developers</h1>
          <h2>Web API</h2>
          <p>
            Lecture Goggles has a API based on REST principles, which developers can utilize to create more applications
            to help students learn. Requests to the API can get, post, put, and request to delete resources.
          </p>
          <h4>Getting an API account</h4>
          <p>
            Any registered user with a verified email can request an API key. Follow&nbsp;
            <a href="/">this</a>
            &nbsp;link to register for a key.
          </p>
          <h4>Read the documentation</h4>
          ...
          <h5>API Methods</h5>
          ...
          <h4>Sample applications</h4>
          <a href="/">Resource Randomizer</a>
          <br />
          ...
          <h1>Source Code</h1>
          <p>
            Lecture Goggles is a fully open source applicaion. Read about how to contribute to the&nbsp;
            <a href="https://github.com/LectureGoggles/lecture-goggles-frontend/blob/master/CONTRIBUTING.md">
              frontend
            </a>
            &nbsp;or the&nbsp;
            <a href="https://github.com/LectureGoggles/LectureGoggles/blob/master/CONTRIBUTING.md">backend</a>
            &nbsp;of the website.
            <br />
            Lecture Goggles is licensed under an&nbsp;
            <a href="https://github.com/LectureGoggles/LectureGoggles/blob/master/LICENSE">MIT</a>
            &nbsp;licence.
          </p>
        </WelcomeStyle>
      </LandingStyle>
    );
  }
}

export default DevelopersPage;
