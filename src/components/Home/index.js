import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

import { UserContext, withAuthorization } from '../Session';
import PlayerDetails from './PlayerDetails';
import Leaderboards from '../Leaderboards';
import Modal, { useModal } from '../Modal';
import LogsList from './LogsList';
import HomeMain from './HomeMain';
import useGameRegister from '../../hooks/useGameRegister';

const leaderboardColumns = [
  { id: 'username', label: 'Username' },
  { id: 'ratio', label: 'Win Ratio' },
];

const Home = ({ firebase, user }) => {
  const [userData, setUserData] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { showModal, closeModal, openModal } = useModal();
  const { register, unregister, registerBulk } = useGameRegister({
    firebase, uid: user.uid, setError, setLoading,
  });

  useEffect(() => {
    /* Retrieve User data */
    firebase.user(user.uid).on('value', (snapshot) => {
      const data = snapshot.val();
      setUserData({
        ...data,
        winRatio: Math.round((data.win / data.total) * 100) / 100 || 0,
      });
    });
    return () => firebase.user(user.uid).off();
  }, [firebase, user]);

  useEffect(() => {
    /* Retrieve User logs */
    firebase.log(user.uid).on('value', (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const logArr = Object.keys(data)
          .map(key => ({ id: key, ...data[key] }));
        setLogs(logArr);
      }
    });
    return () => firebase.logs(user.uid).off();
  }, [firebase, user]);

  if (!userData) return null;

  const handleRegister = state => register({ state, userData });
  const handleUnregister = entry => unregister({ entry, userData });
  const handleBulkSubmit = data => registerBulk({ userData, data });

  return (
    <Grid container justify="center">
      <Grid item xs={12} sm={10} md={8} lg={6} xl={5}>
        <Modal
          title="User Logs"
          show={showModal === 'logs'}
          maxWidth="lg"
          fullWidth
          closeModal={() => closeModal()}
        >
          <LogsList logs={logs} unregister={handleUnregister} />
        </Modal>
        <HomeMain
          register={handleRegister}
          handleBulkSubmit={handleBulkSubmit}
          loading={loading}
          error={error}
        >
          <Grid container>
            <Grid item xs={12} md={6}>
              <PlayerDetails
                {...userData}
                setViewLogs={() => openModal('logs')}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Leaderboards
                rowLimit={3}
                columns={leaderboardColumns}
              />
            </Grid>
          </Grid>
        </HomeMain>
      </Grid>
    </Grid>
  );
};

const HomePage = props => (
  <UserContext.Consumer>
    { user => (<Home {...props} user={user} />) }
  </UserContext.Consumer>
);

Home.propTypes = {
  firebase: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

const condition = user => !!user;
export default withAuthorization(condition)(HomePage);
