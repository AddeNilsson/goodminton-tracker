import React from 'react';
import Toolbar from '@material-ui/core/Toolbar'
import AppBar from '@material-ui/core/AppBar'
import { ButtonOutlined, IconButton } from '../Buttons'
import MenuIcon from '@material-ui/icons/Menu';
import SignOut from '../SignOut';
import { UserContext } from '../Session';

const AppHeader = ({ height, handleMenu, user }) => (
  <AppBar color={'primary'}>
    <Toolbar style={{ height, minHeight: 'unset', justifyContent: 'space-between' }}>
      <IconButton
        handleClick={handleMenu}
      ><MenuIcon /></IconButton>
      <h1>AppBar</h1>
      <UserContext.Consumer>
        {user => user ? <SignOut /> : <div />}
      </UserContext.Consumer>
    </Toolbar>
  </AppBar>
);

export default AppHeader;
