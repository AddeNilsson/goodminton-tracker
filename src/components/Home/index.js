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
    let payload;
    if (state === 'win') {
      payload = { ...userData, total: total + 1, win: win + 1, touched }
    }
    if (state === 'loss') {
      payload = { ...userData, total: total + 1, loss: loss + 1, touched }
    }
    if (state === 'wo') {
      payload = { ...userData, total: total + 6, wo: wo + 1, loss: userData.loss + 6, touched }
    }
    if (!payload) return;

    firebase.user(user.uid)
      .set(payload)
      .then(res => {
        const newEntry = firebase.log(user.uid).push();
        newEntry
          .set({
            action_text: `register_${state}`,
            amount_win: state === 'win' ? 1 : 0,
            amount_loss: state === 'loss' ? 1 : state === 'wo' ? 6 : 0,
            amount_wo: state === 'wo' ? 1 : 0,
            amount_games_total: state === 'wo' ? 6 : 1,
            date: touched,
            revertable: 1,
            reverted: 0,
          })
       })
      .catch(e => { console.error(e); });
  }

  const unregister = ({ id, action_text, amount_win, amount_loss, amount_games_total, amount_wo }) => {
    const touched = moment().format('YYYY-MM-DD HH:mm:ss');

    const payload = {
      ...userData,
      win: win - amount_win,
      loss: userData.loss - amount_loss,
      wo: wo - amount_wo,
      total: total - amount_games_total,
      touched,
    }

    firebase.user(user.uid)
      .set(payload)
      .then(res => {
        const newEntry = firebase.log(user.uid).push();
        newEntry
          .set({
            action_text: `un${action_text}`,
            date: touched,
            amount_win: -Math.abs(amount_win),
            amount_loss: -Math.abs(amount_loss),
            amount_wo: -Math.abs(amount_wo),
            amount_games_total: -Math.abs(amount_games_total),
            revertable: 0,
            reverted: 0,
          })
       })
       .then(res => {
         firebase.log(`${user.uid}/${id}`).update({
           reverted: 1,
           revertable: 0,
         })
       })
      .catch(e => { console.error(e); });
  }

  const handleBulkSubmit = ({ wins, losses }) => {
    const touched = moment().format('YYYY-MM-DD HH:mm:ss');
    const payload = {
      ...userData,
      win: userData.win + wins,
      loss: userData.loss + losses,
      total: userData.total + wins + losses,
      touched,
    };

    firebase.user(user.uid)
      .set(payload)
      .then(res => {
        const newEntry = firebase.log(user.uid).push();
        newEntry
          .set({
            action_text: `register_bulk`,
            date: touched,
            amount_loss: losses,
            amount_win: wins,
            amount_games_total: wins + losses,
            amount_wo: 0,
            revertable: 1,
            reverted: 0,
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
          <HomeMain
            register={register}
            handleBulkSubmit={handleBulkSubmit}
          />
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
