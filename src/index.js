/* eslint react/jsx-filename-extension: 0 */
import React, { useState, useLayoutEffect } from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faChevronDown, faChevronUp, faArrowUp, faArrowDown, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import App from './App';
import AuthContext from './contexts/AuthContext';

library.add(faChevronDown, faChevronUp, faArrowUp, faArrowDown, faEllipsisV);

const history = createBrowserHistory();

const AppToRender = () => {
  const [signedInAs, setUser] = useState(null);
  useLayoutEffect(() => {
    const urlToUse = (() => {
      if (process.env.NODE_ENV === 'development') {
        return '';
      }
      return 'https://api.lecturegoggles.io';
    })();
    const token = localStorage.getItem('token');
    if (token) {
      axios
        .get(`${urlToUse}/users/auth`, { headers: { Authorization: `Bearer ${token}` } })
        .then(response => {
          const { data } = response;
          setUser(data.logged_in_as);
        })
        .catch(err => console.error(err));
    } else {
      setUser('');
    }
  });
  if (signedInAs === null) {
    return <></>;
  }
  return (
    <AuthContext.Provider value={{ signedInAs, setUser }}>
      <Router history={history}>
        <App />
      </Router>
    </AuthContext.Provider>
  );
};

ReactDOM.render(<AppToRender />, document.getElementById('root'));
