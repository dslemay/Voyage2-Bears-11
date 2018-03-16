import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  paper: {
    marginBottom: '0.75rem',
    padding: '0 0 0 1.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    margin: theme.spacing.unit,
    height: '50%',
    width: 'auto',
  },
});

class Alert extends Component {
  componentDidMount() {
    this.timer = setTimeout(this.props.onClose, this.props.timeout);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  alertClass() {
    const { type } = this.props;
    const classes = {
      error: '#ED4337',
      success: '#5cb85c',
    };
    return (
      { backgroundColor: classes[type] } || {
        backgroundColor: classes.success,
      }
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.paper} style={this.alertClass()}>
        {this.props.text}
        <IconButton className={classes.button} onClick={this.props.onClose}>
          <Icon>close</Icon>
        </IconButton>
      </Paper>
    );
  }
}

Alert.defaultProps = {
  timeout: 3000,
};

Alert.propTypes = {
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  timeout: PropTypes.number,
  onClose: PropTypes.func.isRequired,
  classes: PropTypes.shape({
    paper: PropTypes.string.isRequired,
    button: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(styles)(Alert);
