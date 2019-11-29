import React from 'react';
import Toolbar from '@material-ui/core/Toolbar'
import AppBar from '@material-ui/core/AppBar'
import { IconButton } from '../Buttons'
import MenuIcon from '@material-ui/icons/Menu';
import SignOut from '../SignOut';
import { UserContext } from '../Session';
import Hidden from '@material-ui/core/Hidden';

const AppHeader = ({ height, handleMenu, user }) => (
  <AppBar color={'primary'}>
    <Toolbar style={{ height, minHeight: 'unset', justifyContent: 'space-between' }}>
      <IconButton
        handleClick={handleMenu}
      ><MenuIcon /></IconButton>
      <Hidden xsDown>
        <h1>Goodminton Tracker</h1>
      </Hidden>
      <Hidden smUp>
        <h5>Goodminton Tracker</h5>
      </Hidden>
      <UserContext.Consumer>
        {user => user ? <SignOut /> : <div />}
      </UserContext.Consumer>
    </Toolbar>
  </AppBar>
);

export default AppHeader;
