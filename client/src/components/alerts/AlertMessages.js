import React, { Component } from 'react';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import * as actions from '../../actions';
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
  constructor(props) {
    super(props);
    this.state = { messages: [] };

    window.flash_messages = this;
  }

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

export default compose(
  withStyles(styles, { name: 'AlertMessages' }),
  connect(mapStateToProps, actions)
)(AlertMessages);
