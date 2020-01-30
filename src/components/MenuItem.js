import React from 'react';
import PropTypes from 'prop-types';
import * as Icons from '@material-ui/icons/'; // TODO: Rewrite this, only imort used ones
import ListItem from '@material-ui/core/ListItem';
import Tooltip from '@material-ui/core/Tooltip';
import { Link } from 'react-router-dom';

console.log('TODO: rewrite icon imports');

const MenuItem = ({
  icon, handleClick, tooltip, path, name,
}) => {
  const Icon = Icons[icon];
  const item = (
    <ListItem component={Link} to={path} onClick={handleClick}>
      <Icon />
      { name }
    </ListItem>
  );
  return tooltip
    ? (
      <Tooltip title={tooltip} placement="top">
        {item}
      </Tooltip>
    )
    : item;
};

MenuItem.propTypes = {
  handleClick: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  tooltip: PropTypes.string,
  path: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

MenuItem.defaultProps = {
  tooltip: null,
};

export default MenuItem;
