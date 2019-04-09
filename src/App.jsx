import React from 'react';
import { Route, Switch } from 'react-router-dom';

import LandingPage from './pages/LandingPage/LandingPage';
import NotFound from './pages/NotFound/NotFound';
import Resources from './pages/Resources/Resources';
import DevelopersPage from './pages/Developers/Developers';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import SubjectsPage from './pages/Subjects/Subjects';
import TopicsPage from './pages/Topics/Topics';
import SupportPage from './pages/Support/Support';
import AccountPage from './pages/Account/Account';
import UploadPage from './pages/Upload/Upload';
import NavBar from './components/navBar/navBar';

const App = () => (
  <>
    <NavBar />
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route path="/subjects" component={SubjectsPage} />
      <Route path="/topics" component={TopicsPage} />
      <Route path="/support" component={SupportPage} />
      <Route path="/resources" component={Resources} />
      <Route path="/developers" component={DevelopersPage} />
      <Route path="/account" component={AccountPage} />
      <Route path="/signIn" component={SignIn} />
      <Route path="/newAccount" component={SignUp} />
      <Route path="/upload" component={UploadPage} />
      <Route component={NotFound} />
    </Switch>
  </>
);

export default App;
