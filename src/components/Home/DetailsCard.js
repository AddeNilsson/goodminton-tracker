import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { ButtonOutlinedSm } from '../Buttons';

const padding = { padding: '8px 0px' };
const margin = { marginBottom: 16 };

const DetailsCard = ({
  winRatio, win, loss, wo, total, touched = '', setViewLogs,
}) => (
  <CardContent>
    <Grid container>
      <Grid item xs={12} style={margin}>
        <Typography gutterBottom variant="h5" component="h2">
          Register A Game!
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Register a game outcome using buttons or multiple games below.
          Walkover registers 6 losses.
          Edit / Undo registration by using the log.
        </Typography>
      </Grid>
      <Grid item xs={12} lg={6} style={padding}>
        <Typography variant="subtitle1">Win Ratio: { winRatio }</Typography>
      </Grid>
      <Grid item xs={12} lg={6} style={padding}>
        <ButtonOutlinedSm
          handleClick={setViewLogs}
        >
          Logs
        </ButtonOutlinedSm>
      </Grid>
      <Grid item xs={12}><Divider /></Grid>
      <Grid item xs={6} lg={6}>
        <Typography variant="subtitle2">Won: { win }</Typography>
      </Grid>
      <Grid item xs={6} lg={6}>
        <Typography variant="subtitle2">Lost: { loss }</Typography>
      </Grid>
      <Grid item xs={12}><Divider /></Grid>

      <Grid item xs={6} lg={6}>
        <Typography variant="subtitle2">Wlk-overs: { wo }</Typography>
      </Grid>
      <Grid item xs={6} lg={6}>
        <Typography variant="subtitle2" display="inline">
          Games Total: { total } <Typography variant="caption" style={{ display: 'inline' }}>({ wo * 6 } missed)</Typography>
        </Typography>
      </Grid>
      <Grid item xs={12}><Divider /></Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle2">Updated: { touched }</Typography>
      </Grid>
      <Grid item xs={12}><Divider /></Grid>
    </Grid>
  </CardContent>
);

DetailsCard.propTypes = {
  setViewLogs: PropTypes.func.isRequired,
  winRatio: PropTypes.number.isRequired,
  win: PropTypes.number.isRequired,
  loss: PropTypes.number.isRequired,
  wo: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  touched: PropTypes.string.isRequired,
};

export default DetailsCard;
