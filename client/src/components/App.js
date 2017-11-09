import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './Header';
import Footer from './Footer';
import Landing from './Landing';
import Login from './auth/Login';
import Register from './auth/Register';
import DestinationDetails from './details/DestinationDetails';
import AlertMessages from './alerts/AlertMessages';
import * as actions from '../actions';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
    this.props.fetchFavorites();
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <AlertMessages />
          <Route exact path="/" component={Landing} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/details" component={DestinationDetails} />
          <Route path="/details/:location" component={DestinationDetails} />
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, actions)(App);
