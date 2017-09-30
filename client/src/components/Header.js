import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <nav className="teal lighten-2">
        <div className="nav-wrapper">
          <a href="/" className="brand-logo">
            ChinguTravels
          </a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <a href="/login">Login</a>
            </li>
            <li>
              <a href="/register">Register</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
