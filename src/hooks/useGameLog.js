/* eslint-disable camelcase */
import moment from 'moment';

const useGameLog = ({ firebase, uid, setError }) => {
  const getLogEntryRegister = (state) => {
    const touched = moment().format('YYYY-MM-DD HH:mm:ss');
    return {
      action_text: `register_${state}`,
      amount_win: state === 'win' ? 1 : 0,
      amount_loss: state === 'loss' ? 1 : state === 'wo' ? 6 : 0,
      amount_wo: state === 'wo' ? 1 : 0,
      amount_games_total: state === 'wo' ? 6 : 1,
      date: touched,
      revertable: 1,
      reverted: 0,
    };
  };

  const getLogEntryBulk = ({ bulkWin, bulkLoss }) => ({
    action_text: 'register_bulk',
    date: moment().format('YYYY-MM-DD HH:mm:ss'),
    amount_loss: bulkLoss,
    amount_win: bulkWin,
    amount_games_total: bulkWin + bulkLoss,
    amount_wo: 0,
    revertable: 1,
    reverted: 0,
  });

  const getLogEntryRevert = ({ entry }) => {
    const {
      action_text, amount_win, amount_loss, amount_games_total, amount_wo,
    } = entry;
    const touched = moment().format('YYYY-MM-DD HH:mm:ss');
    return {
      action_text: `un${action_text}`,
      date: touched,
      amount_win: -Math.abs(amount_win),
      amount_loss: -Math.abs(amount_loss),
      amount_wo: -Math.abs(amount_wo),
      amount_games_total: -Math.abs(amount_games_total),
      revertable: 0,
      reverted: 0,
    };
  };

  const addToGameLog = ({ entry }) => {
    firebase.log(uid).push(entry)
      .catch((err) => { setError(err); });
  };

  const updateEntry = ({ logUpdate }) => {
    const { id, payload } = logUpdate;
    firebase.log(`${uid}/${id}`).update(payload);
  };

  return {
    getLogEntryRegister,
    getLogEntryBulk,
    getLogEntryRevert,
    addToGameLog,
    updateEntry,
  };
};

export default useGameLog;
