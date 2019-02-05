import React from 'react';
import { Route } from 'react-router-dom';
import Switch from 'react-router-dom/Switch';
import LandingPage from './components/LandingPage/LandingPage';
import NotFound from './components/NotFound/NotFound';
import Resources from './components/Resources/Resources';
import DevelopersPage from './components/Developers/Developers';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import SubjectsPage from './components/Subjects/Subjects';
import TopicsPage from './components/Topics/Topics';
import SupportPage from './components/Support/Support';
import AccountPage from './components/Account/Account';
import UploadPage from './components/Upload/Upload';

const App = () => (
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
);

export default App;
