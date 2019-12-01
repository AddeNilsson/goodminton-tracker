import React from 'react';
import { Mood, SentimentDissatisfied, MoodBad } from '@material-ui/icons';
import Grid from '@material-ui/core/Grid';
import { Card, CardContent, CardActionArea, CardMedia, CardActions, Typography } from '@material-ui/core';

import img from './img.jpg';
import { Button } from '../Buttons';
import BulkForm from './BulkForm';

const HomeMain = ({ register, handleBulkSubmit }) => (
  <Grid container justify={'center'} alignItems={'center'} spacing={8}>
    <Grid item xs={12}>
      <Card>
        <CardActionArea>
          <CardMedia
            image={img}
            style={{ height: 250 }}
          />
          <CardContent>
            <Typography gutterBottom variant={'h5'} component={'h2'}>
              Register A Game!
            </Typography>
            <Typography variant={'body2'} color={'textSecondary'} component={'p'}>
              Register a game outcome using buttons or multiple games below. Walkover registers 6 losses.
              Edit / Undo registration by using the log.
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Grid item xs={12}>
            <Button
              handleClick={() => register('win')}
              fullWidth
            ><Mood />Won!</Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              handleClick={() => register('loss')}
              fullWidth
            ><SentimentDissatisfied />Lost</Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              handleClick={() => register('wo')}
              fullWidth
            ><MoodBad /> Walkover</Button>
          </Grid>
        </CardActions>
        <BulkForm handleBulkSubmit={handleBulkSubmit} />
      </Card>
    </Grid>
  </Grid>
);

export default HomeMain;