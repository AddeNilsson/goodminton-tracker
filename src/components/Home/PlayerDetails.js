import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Card from '@material-ui/core/Card';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { ButtonOutlinedSm } from '../Buttons';

const PlayerDetails = ({
  winRatio, win, loss, wo, total, touched, setViewLogs, username,
}) => (
  <Card>
    <Toolbar>
      <Typography variant="h6">Stats for { username }</Typography>
    </Toolbar>
    <List>
      <ListItem divider>
        <ListItemText primary={`Ratio: ${winRatio}`} />
        <ListItemSecondaryAction>
          <ButtonOutlinedSm handleClick={setViewLogs}>
            Logs
          </ButtonOutlinedSm>
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem divider>
        <ListItemText primary={`Won: ${win}`} />
        <ListItemText primary={`Lost: ${loss}`} />
      </ListItem>
      <ListItem divider>
        <ListItemText primary={`Wlk-overs: ${wo}`} />
        <ListItemText primary={`Games: ${total}`} />
      </ListItem>
      <ListItem divider>
        <ListItemText primary={`Updated: ${touched}`} />
      </ListItem>
    </List>
  </Card>
);

PlayerDetails.propTypes = {
  setViewLogs: PropTypes.func.isRequired,
  winRatio: PropTypes.number.isRequired,
  win: PropTypes.number.isRequired,
  loss: PropTypes.number.isRequired,
  wo: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  touched: PropTypes.string,
};

PlayerDetails.defaultProps = {
  touched: '',
};

export default PlayerDetails;
