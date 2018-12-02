import React from 'react';
import styled from 'styled-components';
import NavBar from '../components/navBar/navBar';
import PlaceholderItem from '../components/placeholder/placeholder';
import LectureGogglesLogo from '../components/logo/logo';
import PlusButton from '../components/plusButton/plusButton';

const LandingStyle = styled.div`
  display: grid;
  grid-template-rows: minmax(90px, auto) auto;
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

const ToDoStyle = styled(WelcomeStyle)`
  grid-row: 4;
  width: 100%;
  color: hsla(197, 75%, 20%, 1);
`;

const TopicDivStyle = styled.div`
  border: 1px solid black;
  background-color: #dddddd;
  padding: 5px;
  margin: 2px;
  display: grid;
  grid-template-columns: 1fr 25px 25px;
  align-items: center;
  margin-bottom: 5px;
`;

const AddStyle = styled.div`
  grid-column: 3;
  grid-row: 4;
  background: none;
  align-self: end;
`;

class LandingPageSignedIn extends React.Component {
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
          <h1>Lecture Goggles</h1>
          <p>Welcome back $user!</p>
          <p>You have state.unreadNotifications!</p>
        </WelcomeStyle>
        <ToDoStyle>
          <h3>Topics with new resources</h3>
          <TopicDivStyle>
            Topic: Assets
            <br />
            Subject: Accounting
          </TopicDivStyle>
        </ToDoStyle>
        <AddStyle>
          <PlusButton />
        </AddStyle>
      </LandingStyle>
    );
  }
}

export default LandingPageSignedIn;
