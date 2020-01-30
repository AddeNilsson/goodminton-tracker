import React from 'react';
import PropTypes from 'prop-types';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import UndoIcon from '@material-ui/icons/Undo';
import RevertedIcon from '@material-ui/icons/CheckCircle';
import Table from '../Table';
import { IconButtonSm } from '../Buttons';

const columns = [
  { id: 'date', label: 'Date' },
  { id: 'reverted', label: 'Reverted' },
  { id: 'action_text', label: 'Action' },
  { id: 'amount_win', label: 'Wins' },
  { id: 'amount_loss', label: 'Losses' },
  { id: 'amount_wo', label: 'Walkovers' },
  { id: 'amount_games_total', label: 'Games' },
  { id: 'revert', label: 'Undo' },
];

const Logs = ({ logs, unregister }) => (
  <Table size="small" padding="none" columnData={columns}>
    { logs
      .sort((a, b) => (
        a.date > b.date ? -1 : b.date > a.date ? 1 : 0
      ))
      .map((l, i) => (
        <TableRow key={i}>
          { columns.map((c, key) => (
            c.id === 'reverted'
              ? <TableCell align="left" style={{ padding: '2px 4px' }} key={key}>{ l.reverted ? <RevertedIcon color="action" /> : null }</TableCell>
              : c.id !== 'revert'
                ? <TableCell align="left" style={{ padding: '2px 4px' }} key={key}>{ l[c.id] }</TableCell>
                : (
                  <TableCell align="left" style={{ padding: '2px 4px' }} key={key}>
                    <IconButtonSm
                      key={i}
                      disabled={!l.revertable}
                      handleClick={() => unregister(l)}
                    >
                      <UndoIcon />
                    </IconButtonSm>
                  </TableCell>
                )
          )) }
        </TableRow>
      ))}
  </Table>
);

Logs.propTypes = {
  unregister: PropTypes.func.isRequired,
  logs: PropTypes.array.isRequired,
};

export default Logs;
