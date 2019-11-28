import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase';
import { Button } from '../Buttons';

export const SignUpFormBase = ({ firebase, history }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [psw, setPsw] = useState('');
  const [pswConfirm, setPswConfirm] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const isInvalid =
    psw !== pswConfirm || psw.length < 5 ||
    username === '' || email === '';

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    firebase.createUserWithEmailAndPsw(email, psw)
      .then(user => {
        firebase
          .user(user.user.uid)
          .set({ username, email })
      })
      .then(() => history.push(ROUTES.HOME.path))
      .catch(e => {
        setError(e);
        setLoading(false);
      })
  };

  return (
    <Grid container justify={'center'} alignItems={'center'}>
      <Grid item xs={10} md={4}>
        <Card>
          <CardContent>
            <form onSubmit={handleSubmit} onSubmit={e => handleSubmit(e)}>
              <TextField
                value={username}
                label={'Username'}
                onChange={e => setUsername(e.target.value)}
                name={'username'}
                fullWidth
                />
              <TextField
                value={email}
                label={'Email'}
                onChange={e => setEmail(e.target.value)}
                name={'email'}
                fullWidth
                />
              <TextField
                type={'password'}
                value={psw}
                label={'Password'}
                onChange={e => setPsw(e.target.value)}
                name={'psw'}
                fullWidth
                />
              <TextField
                type={'password'}
                value={pswConfirm}
                label={'Confirm Password'}
                onChange={e => setPswConfirm(e.target.value)}
                name={'pswConfirm'}
                fullWidth
                />

              { error && <p>{ error.message }</p> }

              <Grid spacing={24} direction={'column'} container alignItems={'flex-end'}>
                <Grid item xs={6}>
                  <CardActions>
                    <div>
                      <Button
                        disabled={isInvalid || loading}
                        handleClick={handleSubmit}
                        >{ !loading ? 'Sign In' : 'Loading..' }</Button>
                    </div>
                  </CardActions>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>

  );
};

export const SignUpLink = () => <Link to={ROUTES.SIGN_UP.path}>Sign up!</Link>

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

const SignUpPage = () => {
  return (
    <div>
      <h1>SignUp!</h1>
      <SignUpForm />
    </div>
  );
};


export default SignUpPage;
