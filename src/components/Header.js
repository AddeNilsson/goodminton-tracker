import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import ConnectedIcon from '@material-ui/icons/CheckCircle';
import DisconnectedIcon from '@material-ui/icons/ReportProblem';

const Header = ({ startGame, getGames, player, connected }) => {
  const [gameName, setGameName] = useState('');
  const handleNewGameClick = () => {
    startGame(gameName);
    setGameName('');
  };

  return (
    <AppBar style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      {connected
        ? <ConnectedIcon  color={'action'} />
        : <DisconnectedIcon color={'error'} />}
      <TextField
        value={gameName}
        type={'text'}
        label={'Namnge Spelet'}
        onChange={e => setGameName(e.target.value)}
        />
      <Button onClick={handleNewGameClick}>
        Starta nytt spel
      </Button>

      <Button onClick={getGames}>
        Hämta spel
      </Button>

      <Typography variant={'caption'}>
        {player && (`Joined As: ${player.playerName}`)}
      </Typography>
    </AppBar>
  );
}

export default Header;
