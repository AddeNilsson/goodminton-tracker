import React from 'react';
import PropTypes from 'prop-types';
import MuiButton from '@material-ui/core/Button';
import MuiIconButton from '@material-ui/core/IconButton';

export const ButtonOutlined = ({ children, handleClick }) => (
  <MuiButton
    variant="outlined"
    color="inherit"
    onClick={handleClick}
  >
    { children }
  </MuiButton>
);

export const ButtonOutlinedSm = ({ children, handleClick }) => (
  <MuiButton
    variant="outlined"
    color="inherit"
    onClick={handleClick}
    size="small"
  >
    { children }
  </MuiButton>
);

export const Button = ({
  children, handleClick, disabled, fullWidth, role, color,
}) => (
  <MuiButton
    variant="contained"
    color={color}
    onClick={handleClick}
    disabled={disabled}
    role={role}
    fullWidth={fullWidth}
  >
    { children }
  </MuiButton>
);

Button.defaultProps = {
  role: 'button',
  color: 'primary',
  disabled: false,
  fullWidth: false,
};

export const IconButton = ({ children, handleClick }) => (
  <MuiIconButton
    color="default"
    onClick={handleClick}
  >
    { children }
  </MuiIconButton>
);

export const IconButtonSm = ({ children, handleClick, disabled }) => (
  <MuiIconButton
    disabled={disabled}
    color="default"
    onClick={handleClick}
    size="small"
  >
    { children }
  </MuiIconButton>
);

ButtonOutlined.propTypes = {
  handleClick: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
};

ButtonOutlinedSm.propTypes = {
  handleClick: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
};

Button.propTypes = {
  handleClick: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
  role: PropTypes.string,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
};

IconButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
};

IconButtonSm.propTypes = {
  handleClick: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default Button;
