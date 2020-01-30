import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import { SignUpLink } from '../SignUp';
import * as ROUTES from '../../constants/routes';
import { Button } from '../Buttons';


const SignInFormBase = ({ firebase, history }) => {
  const [email, setEmail] = useState('');
  const [psw, setPsw] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    firebase.signInWithEmailAndPsw(email, psw)
      .then(() => {
        history.push(ROUTES.HOME.path);
      }).catch((err) => {
        setError(err);
        setLoading(false);
      });
  };
  const handleKey = e => (e.keyCode === 13 ? handleSubmit(e) : null);
  const isInvalid = !email || !psw;

  return (
    <form onSubmit={e => handleSubmit(e)} onKeyDown={handleKey} autoComplete="off" role="presentation">
      <CardContent>
        <TextField
          value={email}
          label="Email"
          onChange={e => setEmail(e.target.value)}
          fullWidth
        />
        <TextField
          value={psw}
          type="password"
          label="Password"
          onChange={e => setPsw(e.target.value)}
          fullWidth
        />
        { error && <p>{ error.message }</p> }
      </CardContent>
      <CardContent>
        <Grid container justify="space-between" alignItems="center">
          <div>
            <SignUpLink />
          </div>
          <div>
            <Button
              disabled={isInvalid || loading}
              handleClick={handleSubmit}
            >
              { !loading ? 'Sign In' : 'Loading..' }
            </Button>
          </div>
        </Grid>
      </CardContent>
    </form>
  );
};

export const SignInForm = withRouter(withFirebase(SignInFormBase));

const SignIn = () => (
  <Grid container justify="center" alignItems="center">
    <Grid item xs={12} md={6} lg={4}>
      <Card>
        <CardContent>
          <Typography variant="h4">
            Sign In
          </Typography>
        </CardContent>
        <SignInForm />
      </Card>
    </Grid>
  </Grid>
);

SignInFormBase.propTypes = {
  firebase: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default SignIn;
