import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import FavoriteBorderIcon from 'material-ui-icons/FavoriteBorder';
import FavoriteIcon from 'material-ui-icons/Favorite';

const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4
  }
});

class SimpleSnackbar extends Component {
  state = {
    open: false,
    heart: false
  };

  // Connect handleClick to action creator?
  handleClick = () => {
    this.setState({ open: true, heart: !this.state.heart });
  };

  handleRequestClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };

  toggleHeart = () => {
    // check redux state for heart
    return this.state.heart ? <FavoriteIcon /> : <FavoriteBorderIcon />;
  };

  renderMessage = () => {
    return this.state.heart ? 'Added to favorites' : 'Removed from favorites';
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <IconButton color="contrast" onClick={this.handleClick}>
          {this.toggleHeart()}
        </IconButton>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={this.state.open}
          autoHideDuration={3000}
          onRequestClose={this.handleRequestClose}
          SnackbarContentProps={{
            'aria-describedby': 'message-id'
          }}
          message={
            <span id="message-id">
              {this.renderMessage()}
            </span>
          }
        />
      </div>
    );
  }
}

SimpleSnackbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleSnackbar);
