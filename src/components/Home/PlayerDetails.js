import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
// import CardContent from '@material-ui/core/CardContent';
// import Typography from '@material-ui/core/Typography';

import { ButtonOutlinedSm } from '../Buttons';

const PlayerDetails = ({
  winRatio, win, loss, wo, total, touched = '', setViewLogs, username, // eslint-disable-line
}) => (
  <>
    {/* <CardContent>
      <Typography variant="subtitle2">{ username.toUpperCase() } stats:</Typography>
    </CardContent> */}
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
  </>
);
PlayerDetails.propTypes = {
  setViewLogs: PropTypes.func.isRequired,
  winRatio: PropTypes.number.isRequired,
  win: PropTypes.number.isRequired,
  loss: PropTypes.number.isRequired,
  wo: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  touched: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

export default PlayerDetails;
