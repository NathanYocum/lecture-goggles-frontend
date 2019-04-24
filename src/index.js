/* eslint react/jsx-filename-extension: 0 */
import React, { useState, useLayoutEffect } from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faChevronDown,
  faChevronUp,
  faArrowUp,
  faArrowDown,
  faEllipsisV,
  faUser,
  faUserPlus,
  faCheckCircle,
  faPlus,
  faTimes,
  faLink,
  faBookOpen,
  faScroll
} from '@fortawesome/free-solid-svg-icons';
import App from './App';
import AuthContext from './contexts/AuthContext';

library.add(
  faChevronDown,
  faChevronUp,
  faArrowUp,
  faArrowDown,
  faEllipsisV,
  faUser,
  faUserPlus,
  faCheckCircle,
  faPlus,
  faTimes,
  faLink,
  faBookOpen,
  faScroll
);

const history = createBrowserHistory();

const AppToRender = () => {
  const [signedInAs, setUser] = useState(null);
  const [userData, setUserData] = useState({});
  useLayoutEffect(() => {
    const urlToUse = (() => {
      if (process.env.NODE_ENV === 'development') {
        return '';
      }
      return 'http://api.lecturegoggles.io';
    })();
    const token = localStorage.getItem('token');
    if (token) {
      axios
        .get(`${urlToUse}/v1/users/auth`, { headers: { Authorization: `Bearer ${token}` } })
        .then(response => {
          const { data } = response;
          setUser(data.logged_in_as);
          setUserData(data.user_info);
        })
        .catch(() => {
          setUser('');
        });
    } else {
      setUser('');
    }
  }, []);
  if (signedInAs === null) {
    return <div />;
  }
  return (
    <AuthContext.Provider value={{ signedInAs, setUser, userData }}>
      <Router history={history}>
        <App />
      </Router>
    </AuthContext.Provider>
  );
};

ReactDOM.render(<AppToRender />, document.getElementById('root'));
