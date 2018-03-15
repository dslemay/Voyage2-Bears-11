import React from 'react';
import { CircularProgress } from 'material-ui/Progress';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
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
  var loader;
  if (props.large) {
    loader = <CircularProgress size={180} thickness={4} />;
  } else {
    loader = <CircularProgress size={70} />;
  }

  return <div className={classes.root}>{loader}</div>;
}

CircleLoader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CircleLoader);
