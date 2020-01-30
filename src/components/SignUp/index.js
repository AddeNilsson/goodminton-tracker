import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
// import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';

import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase';
import { Button } from '../Buttons';

const newUserBase = {
  win: 0, loss: 0, wo: 0, total: 0, touched: '',
};

export const SignUpFormBase = ({ firebase, history }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [psw, setPsw] = useState('');
  const [pswConfirm, setPswConfirm] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const isInvalid = (psw !== pswConfirm || psw.length < 5)
    || (username === '' || email === '');

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    firebase.createUserWithEmailAndPsw(email, psw)
      .then((user) => {
        firebase
          .user(user.user.uid)
          .set({ username, email, ...newUserBase });
      })
      .then(() => history.push(ROUTES.HOME.path))
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  };

  const handleKey = e => (e.keyCode === 13 ? handleSubmit(e) : null);

  return (
    <form onSubmit={e => handleSubmit(e)} onKeyDown={handleKey} autoComplete="off" role="presentation">
      <CardContent>
        <TextField
          value={username}
          label="Username"
          onChange={e => setUsername(e.target.value)}
          name="username"
          fullWidth
        />
        <TextField
          value={email}
          label="Email"
          onChange={e => setEmail(e.target.value)}
          name="email"
          fullWidth
        />
        <TextField
          type="password"
          value={psw}
          label="Password"
          onChange={e => setPsw(e.target.value)}
          name="psw"
          fullWidth
        />
        <TextField
          type="password"
          value={pswConfirm}
          label="Confirm Password"
          onChange={e => setPswConfirm(e.target.value)}
          name="pswConfirm"
          fullWidth
        />

        { error && <p>{ error.message }</p> }
      </CardContent>
      <CardContent>
        <Grid container justify="space-between" alignItems="center">
          <div>
            <Typography variant="subtitle1">
              <Link to={ROUTES.SIGN_IN.path}>Sign in</Link>
            </Typography>
          </div>
          <div>
            <Button
              disabled={isInvalid || loading}
              handleClick={handleSubmit}
            >
              { !loading ? 'Sign Up' : 'Loading..' }
            </Button>
          </div>
        </Grid>
      </CardContent>
    </form>
  );
};

export const SignUpLink = () => <Link to={ROUTES.SIGN_UP.path}>Sign up!</Link>;

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

const SignUpPage = () => (
  <Grid container direction="column" justify="center" alignItems="center">
    <Grid item xs={12} md={6} lg={4}>
      <Card>
        <CardContent>
          <Typography variant="h4">
            Sign Up
          </Typography>
        </CardContent>
        <SignUpForm />
      </Card>
    </Grid>
  </Grid>
);

SignUpFormBase.propTypes = {
  firebase: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default SignUpPage;
