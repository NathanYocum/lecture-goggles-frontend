import React from 'react';
import styled from 'styled-components';
import LectureGogglesLogo from '../../components/logo/logo';
import GridBody from '../../components/gridBody';

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

const DevelopersPage = () => (
  <GridBody data-testid="developers">
    <LogoStyle>
      <LectureGogglesLogo width={200} height={200} />
    </LogoStyle>
    <WelcomeStyle>
      <h1>Developers</h1>
      <h2>Web API</h2>
      <p>
        Lecture Goggles has a API based on REST principles, which developers can utilize to create more applications to
        help students learn. Requests to the API can get, post, put, and request to delete resources. A public API is
        not currently available for Lecture Goggles, but it is a possible stretch goal for the future.
      </p>
      <h4>Read the documentation</h4>
      <a href="https://lecturegoggles.github.io/">CS 426 Project Website</a>
      <br />
      <a href="https://github.com/LectureGoggles/lecture-goggles-frontend">Front End Respository</a>
      <br />
      <a href="https://github.com/LectureGoggles/FlaskAPI">API Respository</a>
      <h5>API Methods</h5>
      Coming soon...
      <h1>Source Code</h1>
      <p>
        Lecture Goggles is a fully open source applicaion. Read about how to contribute to the{' '}
        <a href="https://github.com/LectureGoggles/lecture-goggles-frontend/blob/master/CONTRIBUTING.md">frontend</a>,{' '}
        the <a href="https://github.com/LectureGoggles/FlaskAPI/blob/master/CONTRIBUTING.md">API</a> or the{' '}
        <a href="https://github.com/LectureGoggles/LectureGoggles/blob/master/CONTRIBUTING.md">backend</a> of the
        website.
        <br />
        Lecture Goggles is licensed under an{' '}
        <a href="https://github.com/LectureGoggles/LectureGoggles/blob/master/LICENSE">MIT</a> licence.
      </p>
    </WelcomeStyle>
  </GridBody>
);

export default DevelopersPage;
