import React, { useState, useEffect } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
import Table from '../Table';

const columns = [
  { id: 'uid', label: 'User Id' },
  { id: 'username', label: 'Username' },
  { id: 'email', label: 'User Email' },
];

const UsersList = ({ users }) => (
  <Table columnData={columns}>
    { users.map(u => (
      <TableRow>
        { columns.map(c => <TableCell>{ u[c.id] }</TableCell>) }
      </TableRow>
    ))}
  </Table>
);

const Admin = ({ firebase }) => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    setLoading(true);
    firebase.users().on('value', snapshot => {
      const data = snapshot.val();
      const usersData = Object.keys(data).map(key => ({
        uid: key,
        ...data[key]
      }));
      setUsers(usersData);
      setLoading(false);
    });
    return () => firebase.users().off()
  }, []);

  return (
    <div>
      <h1>Admin!</h1>
      { loading
          ? <p>Loading</p>
          : <UsersList users={users} />
      }
    </div>
  );
};
const condition = user => !!user;

export default withFirebase(withAuthorization(condition)(Admin));
