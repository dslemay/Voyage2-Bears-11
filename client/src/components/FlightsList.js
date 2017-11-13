import React from 'react';
import { connect } from 'react-redux';

import { fetchFlights } from '../actions/flightActions';
import { updateMessages } from '../actions';
import Button from 'material-ui/Button';
import MultipleSelect from './MultipleSelect';
import DatePickers from './DatePickers';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import FlightIcon from 'material-ui-icons/Flight';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center'
  },
  button: {
    marginTop: 20,
    marginBottom: 20,
    width: '40%',
    marginLeft: '30%'
  },
  flightIcon: {
    height: 70,
    width: 70,
    display: 'block',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginBottom: 15,
    marginTop: 15,
    color: 'gray'
  }
});

// this function takes the string from the origin selection and returns just the IATA code
function getOriginCode(origin) {
  // regex matches all contiguous capital letters that appear after '('
  const re = /[A-Z]+(?!\()/;
  const originCode = origin.match(re);
  return originCode;
}

class FlightsList extends React.Component {
  constructor(props) {
    super(props);

    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleOriginChange = this.handleOriginChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      origin: '',
      date: ''
    };
  }

  handleClick() {
    if (!this.state.date || !this.state.origin) {
      return this.props.updateMessages(null, {
        type: 'error',
        text: 'You must select an airport and date'
      });
    }

    var ticket = this.props.flights;
    // remove any flight prices on the tab
    ticket.pop();
    const originCode = getOriginCode(this.state.origin);
    const destinationCode = this.props.destinationDetails.destination.info.IATA;
    this.props.fetchFlights(originCode, destinationCode, this.state.date);
  }

  handleOriginChange(origin) {
    this.setState({ origin });
  }

  handleDateChange(date) {
    this.setState({ date });
  }

  render() {
    const classes = this.props.classes;
    const originCode = getOriginCode(this.state.origin);
    const destinationCode = this.props.destinationDetails.destination.info.IATA;
    return (
      <div className={classes.container}>
        <FlightIcon className={classes.flightIcon} />
        <p>Pick an airport and departure date.</p>
        <MultipleSelect
          onOriginChange={this.handleOriginChange}
          originName={this.state.origin}
        />

        <DatePickers
          departureDate={this.state.date}
          onDateChange={this.handleDateChange}
        />

        <Button
          raised
          color="primary"
          className={classes.button}
          onClick={this.handleClick}
        >
          Check Prices
        </Button>

        {this.props.flights.map(flight => (
          <div key={flight.data.flights.trips.requestId}>
            <h5>Flights as low as:</h5>
            <p>{flight.data.flights.trips.tripOption['0'].saleTotal}</p>
            <Button
              raised
              color="primary"
              href={`https://www.google.com/flights/#search;f=${originCode};t=${destinationCode};d=${this
                .state.date};tt=o`}
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

function mapStateToProps({ flights, destinationDetails }) {
  return { flights, destinationDetails };
}

FlightsList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps, { fetchFlights, updateMessages })(
  withStyles(styles)(FlightsList)
);
