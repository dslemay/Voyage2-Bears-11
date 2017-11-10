import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateFavorites } from '../actions';
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
    clicked: false
  };

  // Checks to make sure there was a change to props, only opens snackbar for
  // most recently clicked
  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps && this.state.clicked) {
      this.setState({ open: true, clicked: false });
    }
  }

  handleClick = () => {
    const { yelpCategory, yelpId } = this.props;
    this.props.updateFavorites(yelpCategory, yelpId);
    this.setState({ clicked: true });
  };

  handleRequestClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };

  // Somehow connect inFavorites to redux?
  renderHeart = () => {
    const inFavorites = this.props.favorites.hotels.some(
      hotel => hotel.id === this.props.yelpId
    );
    return inFavorites ? <FavoriteIcon /> : <FavoriteBorderIcon />;
  };

  renderMessage = () => {
    const inFavorites = this.props.favorites.hotels.some(
      hotel => hotel.id === this.props.yelpId
    );
    return inFavorites ? 'Added to favorites' : 'Removed from favorites';
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <IconButton color="contrast" onClick={this.handleClick}>
          {this.renderHeart()}
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
          message={<span id="message-id">{this.renderMessage()}</span>}
        />
      </div>
    );
  }
}

SimpleSnackbar.propTypes = {
  classes: PropTypes.object.isRequired,
  yelpCategory: PropTypes.string.isRequired,
  yelpId: PropTypes.string.isRequired
};

function mapStateToProps({ favorites }) {
  return { favorites };
}

export default connect(mapStateToProps, { updateFavorites })(
  withStyles(styles)(SimpleSnackbar)
);
