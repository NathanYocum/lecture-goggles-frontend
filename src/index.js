/**
 * index.js: The landing point for the entire website.
 *            Manage state from here.
 *
 */

/* eslint react/jsx-filename-extension: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import LandingPage from './components/LandingPage/LandingPage';

ReactDOM.render(<LandingPage />, document.getElementById('root'));
