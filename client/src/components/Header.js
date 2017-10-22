import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  renderLinks() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <div>
            <li>
              <a href="/login">Login</a>
            </li>
            <li>
              <a href="/register">Register</a>
            </li>
          </div>
        );
      default:
        return (
          <li>
            <a href="/api/logout">Logout</a>
          </li>
        );
    }
  }

  render() {
    return (
      <nav className="teal lighten-2">
        <div className="nav-wrapper">
          <a href="/" className="brand-logo">
            ChinguTravels
          </a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {this.renderLinks()}
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
