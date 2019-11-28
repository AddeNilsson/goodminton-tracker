import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import CloseIcon from '@material-ui/icons/Close';
import { IconButton } from './Buttons';
import Navigation from './Navigation';

const Menu = ({ children, open, closeMenu, anchor = 'left' }) => (
  <Drawer open={open} onClose={closeMenu} anchor={anchor}>
    <div>
      <IconButton handleClick={closeMenu}>
        <CloseIcon />
      </IconButton>
    </div>
    <Navigation closeMenu={closeMenu} />
  </Drawer>
)

export default Menu;
