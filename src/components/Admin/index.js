import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
import Table from '../Table';

const columns = [
  { id: 'uid', label: 'User Id' },
  { id: 'username', label: 'Username' },
  { id: 'email', label: 'User Email' },
  { id: 'win', label: 'User Total Won' },
  { id: 'loss', label: 'User Total Lost' },
  { id: 'wo', label: 'User Walk-overs' },
  { id: 'total', label: 'User Total Games' },
];

const UsersList = ({ users }) => (
  <Table columnData={columns}>
    { users.map((u, i) => (
      <TableRow key={i}>
        { columns.map(c => <TableCell key={c.id}>{ u[c.id] }</TableCell>) }
      </TableRow>
    ))}
  </Table>
);

const Admin = ({ firebase }) => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    setLoading(true);
    firebase.users().on('value', (snapshot) => {
      const data = snapshot.val();
      const usersData = Object.keys(data).map(key => ({
        uid: key,
        ...data[key],
      }));
      setUsers(usersData);
      setLoading(false);
    });
    return () => firebase.users().off();
  }, [firebase]);

  return (
    <Grid container justify="center">
      <Grid item xs={12} md={10}>
        <Card>
          <CardContent>
            <h1>Admin!</h1>
            { loading
              ? <p>Loading..</p>
              : <UsersList users={users} /> }
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

UsersList.propTypes = {
  users: PropTypes.array.isRequired,
};

Admin.propTypes = {
  firebase: PropTypes.object.isRequired,
};

const condition = user => !!user;

export default withFirebase(withAuthorization(condition)(Admin));
