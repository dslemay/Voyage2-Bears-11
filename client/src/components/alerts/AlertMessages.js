import React, { Component } from 'react';
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

  addMessage(message) {
    const messages = this.state.messages;
    messages.push(message);
    this.setState({ messages: messages });
  }

  removeMessage(message) {
    const messages = this.state.messages;
    const index = this.state.messages.indexOf(message);
    messages.splice(index, 1);
    this.setState({ messages: messages });
  }

  render() {
    const alerts = this.state.messages.map(message => (
      <Alert
        key={this.randomKey()}
        text={message.text}
        type={message.type}
        message={message}
        onClose={() => this.removeMessage()}
      />
    ));

    return <div>{alerts}</div>;
  }
}

export default AlertMessages;
