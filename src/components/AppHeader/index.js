import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import { IconButton } from '../Buttons';
import SignOut from '../SignOut';
import { UserContext } from '../Session';

const useStyles = makeStyles(theme => ({
  toolbar: {
    minHeight: 'unset',
    justifyContent: 'space-between',
    padding: '0 .5em',
    height: theme.toolbarHeight,
  },
  alignCenter: { textAlign: 'center' },
  alignRight: { textAlign: 'right' },
  icon: { color: '#eee' },
}));

const AppHeader = ({ handleMenu }) => {
  const classes = useStyles();
  return (
    <AppBar color="primary" position="absolute">
      <Toolbar className={classes.toolbar} disableGutters>
        <Grid item xs={6} md={3}>
          <IconButton handleClick={handleMenu}>
            <MenuIcon className={classes.icon} />
          </IconButton>
        </Grid>
        <Hidden smDown>
          <Grid item md={6}>
            <h1 className={classes.alignCenter}>Goodminton Tracker</h1>
          </Grid>
        </Hidden>
        <Grid item xs={6} md={3} className={classes.alignRight}>
          <UserContext.Consumer>
            {user => (user ? <SignOut /> : <div />)}
          </UserContext.Consumer>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

AppHeader.propTypes = {
  handleMenu: PropTypes.func.isRequired,
};

export default AppHeader;
