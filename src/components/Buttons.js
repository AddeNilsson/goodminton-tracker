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
export const Button = ({ children, handleClick, disabled = false }) => (
  <MuiButton
    variant={'contained'}
    color={'secondary'}
    onClick={handleClick}
    disabled={disabled}
    role={'button'}
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
