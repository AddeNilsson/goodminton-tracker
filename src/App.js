import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import AppHeader from './components/AppHeader';
import Menu from './components/Menu';
import Routes from './Routes';
import { withAuthentication } from './components/Session';

const useStyles = makeStyles(theme => ({
  main: {
    marginTop: theme.toolbarHeight + 16,
  },
}));

const App = () => {
  const [menuOpen, toggleMenu] = useState(false);
  const classes = useStyles();
  console.log('todo: pswforget & pswchange');
  return (
    <Router>
      <>
        <AppHeader handleMenu={() => toggleMenu(!menuOpen)} />
        <Menu closeMenu={() => toggleMenu(false)} open={menuOpen} />
        <main className={classes.main}>
          <Routes />
        </main>
      </>
    </Router>
  );
};

export default withAuthentication(App);
