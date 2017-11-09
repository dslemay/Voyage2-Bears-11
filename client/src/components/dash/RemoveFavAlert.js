import React from 'react';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';

const style = {
  float: 'right'
};

class RemoveFavAlert extends React.Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <IconButton style={style} onClick={this.handleClickOpen}>
          <CloseIcon />
        </IconButton>
        <Dialog open={this.state.open} onRequestClose={this.handleRequestClose}>
          <DialogTitle>
            {'Are you sure you want to remove from your favorites?'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              This removes your item from the favorites dashboard. You will not
              be able to re-add it from this page.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleRequestClose} color="accent">
              Cancel
            </Button>
            <Button onClick={this.handleRequestClose} color="primary" autoFocus>
              Continue
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default RemoveFavAlert;
