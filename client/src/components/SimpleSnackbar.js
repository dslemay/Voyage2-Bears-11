import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import FavoriteBorderIcon from 'material-ui-icons/FavoriteBorder';
import FavoriteIcon from 'material-ui-icons/Favorite';
import { updateFavorites } from '../actions';

class SimpleSnackbar extends Component {
  state = {
    open: false,
    clicked: false,
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

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };

  renderHeart = () => {
    const { yelpCategory } = this.props;
    const categoryArr = this.props.auth.favorites[yelpCategory];
    const inFavorites = categoryArr.includes(this.props.yelpId);
    return inFavorites ? <FavoriteIcon /> : <FavoriteBorderIcon />;
  };

  renderMessage = () => {
    const { yelpCategory } = this.props;
    const categoryArr = this.props.auth.favorites[yelpCategory];
    const inFavorites = categoryArr.includes(this.props.yelpId);
    return inFavorites ? 'Added to favorites' : 'Removed from favorites';
  };

  render() {
    return (
      <div>
        <IconButton style={{ color: '#FF4136' }} onClick={this.handleClick}>
          {this.renderHeart()}
        </IconButton>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={this.state.open}
          autoHideDuration={3000}
          onClose={this.handleClose}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.renderMessage()}</span>}
        />
      </div>
    );
  }
}

SimpleSnackbar.propTypes = {
  auth: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  yelpCategory: PropTypes.string.isRequired,
  yelpId: PropTypes.string.isRequired,
  updateFavorites: PropTypes.func.isRequired,
};

SimpleSnackbar.defaultProps = {
  auth: false,
};

function mapStateToProps({ auth, favorites }) {
  return { auth, favorites };
}

export default connect(mapStateToProps, { updateFavorites })(SimpleSnackbar);
