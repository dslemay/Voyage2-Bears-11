import React from 'react';
import { connect } from 'react-redux';

import { fetchFlights } from '../actions/flightActions';
import Button from 'material-ui/Button';

class FlightsList extends React.Component {
  componentWillMount() {
    // fetch flights
    this.props.fetchFlights();
  }

  // render flight and button to page
  render() {
    console.log(this.props.flights)
    return (
    <div>
      {this.props.flights.map(flight => (
          <div>
            <p>Flights as low as {flight.data.trips.tripOption["0"].saleTotal}</p>
            <Button href="https://www.google.com/flights/#search;f=LAS;t=SFO;d=2017-10-30">Book Flights Now</Button>
          </div>
        )
      )}
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
