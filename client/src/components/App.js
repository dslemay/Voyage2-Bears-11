import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './Header';
import Landing from './Landing';
import Login from './auth/Login';
import Register from './auth/Register';
import InfoList from './InfoList';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Route exact path="/" component={Landing} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/info" component={InfoList} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
