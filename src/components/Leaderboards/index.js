import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
// import CardContent from '@material-ui/core/CardContent';

import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
import Table from '../Table';

const BoardList = ({ rows, cols }) => (
  <Table columnData={cols}>
    { rows.map((r, i) => (
      <TableRow key={i}>
        { cols.map((c, key) => <TableCell key={key}>{ r[c.id] }</TableCell>) }
      </TableRow>
    ))}
  </Table>
);

const Leaderboards = ({ firebase, columns, rowLimit }) => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    setLoading(true);
    firebase.users().on('value', (snapshot) => {
      const data = snapshot.val();
      const usersData = data
        ? Object.keys(data)
          .map(key => ({
            uid: key,
            ...data[key],
          }))
          .map(u => ({
            ...u,
            ratio: Math.round((u.win / u.total) * 100) / 100 || 0,
          }))
          .sort((a, b) => (
            a.ratio > b.ratio ? -1 : b.ratio > a.ratio ? 1 : 0
          ))
        : [];
      setUsers(usersData);
      setLoading(false);
    });
    return () => firebase.users().off();
  }, [firebase]);
  const rows = rowLimit
    ? users.slice(0, rowLimit)
    : users;
  return (
    <Grid container justify="center">
      <Grid item xs={12} md={10}>
        <Card>
          { loading
            ? <p>Loading</p>
            : <BoardList rows={rows} cols={columns} /> }
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

BoardList.propTypes = {
  rows: PropTypes.array.isRequired,
  cols: PropTypes.array.isRequired,
};

const condition = user => !!user;

export default withFirebase(withAuthorization(condition)(Leaderboards));
