import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    const form = {
      email: this.state.email,
      password: this.state.password
    };

    fetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(form)
    })
      .then(response => response.json())
      .then(data => {
        const path = data.redirect;
        /* Handle redirect based on url in response object which is handled on backend.
         * Redirect upon successful login
         * Upon unsuccessful login, the page will not change. Reset input fields.
         * TODO: Utilize message property of object to display message to user on success/failure
         */
        if (path !== '/login') {
          // Login was successful
          this.props.history.push(path);
        } else {
          //Login was unsuccessful
          document.getElementById('email').value = '';
          document.getElementById('password').value = '';
          this.setState({ email: '', password: '' });
        }
      });
  }

  render() {
    return (
      <div className="container">
        <h2>Login</h2>
        <form className="col s12" onSubmit={this.handleSubmit}>
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
          <button
            className="btn waves-effect waves-light"
            type="submit"
            name="action"
          >
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
