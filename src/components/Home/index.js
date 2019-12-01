import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { CardContent, Typography, Hidden } from '@material-ui/core';
import moment from 'moment';

import { UserContext, withAuthorization } from '../Session';
import DetailsCard from './DetailsCard';
import Leaderboards from '../Leaderboards';
import Modal, { useModal } from '../Modal';
import LogsList from './LogsList';
import HomeMain from './HomeMain';

const Home  = ({ firebase, user }) => {
  const [userData, setUserData] = useState(null);
  const [logs, setLogs] = useState([]);
  const modal = useModal();

  useEffect(() => {
    firebase.user(user.uid).on('value', snapshot => {
      const data = snapshot.val();
      setUserData(data);
    })
    return () => firebase.user(user.uid).off()
  }, [firebase, user])

  useEffect(() => {
    firebase.log(user.uid).on('value', snapshot => {
      const data = snapshot.val();
      if (data) {
        const logArr = Object.keys(data).map(key => ({ id: key, ...data[key] }));
        setLogs(logArr);
      }
    })
    return () => firebase.logs(user.uid).off()
  }, [firebase, user]);

  if (!userData) return null;

  const register = state => {
    const touched = moment().format('YYYY-MM-DD HH:mm:ss');
    const payload = state === 'win'
      ? { ...userData, total: total + 1, win: win + 1, touched }
      : state === 'loss'
        ? { ...userData, total: total + 1, loss: loss + 1, touched }
        : { ...userData, total: total + 6, wo: wo + 1, loss: userData.loss + 6, touched }

    firebase.user(user.uid)
      .set(payload)
      .then(res => {
        const newEntry = firebase.log(user.uid).push();
        newEntry
          .set({
            action: `register_${state}`,
            date: touched,
            revertable: 1,
            reverted: 0,
          })
       })
      .catch(e => { console.error(e); });
  }

  const unregister = entry => {
    const touched = moment().format('YYYY-MM-DD HH:mm:ss');
    const { action } = entry;
    const payload = action === 'register_win'
      ? { ...userData, total: total - 1, win: win - 1, touched }
      : action === 'register_loss'
        ? { ...userData, total: total - 1, loss: loss - 1, touched }
        : { ...userData, total: total - 6, wo: wo - 1, loss: userData.loss - 6, touched }

    firebase.user(user.uid)
      .set(payload)
      .then(res => {
        const newEntry = firebase.log(user.uid).push();
        newEntry
          .set({
            action: `un${action}`,
            date: touched,
            revertable: 0,
            reverted: 0,
          })
       })
       .then(res => {
         firebase.log(`${user.uid}/${entry.id}`).update({
           reverted: 1,
           revertable: 0,
         })
       })
      .catch(e => { console.error(e); });
  }

  const { total, win, loss, wo, username } = userData;
  const winRatio = Math.round((win / total) * 100) / 100 || 0;

  return  (
    <>
      <Modal
        title={'User Logs'}
        show={modal.showModal === 'logs'}
        closeModal={() => modal.closeModal()}
      ><LogsList logs={logs} unregister={unregister} /></Modal>
      <CardContent>
        <Hidden xsDown>
          <Typography variant={'h4'} align={'center'}>Welcome { username } !</Typography>
        </Hidden>
        <Hidden smUp>
          <Typography variant={'h6'} align={'center'}>Welcome { username } !</Typography>
        </Hidden>
      </CardContent>
      <Grid container  justify={'center'} spacing={8}>
        <Grid item xs={12} sm={10} md={6} xl={4}>
          <DetailsCard
            {...userData}
            winRatio={winRatio}
            setViewLogs={() => modal.openModal('logs')}
          />
          <HomeMain register={register} />
        </Grid>
        <Grid item xs={12} sm={10} md={4} lg={3} xl={2}>
          <Leaderboards minor />
        </Grid>
      </Grid>
    </>
  );
}

const HomePage = (props) => (
  <UserContext.Consumer>
    { user => (
      <Home {...props} user={user} />)
    }
  </UserContext.Consumer>
);

const condition = user => !!user;
export default withAuthorization(condition)(HomePage);
