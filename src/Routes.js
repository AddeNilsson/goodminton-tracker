import React from 'react';
import { Route, Switch } from 'react-router-dom';
import * as routes from './constants/routes';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Home from './components/Home';
import Account from './components/Account';
import Admin from './components/Admin';

export default () => (
  <Switch>
    <Route exact path={'/sign-up'} component={SignUp} />
    <Route exact path={'/sign-in'} component={SignIn} />
    <Route exact path={'/home'} component={Home} />
    <Route exact path={'/account'} component={Account} />
    <Route exact path={'/admin'} component={Admin} />
  </Switch>
)
