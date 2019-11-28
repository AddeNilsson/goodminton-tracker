import React from 'react';
import MuiTable from '@material-ui/core/Table';
import MuiTableRow from '@material-ui/core/TableRow';
import MuiTableHead from '@material-ui/core/TableHead';
import MuiTableCell from '@material-ui/core/TableCell';
import MuiTableBody from '@material-ui/core/TableBody';

// import Table from '@material-ui/core/Table';
// import Table from '@material-ui/core/Table';

const Table = ({ columnData, rowData, children }) => (
  <MuiTable>
    <MuiTableHead>
      <MuiTableRow>
        {
          columnData.map(c => (
            <MuiTableCell key={c.id}>{ c.label }</MuiTableCell>
          ))
        }
      </MuiTableRow>
    </MuiTableHead>
    <MuiTableBody>
      { children }
    </MuiTableBody>
  </MuiTable>
);

export default Table;
