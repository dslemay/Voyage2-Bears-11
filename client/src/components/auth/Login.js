import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };

    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFieldChange(e) {
    this.setState({ [e.target.id]: e.target.value });
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
          this.props.fetchUser();
          this.props.fetchFavorites();
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
    const fieldsInfo = [
      { id: 'email', type: 'email', label: 'Email' },
      { id: 'password', type: 'password', label: 'Password' }
    ];

    const formFields = fieldsInfo.map(field => (
      <div className="row" key={field.id}>
        <div className="input-field col s12">
          <input
            id={field.id}
            type={field.type}
            className="validate"
            value={this.state[field.id]}
            onChange={this.handleFieldChange}
          />
          <label htmlFor="email">{field.label}</label>
        </div>
      </div>
    ));
    return (
      <div className="container">
        <h2>Login</h2>
        <form className="col s12" onSubmit={this.handleSubmit}>
          {formFields}
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

export default connect(null, actions)(Login);
