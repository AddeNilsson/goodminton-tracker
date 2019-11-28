import React, { useState, useEffect } from 'react';
import { UserContext } from './'
import { withFirebase } from '../Firebase';

const withAuthentication = Component  => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);
      this.state = { user: null }
    }
    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(user => (
        user ? this.setState({ user }) : this.setState({ user: null })
      ))
    }
    componentWillUnmount() {
      this.listener();
    }
    render() {
      return (
        <UserContext.Provider value={this.state.user}>
          <Component {...this.props} />
        </UserContext.Provider>
      )
    }
  }
  return withFirebase(WithAuthentication);
};

export default withAuthentication;
