import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

import { UserContext, withAuthorization } from '../Session';
import PlayerDetails from './PlayerDetails';
import Modal, { useModal } from '../Modal';
import LogsList from './LogsList';
import HomeMain from './HomeMain';
import useGameRegister from '../../hooks/useGameRegister';
import useUser from '../../hooks/useUser';
import TopList from '../TopList';

const Home = ({ firebase, user }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { userData, logs } = useUser({ firebase, user, setLoading });
  const { showModal, closeModal, openModal } = useModal();
  const { register, unregister, registerBulk } = useGameRegister({
    firebase, uid: user.uid, setError, setLoading,
  });

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
          <Grid container justify="space-between">
            <Grid item xs={12} md={6}>
              <PlayerDetails
                {...userData}
                setViewLogs={() => openModal('logs')}
              />
            </Grid>
            <Grid item xs={12} md={5}>
              <TopList setLoading={setLoading} rowLimit={4} />
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
