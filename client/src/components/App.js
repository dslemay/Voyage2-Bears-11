import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './Header';
import Footer from './Footer';
import Landing from './Landing';
import Login from './auth/Login';
import Register from './auth/Register';
import HotelsList from './HotelsList';
import FlightsList from './FlightsList';
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
<<<<<<< HEAD
          <Route path="/hotels" component={HotelsList} />
          <Route path="/flights" component={FlightsList} />
||||||| merged common ancestors
          <Route path="/hotels" component={HotelsList} />
=======
          <Route path="/details" component={DestinationDetails} />
          <Footer />
>>>>>>> master
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, actions)(App);
