import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </div>
        );
      default:
        // Logout using anchor tag to force refresh which also will update auth state.
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
          <Link to="/" className="brand-logo">
            ChinguTravels
          </Link>
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
