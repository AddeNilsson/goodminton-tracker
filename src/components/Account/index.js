import React from 'react';
import { withAuthorization, UserContext } from '../Session';
import PasswordChangeForm from './PasswordChangeForm';
import PasswordForgetForm from './PasswordForgetForm';

const Account = () => (
  <UserContext.Consumer>
    { user => (
      <div>
        <h1>Account: { user.email }</h1>
        <PasswordChangeForm />
        <PasswordForgetForm />
      </div>
    )}
  </UserContext.Consumer>
);

const condition = user => !!user;

export default withAuthorization(condition)(Account);
