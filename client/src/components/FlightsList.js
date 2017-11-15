import React from 'react';
import { connect } from 'react-redux';
import { fetchFlights } from '../actions/flightActions';
import { updateMessages } from '../actions';
import Button from 'material-ui/Button';
import MultipleSelect from './MultipleSelect';
import { DatePicker } from 'material-ui-pickers';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import FlightIcon from 'material-ui-icons/Flight';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    padding: 16
  },
  button: {
    margin: 12,
    width: 195
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
  state = {
    origin: '',
    selectedDate: new Date()
  };

  handleClick = () => {
    if (!this.state.origin) {
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
    const formattedDate = this.state.selectedDate.toISOString().split('T')[0];
    this.props.fetchFlights(originCode, destinationCode, formattedDate);
  };

  handleOriginChange = origin => {
    this.setState({ origin });
  };

  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };

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

        <DatePicker
          value={this.state.selectedDate}
          onChange={this.handleDateChange}
          minDate={new Date()}
          className={classes.button}
        />

        <Button
          raised
          color="primary"
          className={classes.container}
          onClick={this.handleClick}
        >
          Check Prices
        </Button>

        {this.props.flights.map(flight =>
          <div key={flight.data.flights.trips.requestId}>
            <br />
            <h5>Flights as low as:</h5>
            <h6>
              {flight.data.flights.trips.tripOption['0'].saleTotal.replace(
                'USD',
                '$$'
              )}
            </h6>
            <br />
            <Button
              className={classes.container}
              raised
              color="primary"
              href={`https://www.google.com/flights/#search;f=${originCode};t=${destinationCode};d=${this
                .state.selectedDate};tt=o`}
              target="_blank"
            >
              Book Flights Now
            </Button>
          </div>
        )}
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
