import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { Button } from '../Buttons';

const BulkForm = ({ handleBulkSubmit, loading }) => {
  const [expanded, setExpanded] = useState(false);
  const [formData, setFormData] = useState({ bulkWin: 0, bulkLoss: 0 });
  const handleSubmit = (e) => {
    e.preventDefault();
    handleBulkSubmit(formData);
    setFormData({ bulkWin: 0, bulkLoss: 0 });
    setExpanded(false);
  };
  const handleKey = e => (e.keyCode === 13 ? handleSubmit(e) : null);
  const { bulkWin, bulkLoss } = formData;

  return (
    <ExpansionPanel expanded={expanded}>
      <ExpansionPanelSummary
        onClick={() => setExpanded(!expanded)}
        expandIcon={<ExpandMoreIcon />}
      >
        Register multiple games
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Grid container justify="center" alignItems="flex-end">
          <Grid item xs={12} md={12}>
            <form onSubmit={e => handleSubmit(e)} onKeyDown={handleKey} autoComplete="off" role="presentation">
              <Grid container alignItems="center" spacing={8}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    value={bulkWin}
                    type="number"
                    label="Wins"
                    onChange={e => setFormData({ bulkWin: Number(e.target.value), bulkLoss })}
                    name="wins"
                    fullWidth
                    onFocus={e => e.target.select()}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    value={bulkLoss}
                    type="number"
                    label="Losses"
                    onChange={e => setFormData({ bulkWin, bulkLoss: Number(e.target.value) })}
                    name="losses"
                    fullWidth
                    onFocus={e => e.target.select()}
                  />
                </Grid>
                <Grid item xs={12} sm={4} style={{ textAlign: 'right' }}>
                  <Button
                    disabled={loading}
                    handleClick={handleSubmit}
                  >
                    { !loading ? 'Done' : 'Loading..' }
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

BulkForm.propTypes = {
  handleBulkSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default BulkForm;
