import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Alert from './Alert';

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
    const alerts = this.props.messages.map(message => (
      <Alert
        key={this.randomKey()}
        text={message.text}
        type={message.type}
        onClose={() => this.removeMessage(message)}
      />
    ));

    return <div>{alerts}</div>;
  }
}

function mapStateToProps({ messages }) {
  return { messages };
}

export default connect(mapStateToProps, actions)(AlertMessages);
