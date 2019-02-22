/**
 * index.js: The landing point for the entire website.
 *            Manage state from here.
 *
 */

/* eslint react/jsx-filename-extension: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import App from './App';
import NavBar from './components/navBar/navBar';

library.add(faChevronDown, faChevronUp);

const history = createBrowserHistory();

ReactDOM.render(<NavBar />, document.getElementById('nav'));

ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById('root')
);
