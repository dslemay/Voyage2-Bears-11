import React from 'react';
import { CircularProgress } from 'material-ui/Progress';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';

const styles = () => ({
  root: {
    width: '100%',
    padding: '30px 0',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

function CircleLoader(props) {
  const { classes } = props;
  let loader;
  if (props.large) {
    loader = <CircularProgress size={180} thickness={4} />;
  } else {
    loader = <CircularProgress size={70} />;
  }

  return <div className={classes.root}>{loader}</div>;
}

CircleLoader.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
  }).isRequired,
  large: PropTypes.bool,
};

CircleLoader.defaultProps = {
  large: false,
};

export default withStyles(styles)(CircleLoader);
