import React, { useState, useEffect } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
import Table from '../Table';

const baseCols = [
  { id: 'username', label: 'Username' },
  { id: 'ratio', label: 'Win Ratio' },
  { id: 'win', label: 'User Total Won' },
  { id: 'loss', label: 'User Total Lost' },
  { id: 'wo', label: 'User Walk-overs' },
  { id: 'total', label: 'User Total Games' },
];

const BoardList = ({ users, cols }) => {
  return (
    <Table columnData={cols}>
      { users.map((u, i) => (
        <TableRow key={i}>
          { cols.map((c, i) => <TableCell key={i}>{ u[c.id] }</TableCell>) }
        </TableRow>
      ))}
    </Table>
  );
};

const Leaderboards = ({ firebase, columns }) => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const cols = columns || baseCols;
  useEffect(() => {
    setLoading(true);
    firebase.users().on('value', snapshot => {
      const data = snapshot.val();
      const usersData = data
        ? Object.keys(data)
          .map(key => ({
            uid: key,
            ...data[key]
          }))
          .map(u => ({
              ...u,
              ratio: Math.round((u.win / u.total) * 100) / 100 || 0
          }))
          .sort((a, b) => (
              a.ratio > b.ratio ? -1 : b.ratio > a.ratio ? 1 : 0
          ))
        : []
      setUsers(usersData);
      setLoading(false);
    });
    return () => firebase.users().off()
  }, [firebase]);
  return (
    <Grid container justify={'center'}>
      <Grid item xs={12} md={10}>
        <Card>
          <CardContent>
            { loading
              ? <p>Loading</p>
              : <BoardList users={users} cols={cols} />
          }
        </CardContent>
      </Card>
      </Grid>
    </Grid>
  );
};

const condition = user => !!user;

export default withFirebase(withAuthorization(condition)(Leaderboards));
