import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import TerrainIcon from 'material-ui-icons/Terrain';
import { fetchUser, fetchFavorites, updateMessages } from '../../actions';

const styles = () => ({
  paper: {
    marginTop: 30,
    paddingBottom: 30,
    width: 320,
    margin: '0 auto',
    textAlign: 'center',
  },
  icon: {
    color: 'gray',
    height: 80,
    width: 80,
  },
});

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
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
      password: this.state.password,
    };

    fetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(form),
    })
      .then(response => response.json())
      .then(data => {
        const path = data.redirect;
        /* Handle redirect based on url in response object which is handled on backend.
         * Redirect upon successful login
         * Upon unsuccessful login, the page will not change. Reset input fields.
         */
        this.props.updateMessages(null, data);
        if (path !== '/login') {
          // Login was successful
          this.props.fetchUser();
          this.props.fetchFavorites();
          this.props.history.push(path);
        } else {
          // Login was unsuccessful
          document.getElementById('email').value = '';
          document.getElementById('password').value = '';
          this.setState({ email: '', password: '' });
        }
      });
  }

  render() {
    const fieldsInfo = [
      { id: 'email', type: 'email', label: 'Email' },
      { id: 'password', type: 'password', label: 'Password' },
    ];

    const formFields = fieldsInfo.map(field => (
      <div className="row" key={field.id}>
        <div className="input-field col s12">
          <label htmlFor={field.id}>
            <input
              style={{ marginBottom: 0 }}
              id={field.id}
              type={field.type}
              className="validate"
              value={this.state[field.id]}
              onChange={this.handleFieldChange}
            />
            {field.label}
          </label>
        </div>
      </div>
    ));

    const { classes } = this.props;

    return (
      <Paper className={classes.paper}>
        <div className="container">
          <TerrainIcon className={classes.icon} />
          <form className="col s12" onSubmit={this.handleSubmit}>
            {formFields}
            <button
              style={{
                width: '100%',
                marginTop: 20,
                backgroundColor: '#3F51B5',
              }}
              className="btn"
              type="submit"
              name="action"
            >
              Login
            </button>
          </form>
          <p>
            Need an account? Register <Link to="/register">here</Link>
          </p>
        </div>
      </Paper>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.shape({
    paper: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
  }).isRequired,
  updateMessages: PropTypes.func.isRequired,
  fetchUser: PropTypes.func.isRequired,
  fetchFavorites: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withStyles(styles)(
  connect(null, { fetchUser, fetchFavorites, updateMessages })(Login),
);
