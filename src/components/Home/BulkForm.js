import React, { useState } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { Button } from '../Buttons';

const BulkForm = ({ handleBulkSubmit }) => {
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleKey = e => e.keyCode === 13 ? handleSubmit(e) : null;

  const handleSubmit = e => {
    e.preventDefault();
    handleBulkSubmit({ wins: Number(wins), losses: Number(losses) });
    setWins(0);
    setLosses(0);
  }

  return (
    <ExpansionPanel title={'foo'}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
      >Register multiple games</ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Grid container justify={'center'} alignItems={'flex-end'}>
          <Grid item xs={12} md={12}>
            <Card>
              <CardContent>
                <form onSubmit={e => handleSubmit(e)} onKeyDown={handleKey} autoComplete={'off'}>
                  <Grid container alignItems={'center'} spacing={8}>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        value={wins}
                        type={'number'}
                        label={'Wins'}
                        onChange={e => setWins(e.target.value)}
                        name={'wins'}
                        fullWidth
                        onFocus={e => e.target.select()}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                    <TextField
                      value={losses}
                      type={'number'}
                      label={'Losses'}
                      onChange={e => setLosses(e.target.value)}
                      name={'losses'}
                      fullWidth
                      onFocus={e => e.target.select()}
                    />
                    </Grid>
                    <Grid item xs={12} sm={4} style={{ textAlign: 'right' }}>
                      <Button
                        disabled={loading}
                        handleClick={handleSubmit}
                      >{!loading ? 'Done' : 'Loading..'}</Button>
                    </Grid>
                  

                  {error && <p>{error.message}</p>}
                  {/* <Grid container alignItems={'center'}> */}
                    {/* <Grid item xs={12} style={{ textAlign: 'right' }}> */}
                     
                    {/* </Grid> */}
                  {/* </Grid> */}
                        </Grid>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

export default BulkForm;

// import { Link, withRouter } from 'react-router-dom';
// import TextField from '@material-ui/core/TextField';
// import Grid from '@material-ui/core/Grid';
// import Card from '@material-ui/core/Card';
// import CardContent from '@material-ui/core/CardContent';
// import CardActions from '@material-ui/core/CardActions';

// import * as ROUTES from '../../constants/routes';
// import { withFirebase } from '../Firebase';
// import { Button } from '../Buttons';

// const newUserBase = { win: 0, loss: 0, wo: 0, total: 0 };

// export const SignUpFormBase = ({ firebase, history }) => {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [psw, setPsw] = useState('');
//   const [pswConfirm, setPswConfirm] = useState('');
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const isInvalid =
//     psw !== pswConfirm || psw.length < 5 ||
//     username === '' || email === '';

  // const handleKey = e => e.keyCode === 13 ? handleSubmit(e) : null;

//   const handleSubmit = e => {
//     e.preventDefault();
//     setLoading(true);
//     firebase.createUserWithEmailAndPsw(email, psw)
//       .then(user => {
//         firebase
//           .user(user.user.uid)
//           .set({ username, email, ...newUserBase })
//       })
//       .then(() => history.push(ROUTES.HOME.path))
//       .catch(e => {
//         setError(e);
//         setLoading(false);
//       })
//   };

//   return (
    // <Grid container justify={'center'} alignItems={'center'}>
    //   <Grid item xs={10} md={4}>
    //     <Card>
    //       <CardContent>
    //         <form onSubmit={e => handleSubmit(e)} onKeyDown={handleKey} autoComplete={'off'}>
    //           <TextField
    //             value={username}
    //             label={'Username'}
    //             onChange={e => setUsername(e.target.value)}
    //             name={'username'}
    //             fullWidth
    //             />
    //           <TextField
    //             value={email}
    //             label={'Email'}
    //             onChange={e => setEmail(e.target.value)}
    //             name={'email'}
    //             fullWidth
    //             />
    //           <TextField
    //             type={'password'}
    //             value={psw}
    //             label={'Password'}
    //             onChange={e => setPsw(e.target.value)}
    //             name={'psw'}
    //             fullWidth
    //             />
    //           <TextField
    //             type={'password'}
    //             value={pswConfirm}
    //             label={'Confirm Password'}
    //             onChange={e => setPswConfirm(e.target.value)}
    //             name={'pswConfirm'}
    //             fullWidth
    //             />

    //           { error && <p>{ error.message }</p> }

    //           <Grid spacing={24} direction={'column'} container alignItems={'flex-end'}>
    //             <Grid item xs={6}>
    //               <CardActions>
    //                 <div>
    //                   <Button
    //                     disabled={isInvalid || loading}
    //                     handleClick={handleSubmit}
    //                     >{ !loading ? 'Sign In' : 'Loading..' }</Button>
    //                 </div>
    //               </CardActions>
    //             </Grid>
    //           </Grid>
    //         </form>
    //       </CardContent>
    //     </Card>
    //   </Grid>
    // </Grid>

//   );
// };

// const SignUpForm = withRouter(withFirebase(SignUpFormBase));

// const SignUpPage = () => {
//   return (
//     <Grid container justify={'center'}>
//       <Grid item xs={4}>
//         <h1>SignUp!</h1>
//       </Grid>
//       <Grid item xs={12}>
//         <SignUpForm />
//       </Grid>
//     </Grid>
//   );
// };


// export default SignUpPage;
