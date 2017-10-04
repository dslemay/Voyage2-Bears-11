import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchHotels } from '../actions';

class HotelsList extends Component {
  componentDidMount() {
    this.props.fetchHotels();
  }

  renderHotels() {
    return this.props.hotels.map(hotel => {
      return (
        <div key={hotel.id}>
          <h3>
            {hotel.name}
          </h3>
          <h3>
            {hotel.id}
          </h3>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <h1>Hotels List</h1>
        {this.renderHotels()}
      </div>
    );
  }
}

function mapStateToProps({ hotels }) {
  return { hotels };
}

export default connect(mapStateToProps, { fetchHotels })(HotelsList);
