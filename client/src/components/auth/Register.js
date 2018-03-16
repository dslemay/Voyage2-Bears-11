import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import TerrainIcon from 'material-ui-icons/Terrain';
import { fetchUser, updateMessages } from '../../actions';

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

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
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
      'password-confirm': this.state.passwordConfirm,
    };

    fetch('/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        if (data.errors) {
          const { errors } = data;
          errors.map(error => {
            const message = { type: 'error', text: error.msg };
            return this.props.updateMessages(null, message);
          });
        } else {
          this.props.updateMessages(null, {
            type: 'success',
            text: 'You have been successfully logged in',
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
    const fieldsInfo = [
      { id: 'name', type: 'text', label: 'Name' },
      { id: 'email', type: 'email', label: 'Email' },
      { id: 'password', type: 'password', label: 'Password' },
      { id: 'passwordConfirm', type: 'password', label: 'Confirm Password' },
    ];

    const formFields = fieldsInfo.map(field => (
      <div className="row" key={field.id}>
        <div className="input-field col s12">
          <label htmlFor="name">
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
              Register
            </button>
          </form>
          <p>
            Already registered? Login <Link to="/login">here</Link>
          </p>
        </div>
      </Paper>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.shape({
    paper: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
  }).isRequired,
  fetchUser: PropTypes.func.isRequired,
  updateMessages: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withStyles(styles)(
  connect(null, { fetchUser, updateMessages })(Register),
);
