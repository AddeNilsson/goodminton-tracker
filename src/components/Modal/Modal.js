import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import CloseIcon from '@material-ui/icons/Close';
import { IconButton } from '../Buttons';

const Transition = (props) => (
  <Slide direction="up" {...props} />
);

const Modal = ({
  show, closeModal, title, children, maxWidth,
}) => (
  <Dialog
    open={show}
    TransitionComponent={Transition}
    keepMounted
    onClose={closeModal}
    maxWidth={maxWidth}
  >
    <Grid container justify={'space-between'} alignItems={'center'}>
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

Modal.defaultProps = {
  maxWidth: 'md',
};

export default Modal;
