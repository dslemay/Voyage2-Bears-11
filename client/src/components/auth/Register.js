import React, { Component } from 'react';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      passwordConfirm: ''
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handleFieldChange(e) {
    console.log(e.target.id);
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
          console.log(data.errors);
          // TODO: Handle displaying the msg for each error
        }
        // Handle redirect upon successful user creation.
        // Data object also contains a message property.
        const path = data.redirect;
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
                onChange={this.handleNameChange}
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
                onChange={this.handleEmailChange}
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
                onChange={this.handlePasswordChange}
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

export default Register;
