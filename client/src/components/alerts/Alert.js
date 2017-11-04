import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Alert extends Component {
  componentDidMount() {
    this.timer = setTimeout(this.props.onClose, this.props.timeout);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    return (
      <div>
        {this.props.text}
        <button onClick={this.props.onClose}>&times;</button>
      </div>
    );
  }
}

Alert.defaultProps = {
  timeout: 3000
};

Alert.PropTypes = {
  type: PropTypes.string,
  message: PropTypes.object,
  text: PropTypes.string,
  onClose: PropTypes.func.isRequired
};

export default Alert;
