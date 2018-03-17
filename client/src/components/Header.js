import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import TerrainIcon from 'material-ui-icons/Terrain';
import Button from 'material-ui/Button';

const styles = () => ({
  root: {
    width: '100%',
    height: 60,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  logo: {
    height: 30,
    width: 30,
  },
});

class Header extends Component {
  renderLinks() {
    switch (this.props.auth) {
      case null:
        return null;
      case false:
        return (
          <div>
            <Button component={Link} to="/login" color="inherit">
              Login
            </Button>
            <Button component={Link} to="/register" color="inherit">
              Register
            </Button>
          </div>
        );
      default:
        // Logout using anchor tag to force refresh which also will update auth state.
        return (
          <div>
            <Button component={Link} to="/dashboard" color="inherit">
              Favorites
            </Button>
            <Button color="inherit" href="/api/logout">
              Logout
            </Button>
          </div>
        );
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <TerrainIcon className={classes.logo} />
            <Typography
              type="title"
              color="inherit"
              className={classes.flex}
              component={Link}
              to="/"
            >
              Wanderful
            </Typography>
            {this.renderLinks()}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
    flex: PropTypes.string.isRequired,
    menuButton: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
  }).isRequired,
  auth: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
};

Header.defaultProps = {
  auth: false,
};

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(withStyles(styles)(Header));
