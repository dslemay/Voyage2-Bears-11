import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import { updateMessages } from '../../actions';
import Alert from './Alert';

const styles = theme => ({
  root: {
    width: '50%',
    margin: '0 auto',
    paddingTop: '10px',
    fontSize: '1.2rem'
  }
});

class AlertMessages extends Component {
  randomKey() {
    return Math.floor(Math.random() * 1000);
  }

  removeMessage(message) {
    const messages = this.props.messages;
    const index = messages.indexOf(message);
    this.props.updateMessages(index);
  }

  render() {
    const { classes } = this.props;
    const alerts = this.props.messages.map(message => (
      <Alert
        key={this.randomKey()}
        text={message.text}
        type={message.type}
        onClose={() => this.removeMessage(message)}
      />
    ));

    return <div className={classes.root}>{alerts}</div>;
  }
}

function mapStateToProps({ messages }) {
  return { messages };
}

AlertMessages.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(
  connect(mapStateToProps, { updateMessages })(AlertMessages)
);
