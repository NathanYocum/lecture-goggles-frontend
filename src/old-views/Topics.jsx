import React from 'react';
import styled from 'styled-components';
import NavBar from '../components/navBar/navBar';
import PlaceholderItem from '../components/placeholder/placeholder';
import LectureGogglesLogo from '../components/logo/logo';
import GenericButton from '../components/button/button';
import PlusButton from '../components/plusButton/plusButton';
import ArrowButton from '../components/arrow/arrow';

const LandingStyle = styled.div`
  display: grid;
  grid-template-rows: 100px;
  grid-template-columns: 1fr 4fr 1fr;
  background-color: #ffffff;
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
  padding: 20px;
`;

const ContinueButtonStyle = styled.div`
  grid-row: 4;
  grid-column: 2;
  background-color: #ffffff;
  justify-self: right;
  color: hsla(197, 100%, 20%, 1);
  font-size: 32px;
  margin: 30px;
`;

const TopicDivStyle = styled.div`
  border: 1px solid black;
  background-color: #dddddd;
  padding: 5px;
  margin: 2px;
  display: grid;
  grid-template-columns: 1fr 25px 25px;
  align-items: center;
`;

class Topics extends React.Component {
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
          <h1>Topics</h1>
          <p>Welcome $user! Please select Topics you are intersted in.</p>
          <form>
            <label htmlFor="firstName">
              Filter
              <input type="text" name="firstName" />
            </label>
          </form>
          <TopicDivStyle>
            Topic: Assets
            <br />
            Subject: Accounting
            <PlusButton />
            <ArrowButton />
          </TopicDivStyle>
          <TopicDivStyle>
            Topic: Lorem
            <br />
            Subject: Accounting
            <PlusButton />
            <ArrowButton />
          </TopicDivStyle>
          <TopicDivStyle>
            Topic: Lorem
            <br />
            Subject: Accounting
            <PlusButton />
            <ArrowButton />
          </TopicDivStyle>
          <TopicDivStyle>
            Topic: Lorem
            <br />
            Subject: Accounting
            <PlusButton />
            <ArrowButton />
          </TopicDivStyle>
          <TopicDivStyle>
            Topic: Lorem
            <br />
            Subject: Accounting
            <PlusButton />
            <ArrowButton />
          </TopicDivStyle>
          <TopicDivStyle>
            Topic: Lorem
            <br />
            Subject: Accounting
            <PlusButton />
            <ArrowButton />
          </TopicDivStyle>
          Page 1 of X
          <ArrowButton />
        </WelcomeStyle>
        <ContinueButtonStyle>
          <GenericButton text="Continue" />
          <GenericButton text="Cancel" />
        </ContinueButtonStyle>
      </LandingStyle>
    );
  }
}

export default Topics;
