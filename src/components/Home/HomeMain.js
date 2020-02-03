import React from 'react';
import PropTypes from 'prop-types';
import { Mood, SentimentDissatisfied, MoodBad } from '@material-ui/icons';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import img from './img.jpg';
import { Button } from '../Buttons';
import BulkForm from './BulkForm';

const HomeMain = ({
  register, handleBulkSubmit, loading, children, username, error,
}) => (
  <Grid container justify="center" alignItems="center">
    <Grid item xs={12}>
      <Card>
        <CardMedia
          image={img}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Welcome { username }!
          </Typography>
          <Typography variant="body1" color="textSecondary" component="p">
            Register a game outcome using buttons or multiple games below.
            Walkover registers 6 losses.
            Edit / Undo registration by using the log.
          </Typography>
          { error && <Typography align="center" variant="subtitle1" color="error">{ error.message }</Typography>}
        </CardContent>
        { children }
        <CardActions>
          <Grid item xs={12}>
            <Button
              handleClick={() => register('win')}
              disabled={loading}
              fullWidth
            >
              <Mood />Won!
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              handleClick={() => register('loss')}
              disabled={loading}
              fullWidth
            >
              <SentimentDissatisfied />Lost
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              handleClick={() => register('wo')}
              disabled={loading}
              fullWidth
            >
              <MoodBad /> Walkover
            </Button>
          </Grid>
        </CardActions>
        <BulkForm handleBulkSubmit={handleBulkSubmit} loading={loading} />
      </Card>
    </Grid>
  </Grid>
);

HomeMain.propTypes = {
  register: PropTypes.func.isRequired,
  handleBulkSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  children: PropTypes.object.isRequired,
  error: PropTypes.object, // eslint-disable-line
  username: PropTypes.string,
};

HomeMain.defaultProps = { username: '' };

export default HomeMain;
