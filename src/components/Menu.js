import React from 'react';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import CloseIcon from '@material-ui/icons/Close';
import { IconButton } from './Buttons';
import Navigation from './Navigation';

const Menu = ({ open, closeMenu, anchor }) => (
  <Drawer open={open} onClose={closeMenu} anchor={anchor}>
    <div>
      <IconButton handleClick={closeMenu}>
        <CloseIcon />
      </IconButton>
    </div>
    <Navigation closeMenu={closeMenu} />
  </Drawer>
);

Menu.propTypes = {
  closeMenu: PropTypes.func.isRequired,
  anchor: PropTypes.string,
  open: PropTypes.bool.isRequired,
};

Menu.defaultProps = {
  anchor: 'left',
};

export default Menu;
