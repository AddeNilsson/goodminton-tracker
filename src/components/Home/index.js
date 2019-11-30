import React, { useEffect, useState } from 'react';
import { UserContext, withAuthorization } from '../Session';
import { Button } from '../Buttons';
import { Mood, SentimentDissatisfied, MoodBad } from '@material-ui/icons';
import Grid from '@material-ui/core/Grid';
import { Card, CardContent, CardActionArea, CardMedia, CardActions, Typography, Hidden } from '@material-ui/core';
import img from './img.jpg';
import DetailsCard from './DetailsCard';
import Leaderboards from '../Leaderboards';
import moment from 'moment';
import Modal, { useModal } from '../Modal';
import Logs from './Logs';

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
        const logArr = Object.keys(data).map(key => (
          data[key]
        ));
        setLogs(logArr);
      }
    })
    return () => firebase.logs(user.uid).off()
  }, [firebase, user]);

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
          })
       })
      .catch(e => { console.error(e); });
  }

  if (!userData) return null;

  const { total, win, loss, wo, username } = userData;
  const winRatio = Math.round((win / total) * 100) / 100 || 0;

  return  (
    <>
      <Modal
        title={'User Logs'}
        show={modal.showModal === 'logs'}
        closeModal={() => modal.closeModal()}
      ><Logs logs={logs} /></Modal>
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
          <DetailsCard {...userData} winRatio={winRatio} setViewLogs={() => modal.openModal('logs')} />
          <Grid container justify={'center'} alignItems={'center'}  spacing={8}>
            <Grid item xs={12}>
              <Card>
                <CardActionArea>
                  <CardMedia
                    image={img}
                    style={{ height: 250 }}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Game!
                    </Typography>
                    <Typography variant={'body2'} color={'textSecondary'} component={'p'}>
                      Register outcome honestly. Walkover registers 6 losses.
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Grid item xs={12}>
                    <Button
                      handleClick={() => register('win')}
                      fullWidth
                    ><Mood />Won!</Button>
                    </Grid>
                  <Grid item xs={12}>
                    <Button
                      handleClick={() => register('loss')}
                      fullWidth
                    ><SentimentDissatisfied />Lost</Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      handleClick={() => register('wo')}
                      fullWidth
                    ><MoodBad /> Walkover
                    </Button>
                  </Grid>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
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
