import moment from 'moment';
import useGameLog from './useGameLog';

const useGameRegister = ({
  setError, firebase, uid, setLoading,
}) => {
  const {
    getLogEntryRegister,
    getLogEntryRevert,
    addToGameLog,
    updateEntry,
    getLogEntryBulk,
  } = useGameLog({ firebase, setError, uid });

  const updateUserData = ({ payload, logEntry, logUpdate }) => {
    firebase.user(uid)
      .set(payload)
      .then(() => { addToGameLog({ entry: logEntry }); })
      .then(() => {
        if (logUpdate) {
          updateEntry({ logUpdate });
        }
      })
      .catch((err) => { setError(err); })
      .finally(() => { setLoading(false); });
  };

  const registerBulk = ({ userData, data }) => {
    setLoading(true);
    const { bulkWin, bulkLoss } = data;
    const { total, win, loss } = userData;

    const payload = {
      ...userData,
      touched: moment().format('YYYY-MM-DD HH:mm:ss'),
      win: win + bulkWin,
      loss: loss + bulkLoss,
      total: total + bulkWin + bulkLoss,
    };
    const logEntry = getLogEntryBulk(data);

    updateUserData({ payload, logEntry });
  };

  const register = ({ state, userData }) => { // eslint-disable-line consistent-return
    setLoading(true);
    const {
      total, win, loss, wo,
    } = userData;

    const touched = moment().format('YYYY-MM-DD HH:mm:ss');
    const payload = { ...userData, touched };

    switch (state) {
      case 'win': {
        Object.assign(payload, { total: total + 1, win: win + 1 });
        break;
      }
      case 'loss': {
        Object.assign(payload, { total: total + 1, loss: loss + 1 });
        break;
      }
      case 'wo': {
        Object.assign(payload, { total: total + 6, wo: wo + 1, loss: userData.loss + 6 });
        break;
      }
      default: return false;
    }

    const logEntry = getLogEntryRegister(state);

    updateUserData({ payload, logEntry });
  };

  /* eslint-disable camelcase */
  const unregister = ({ entry, userData }) => {
    setLoading(true);
    const touched = moment().format('YYYY-MM-DD HH:mm:ss');
    const {
      total, win, loss, wo,
    } = userData;
    const {
      id, amount_win, amount_loss, amount_games_total, amount_wo,
    } = entry;

    const payload = {
      ...userData,
      win: win - amount_win,
      loss: loss - amount_loss,
      wo: wo - amount_wo,
      total: total - amount_games_total,
      touched,
    };

    const logEntry = getLogEntryRevert({ entry });
    const logUpdate = { id, payload: { reverted: 1, revertable: 0 } };

    updateUserData({ payload, logEntry, logUpdate });
  };

  return {
    register,
    registerBulk,
    unregister,
  };
};

export default useGameRegister;
