import React from 'react';
import MuiTable from '@material-ui/core/Table';
import MuiTableRow from '@material-ui/core/TableRow';
import MuiTableHead from '@material-ui/core/TableHead';
import MuiTableCell from '@material-ui/core/TableCell';
import MuiTableBody from '@material-ui/core/TableBody';

const Table = ({ columnData, rowData, children, size = 'medium', padding = 'default' }) => (
  <MuiTable size={size} padding={padding}>
    <MuiTableHead>
      <MuiTableRow>
        {
          columnData.map(c => (
            <MuiTableCell
              key={c.id}
              align={'left'}
              style={padding === 'none' ? { padding: '2px 4px'} : {}}
            >{ c.label }</MuiTableCell>
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
