/**
 * index.js: The landing point for the entire website.
 *            Manage state from here.
 *
 */

/* eslint react/jsx-filename-extension: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Switch from 'react-router-dom/Switch';
import LandingPage from './components/LandingPage/LandingPage';
import NotFound from './components/NotFound/NotFound';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

ReactDOM.render(<App />, document.getElementById('root'));
