import React from 'react';
import PropTypes from 'prop-types';
import UserContext from './context';
import { withFirebase } from '../Firebase';

console.log('changed imports here, check');

const withAuthentication = (Component) => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);
      this.state = { user: null };
    }

    componentDidMount() {
      const { firebase } = this.props;
      this.listener = firebase.auth.onAuthStateChanged(user => (
        user ? this.setState({ user }) : this.setState({ user: null })
      ));
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      const { user } = this.state;
      return (
        <UserContext.Provider value={user}>
          <Component {...this.props} />
        </UserContext.Provider>
      );
    }
  }

  WithAuthentication.propTypes = {
    firebase: PropTypes.object.isRequired,
  };

  return withFirebase(WithAuthentication);
};

export default withAuthentication;
