import React from 'react';
import styled from 'styled-components';
import GridBody from '../gridBody';
import LectureGogglesLogo from '../logo/logo';
import NavBar from '../navBar/navBar';

const LogoStyle = styled.div`
  grid-column: 2;
  grid-row: 2;
  justify-self: center;
  align-self: center;
  text-align: center;
`;

const NotFoundPar = styled.p`
  grid-column: 2;
  grid-row: 3;
  justify-self: center;
  align-self: center;
  text-align: center;
  font-size: 20px;
  color: #0d47a1;
`;

const SearchStyle = styled.div`
  grid-column: 2;
  grid-row: 4;
  border: 2px solid #0d47a1;
  width: 100%;
  height: 56px;
  border-radius: 20px;
  font-size: 16px;
  color: #90a4ae;
`;

class NotFound extends React.Component {
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
          <LectureGogglesLogo width="200px" height="200px" />
        </LogoStyle>
        <NotFoundPar>We could not find the page you were looking for.</NotFoundPar>
        <SearchStyle>Search</SearchStyle>
      </GridBody>
    );
  }
}

export default NotFound;
