import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import Hidden from '@material-ui/core/Hidden';
import { IconButton } from '../Buttons';
import SignOut from '../SignOut';
import { UserContext } from '../Session';

console.log('removed user prop here, check');

const AppHeader = ({ height, handleMenu }) => ( // removed user prop ..?
  <AppBar color="primary">
    <Toolbar style={{ height, minHeight: 'unset', justifyContent: 'space-between' }}>
      <IconButton handleClick={handleMenu}>
        <MenuIcon />
      </IconButton>
      <Hidden xsDown>
        <h1>Goodminton Tracker</h1>
      </Hidden>
      <Hidden smUp>
        <h5>Goodminton Tracker</h5>
      </Hidden>
      <UserContext.Consumer>
        {user => (user ? <SignOut /> : <div />)}
      </UserContext.Consumer>
    </Toolbar>
  </AppBar>
);

AppHeader.propTypes = {
  handleMenu: PropTypes.func.isRequired,
  height: PropTypes.number.isRequired,
};

export default AppHeader;
