import React from 'react';
import MuiButton from '@material-ui/core/Button';
import MuiIconButton from '@material-ui/core/IconButton';


export const ButtonOutlined = ({ children, handleClick }) => (
  <MuiButton
    variant={'outlined'}
    color={'inherit'}
    onClick={handleClick}
  >
    { children }
  </MuiButton>
);

export const ButtonOutlinedSm = ({ children, handleClick }) => (
  <MuiButton
    variant={'outlined'}
    color={'inherit'}
    onClick={handleClick}
    size={'small'}
  >
    { children }
  </MuiButton>
);

export const Button = ({ children, handleClick, disabled = false, fullWidth, role = 'button' }) => (
  <MuiButton
    variant={'contained'}
    color={'secondary'}
    onClick={handleClick}
    disabled={disabled}
    role={role}
    fullWidth={fullWidth}
  >
    { children }
  </MuiButton>
);

export const IconButton = ({ children, handleClick }) => (
  <MuiIconButton
    color={'default'}
    onClick={handleClick}
  >{ children } </MuiIconButton>
);

export default Button;
