import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Table from '../Table';

const columns = [
  { id: 'date', label: 'Date' },
  { id: 'action', label: 'Action' },
];

const Logs = ({ logs }) => (
  <Table columnData={columns}>
  { logs
    .sort((a, b) => (
      a.date > b.date ? -1 : b.date > a.date ? 1 : 0
    ))
    .map((l, i) => (
    <TableRow key={i}>
      { columns.map((c, i) => <TableCell key={i}>{ l[c.id] }</TableCell>) }
    </TableRow>
  ))}
</Table>
);

export default Logs;