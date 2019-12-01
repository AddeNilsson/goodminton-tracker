import React, { useState } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { Button } from '../Buttons';

const BulkForm = ({ handleBulkSubmit, loading }) => {
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const handleKey = e => e.keyCode === 13 ? handleSubmit(e) : null;

  const handleSubmit = e => {
    e.preventDefault();
    handleBulkSubmit({ wins: Number(wins), losses: Number(losses) });
    setWins(0);
    setLosses(0);
    setExpanded(false);
  }

  return (
    <ExpansionPanel expanded={expanded}>
      <ExpansionPanelSummary
        onClick={() => setExpanded(!expanded)}
        expandIcon={<ExpandMoreIcon />}
      >Register multiple games</ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Grid container justify={'center'} alignItems={'flex-end'}>
          <Grid item xs={12} md={12}>
            <form onSubmit={e => handleSubmit(e)} onKeyDown={handleKey} autoComplete={'off'}>
              <Grid container alignItems={'center'} spacing={8}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    value={wins}
                    type={'number'}
                    label={'Wins'}
                    onChange={e => setWins(e.target.value)}
                    name={'wins'}
                    fullWidth
                    onFocus={e => e.target.select()}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                <TextField
                  value={losses}
                  type={'number'}
                  label={'Losses'}
                  onChange={e => setLosses(e.target.value)}
                  name={'losses'}
                  fullWidth
                  onFocus={e => e.target.select()}
                />
                </Grid>
                <Grid item xs={12} sm={4} style={{ textAlign: 'right' }}>
                  <Button
                    disabled={loading}
                    handleClick={handleSubmit}
                  >{!loading ? 'Done' : 'Loading..'}</Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

export default BulkForm;
