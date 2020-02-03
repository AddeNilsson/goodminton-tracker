import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';

import { withFirebase } from './Firebase';
import useUsers from '../hooks/useUsers';

const TopList = ({ firebase, setLoading, rowLimit }) => {
  // TODO: limit length in request ?
  const { users } = useUsers({ firebase, setLoading });
  return (
    <Card>
      <Toolbar>
        <Typography variant="h6">Top { rowLimit }</Typography>
      </Toolbar>
      <List>
        { users
          .slice(0, rowLimit)
          .map(u => (
            <ListItem divider key={u.uid}>
              <ListItemText primary={u.username} />
              <ListItemText primary={u.ratio} />
            </ListItem>
          ))}
      </List>
    </Card>
  );
};

TopList.propTypes = {
  firebase: PropTypes.object.isRequired,
  setLoading: PropTypes.func.isRequired,
  rowLimit: PropTypes.number.isRequired,
};

export default withFirebase(TopList);
