import React from 'react';
import styled from 'styled-components';
import NavBar from '../navBar/navBar';
import LectureGogglesLogo from '../logo/logo';
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
  width: 100%;
`;

const DevelopersPage = () => {
  const width = useWindowWidth();
  return (
    <GridBody data-testid="developers">
      <NavBar renderButton={width < 768} />
      <LogoStyle>
        <LectureGogglesLogo width={200} height={200} />
      </LogoStyle>
      <WelcomeStyle>
        <h1>Developers</h1>
        <h2>Web API</h2>
        <p>
          Lecture Goggles has a API based on REST principles, which developers can utilize to create more applications
          to help students learn. Requests to the API can get, post, put, and request to delete resources.
        </p>
        <h4>Read the documentation</h4>
        <a href="https://lecturegoggles.github.io/">CS 426 Project Website</a>
        <br />
        <a href="https://github.com/LectureGoggles/lecture-goggles-frontend">Front End Respository</a>
        <br />
        <a href="https://github.com/LectureGoggles/LectureGogglesAPI">API Respository</a>
        <h5>API Methods</h5>
        Coming soon...
        <h1>Source Code</h1>
        <p>
          Lecture Goggles is a fully open source applicaion. Read about how to contribute to the{' '}
          <a href="https://github.com/LectureGoggles/lecture-goggles-frontend/blob/master/CONTRIBUTING.md">frontend</a>,{' '}
          the <a href="https://github.com/LectureGoggles/LectureGogglesAPI/blob/master/CONTRIBUTING.md">API</a> or the{' '}
          <a href="https://github.com/LectureGoggles/LectureGoggles/blob/master/CONTRIBUTING.md">backend</a> of the
          website.
          <br />
          Lecture Goggles is licensed under an{' '}
          <a href="https://github.com/LectureGoggles/LectureGoggles/blob/master/LICENSE">MIT</a> licence.
        </p>
      </WelcomeStyle>
    </GridBody>
  );
};

export default DevelopersPage;
