import React from 'react';
import PropTypes from 'prop-types';

import MenuItem from '../MenuItem';
import * as routes from '../../constants/routes';
import { UserContext } from '../Session';

const Navigation = ({ closeMenu }) => (
  <UserContext.Consumer>
    {user => (
      Object.keys(routes)
        .map(route => routes[route])
        .filter(r => (!user && !r.auth) || (user && r.auth))
        .map((route, key) => (
          <MenuItem
            key={key}
            icon={route.icon}
            handleClick={closeMenu}
            path={route.path}
            name={route.name}
          />
        ))
    )}
  </UserContext.Consumer>
);

Navigation.propTypes = { closeMenu: PropTypes.func.isRequired };

export default Navigation;
