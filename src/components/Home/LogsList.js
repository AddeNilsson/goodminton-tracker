import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Table from '../Table';
import { ButtonOutlinedSm, IconButtonSm } from '../Buttons';
import UndoIcon from '@material-ui/icons/Undo';

const columns = [
  { id: 'date', label: 'Date' },
  { id: 'action', label: 'Action' },
  { id: 'revert', label: 'Undo' },

];

const Logs = ({ logs, unregister }) => (
  <Table columnData={columns}>
  { logs
    .sort((a, b) => (
      a.date > b.date ? -1 : b.date > a.date ? 1 : 0
    ))
    .map((l, i) => (
    <TableRow key={i}>
      { columns.map((c, i) => (
        c.id !== 'revert'
          ? <TableCell key={i}>{ l[c.id] }</TableCell>
          : (
            <TableCell>
              <IconButtonSm key={i} disabled={!l.revertable}
                handleClick={() => unregister(l)}
              ><UndoIcon /></IconButtonSm>
            </TableCell>
          )
      )) }
    </TableRow>
  ))}
</Table>
);

export default Logs;