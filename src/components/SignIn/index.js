import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
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

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    firebase.signInWithEmailAndPsw(email, psw)
      .then(user => {
        history.push(ROUTES.HOME.path)
      }).catch(e => {
        setError(e);
        setLoading(false);
      });
  }
  const isInvalid = !email || ! psw;

  return (
    <Grid container alignItems={'center'} justify={'center'}>
      <Grid item xs={10} md={4}>
        <Card>
          <CardContent>
            <form onSubmit={e => handleSubmit(e)}>
              <TextField
                value={email}
                label={'Email'}
                onChange={e => setEmail(e.target.value)}
                fullWidth
              />
              <TextField
                value={psw}
                type={'password'}
                label={'Password'}
                onChange={e => setPsw(e.target.value)}
                fullWidth
              />
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
              { error && <p>{ error.message }</p> }
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export const SignInForm = withRouter(withFirebase(SignInFormBase));

const SignIn = () => (
  <div>
    <h1>SignIn!</h1>
    <SignInForm />
    <SignUpLink />
  </div>
);

export default SignIn;
