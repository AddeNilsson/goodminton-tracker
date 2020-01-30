import React from 'react';
import PropTypes from 'prop-types';
import { Mood, SentimentDissatisfied, MoodBad } from '@material-ui/icons';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';

import img from './img.jpg';
import { Button } from '../Buttons';
import BulkForm from './BulkForm';

const HomeMain = ({
  register, handleBulkSubmit, loading, children,
}) => (
  <Grid container justify="center" alignItems="center" spacing={8}>
    <Grid item xs={12}>
      <Card>
        <CardMedia
          image={img}
          style={{ height: 250 }}
        />
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
};

export default HomeMain;
