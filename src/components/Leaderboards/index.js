import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';

import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
import useUsers from '../../hooks/useUsers';
import LeaderboardList from './LeaderboardList';

const Leaderboards = ({ firebase, columns, rowLimit }) => {
  const [loading, setLoading] = useState(false);
  const { users } = useUsers({ setLoading, firebase });
  if (users.length < 1) return null;
  const rows = rowLimit
    ? users.slice(0, rowLimit)
    : users;
  return (
    <Grid container justify="center">
      <Grid item xs={12} md={10}>
        <Card>
          { loading
            ? <p>Loading</p>
            : <LeaderboardList rows={rows} cols={columns} /> }
        </Card>
      </Grid>
    </Grid>
  );
};

Leaderboards.propTypes = {
  firebase: PropTypes.object.isRequired,
  columns: PropTypes.array,
  rowLimit: PropTypes.number,
};

Leaderboards.defaultProps = {
  columns: [
    { id: 'username', label: 'Username' },
    { id: 'ratio', label: 'Win Ratio' },
    { id: 'win', label: 'User Total Won' },
    { id: 'loss', label: 'User Total Lost' },
    { id: 'wo', label: 'User Walk-overs' },
    { id: 'total', label: 'User Total Games' },
  ],
  rowLimit: null,
};

const condition = user => !!user;

export default withFirebase(withAuthorization(condition)(Leaderboards));
