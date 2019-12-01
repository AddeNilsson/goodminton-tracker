import React from 'react';
import Grid from '@material-ui/core/Grid';
import { ButtonOutlinedSm } from '../Buttons';
import { Card, CardContent, Typography, Divider } from '@material-ui/core';

const DetailsCard = ({ winRatio, win, loss, wo, total, touched = '', setViewLogs }) => (
  <Card>
    <CardContent>
      <Grid container>
        <Grid item xs={12} lg={6}>
          <Typography variant={'subtitle1'}>Win Ratio: { winRatio }</Typography>
        </Grid>
        <Grid item xs={12} lg={6}>
          <ButtonOutlinedSm
            handleClick={setViewLogs}
          >Logs</ButtonOutlinedSm>
        </Grid>
        <Grid item xs={12}><Divider /></Grid>
        <Grid item xs={12} lg={6}>
          <Typography variant={'subtitle2'}>Won: { win }</Typography>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Typography variant={'subtitle2'}>Lost: { loss }</Typography>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Typography variant={'subtitle2'}>Wlk-overs: { wo }</Typography>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Typography variant={'subtitle2'} display={'inline'}>
            Games Total: { total } <Typography variant={'caption'} style={{ display: 'inline' }}>({ wo * 6 } missed)</Typography>
          </Typography>
        </Grid>
        <Grid item xs={12}><Divider /></Grid>
        <Grid item xs={12}>
          <Typography variant={'subtitle2'}>Updated: { touched }</Typography>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

export default DetailsCard;