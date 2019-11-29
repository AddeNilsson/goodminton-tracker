import React from 'react';
import * as Icons from '@material-ui/icons/'; // TODO: Rewrite this, only imort used ones
import ListItem from '@material-ui/core/ListItem';
import Tooltip from '@material-ui/core/Tooltip';
import { Link } from 'react-router-dom';

console.log('TODO: rewrite icon imports');

const MenuItem = ({ icon, handleClick, tooltip = null, path, name }) => {
  const Icon = Icons[icon];
  const item = (
    <ListItem component={Link} to={path} onClick={handleClick}>
      <Icon />
      { name }
    </ListItem>
  );
  return tooltip
    ? (
      <Tooltip title={tooltip} placement={'top'}>
        {item}
      </Tooltip>
    )
    : item;
};
export default MenuItem;
