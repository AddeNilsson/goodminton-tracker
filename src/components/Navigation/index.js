import React from 'react';
import MenuItem from '../MenuItem';
import * as routes from '../../constants/routes';
import { UserContext } from '../Session';

const Navigation = ({ closeMenu }) => {
  return (
    <UserContext.Consumer>
      {user => (
        Object.keys(routes)
          .map(route => routes[route])
          .filter(r => !r.auth || (user && r.auth))
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
};

export default Navigation;
