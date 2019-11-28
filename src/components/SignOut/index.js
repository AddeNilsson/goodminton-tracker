import React from 'react';
import { withFirebase } from '../Firebase';
import { Button, ButtonOutlined } from '../Buttons';

const SignOutButtonBase = ({ firebase }) => (
  <ButtonOutlined
    handleClick={() => firebase.signOut()}
    >Sign Out</ButtonOutlined>
);

export default withFirebase(SignOutButtonBase);

/*
import { withRouter } from 'react-router-dom';

const SignOutButtonBase = ({ firebase, history }) => {
  const handleSignOut = () => {
    firebase.signOut()
      .then(() => history.push(ROUTES.SIGN_IN.path))
      .catch(e => console.error(e);)
  }
  return (
    <Button
      handleClick={handleSignOut}
      >Log Out</Button>
  );
}

export default withRouter(withFirebase(SignOutButtonBase));

*/
