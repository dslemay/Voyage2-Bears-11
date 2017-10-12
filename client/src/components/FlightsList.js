import React from 'react';
import { connect } from 'react-redux';
import { fetchFlights } from '../actions/flightActions';

class FlightsList extends React.Component {
  componentDidMount() {
    this.props.fetchFlights();
  }
  render() {
    console.log(this.props.flights)
    return (
    <div>
      <p>Flights</p>
      {this.props.flights.map(flight => (
        <p>{flight.data.trips.tripOption["0"].saleTotal}</p>
      ))}
      
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    flights: state.flights
  }
}

export default connect(mapStateToProps, { fetchFlights })(FlightsList);
