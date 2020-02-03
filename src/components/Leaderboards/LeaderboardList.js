import React from 'react';
import PropTypes from 'prop-types';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Table from '../Table';

const LeaderboardList = ({ rows, cols }) => (
  <div>
    <Toolbar>
      <Typography variant="h6">Top 3</Typography>
    </Toolbar>
    <Table columnData={cols}>
      { rows.map((r, i) => (
        <TableRow key={i}>
          { cols.map((c, key) => <TableCell key={key}>{ r[c.id] }</TableCell>) }
        </TableRow>
      ))}
    </Table>
  </div>
);

LeaderboardList.propTypes = {
  rows: PropTypes.array.isRequired,
  cols: PropTypes.array.isRequired,
};

export default LeaderboardList;
