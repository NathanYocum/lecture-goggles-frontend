import React from 'react';
import { Route } from 'react-router-dom';
import Switch from 'react-router-dom/Switch';
import LandingPage from './components/LandingPage/LandingPage';
import NotFound from './components/NotFound/NotFound';
import Resources from './components/Resources/Resources';
import DevelopersPage from './components/Developers/Developers';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';

const App = () => (
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route exact path="/resources" component={Resources} />
    <Route exact path="/developers" component={DevelopersPage} />
    <Route exact path="/signIn" component={SignIn} />
    <Route exact path="/newAccount" component={SignUp} />
    <Route component={NotFound} />
  </Switch>
);

export default App;
