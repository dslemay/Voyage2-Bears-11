import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      passwordConfirm: ''
    };

    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFieldChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    const formData = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      'password-confirm': this.state.passwordConfirm
    };

    fetch('/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        if (data.errors) {
          const errors = data.errors;
          errors.map(error => {
            const message = { type: 'error', text: error.msg };
            window.flash_messages.addMessage(message);
          });
        }
        // Handle redirect upon successful user creation.
        // Data object also contains a message property.
        const path = data.redirect;
        this.props.fetchUser();
        this.props.history.push(path);
      });
  }

  render() {
    return (
      <div className="container">
        <h2>Register</h2>
        <form className="col s12" onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="input-field col s12">
              <input
                id="name"
                type="text"
                className="validate"
                value={this.state.name}
                onChange={this.handleFieldChange}
              />
              <label htmlFor="name">Name</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <input
                id="email"
                type="email"
                className="validate"
                value={this.state.email}
                onChange={this.handleFieldChange}
              />
              <label htmlFor="email">Email</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <input
                id="password"
                type="password"
                className="validate"
                value={this.state.password}
                onChange={this.handleFieldChange}
              />
              <label htmlFor="password">Password</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <input
                id="passwordConfirm"
                type="password"
                className="validate"
                value={this.state.passwordConfirm}
                onChange={this.handleFieldChange}
              />
              <label htmlFor="password-confirm">Confirm Password</label>
            </div>
          </div>

          <button
            className="btn waves-effect waves-light"
            type="submit"
            name="action"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default connect(null, actions)(Register);
