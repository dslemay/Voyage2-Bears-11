import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateFavorites } from '../../actions';
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

class RemoveFavAlert extends Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  handleRequestConfirm = () => {
    const { category, yelpId } = this.props;
    this.setState({ open: false });
    this.props.updateFavorites(category, yelpId);
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
            <Button onClick={this.handleRequestConfirm} color="primary">
              Continue
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default connect(null, { updateFavorites })(RemoveFavAlert);
