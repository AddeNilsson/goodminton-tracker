import React from 'react';
import * as Icons from '@material-ui/icons/';
import ListItem from '@material-ui/core/ListItem';
import Tooltip from '@material-ui/core/Tooltip';
import { IconButton } from './Buttons';
import { Link } from 'react-router-dom';

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
