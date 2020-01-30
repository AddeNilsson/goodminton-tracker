/* eslint-disable react/prop-types */
import React from 'react';
import withAuthentication from './withAuthentication';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import UserContext from './context';

const withAuthorization = condition => (Component) => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      const { firebase, history } = this.props;
      this.listener = firebase.auth.onAuthStateChanged((user) => {
        if (!condition(user)) {
          history.push(ROUTES.SIGN_IN.path);
        }
      });
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <UserContext.Consumer>
          { user => (condition(user) ? <Component {...this.props} /> : null) }
        </UserContext.Consumer>
      );
    }
  }
  return withFirebase(withAuthentication(WithAuthorization));
};

export default withAuthorization;
