import React from 'react';
import { withAuthentication } from './';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { UserContext } from './';

const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(user => {
        if (!condition(user)){
          this.props.history.push(ROUTES.SIGN_IN.path);
        }
      })
    }
    componentWillUnmount() {
      this.listener();
    }
    render() {
      return (
        <UserContext.Consumer>
          { user => condition(user) ? <Component {...this.props} /> : null }
        </UserContext.Consumer>
      );
    }
  }
  return withFirebase(withAuthentication(WithAuthorization));
}

export default withAuthorization;
