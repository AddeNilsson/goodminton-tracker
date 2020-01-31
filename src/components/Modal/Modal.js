import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import CloseIcon from '@material-ui/icons/Close';

import { IconButton } from '../Buttons';

const Modal = ({
  show, closeModal, title, children, maxWidth, fullWidth,
}) => (
  <Dialog
    open={show}
    onClose={closeModal}
    maxWidth={maxWidth}
    fullWidth={fullWidth}
  >
    <Grid container justify="space-between" alignItems="center">
      <Grid item xs={8}>
        <DialogTitle>
          { title }
        </DialogTitle>
      </Grid>
      <Grid item xs={4}>
        <DialogTitle style={{ textAlign: 'right' }}>
          <IconButton
            handleClick={closeModal}
          ><CloseIcon />
          </IconButton>
        </DialogTitle>
      </Grid>
    </Grid>
    <DialogContent>
      { children }
    </DialogContent>
  </Dialog>
);

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  maxWidth: PropTypes.string,
  show: PropTypes.bool.isRequired,
  fullWidth: PropTypes.bool,
};

Modal.defaultProps = {
  maxWidth: 'md',
  fullWidth: false,
};

export default Modal;
