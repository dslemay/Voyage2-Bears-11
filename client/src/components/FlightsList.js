import React from 'react';
import { connect } from 'react-redux';

import { fetchFlights } from '../actions/flightActions';
import Button from 'material-ui/Button';
import MultipleSelect from './MultipleSelect';
import DatePickers from './DatePickers';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
  },
});

class FlightsList extends React.Component {
  componentWillMount() {
    // fetch flights
    this.props.fetchFlights('SFO', 'LAX', '2017-11-30');
  }

  // render flight and button to page
  render() {
    console.log(this.props.flights);
    const classes = this.props.classes;
    return (
      <div>
        <MultipleSelect />
        <DatePickers />
        {this.props.flights.map(flight => (
          <div key={flight.data.flights.trips.requestId} className={classes.container}>
            <h5>Flights as low as</h5>
            <p>{flight.data.flights.trips.tripOption['0'].saleTotal}</p>
            <Button
              raised
              href="https://www.google.com/flights/#search;f=LAS;t=SFO;d=2017-11-30"
              target="_blank"
            >
              Book Flights Now
            </Button>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    flights: state.flights
  };
};

FlightsList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { fetchFlights })(
  withStyles(styles)(FlightsList)
);
