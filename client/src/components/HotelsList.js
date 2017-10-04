import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchHotels } from '../actions';

class HotelsList extends Component {
  componentDidMount() {
    this.props.fetchHotels();
  }

  render() {
    return (
      <div>
        <h1>Hotels List</h1>
        <h3>
          {this.props.hotels.name}
        </h3>
      </div>
    );
  }
}

function mapStateToProps({ hotels }) {
  return { hotels };
}

export default connect(mapStateToProps, { fetchHotels })(HotelsList);
