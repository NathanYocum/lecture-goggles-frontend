/**
 * index.jsx: The landing point for the entire website.
 *            Manage state from here.
 *
 */

/* eslint react/jsx-filename-extension: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import NavBar from './components/navBar/navBar';

const LandingStyle = styled.div`
  display: grid;
`;

const App = () => (
  <LandingStyle>
    <NavBar />
  </LandingStyle>
);

ReactDOM.render(<App />, document.getElementById('root'));
