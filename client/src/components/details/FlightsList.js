import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import { DatePicker } from 'material-ui-pickers';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import FlightIcon from 'material-ui-icons/Flight';
import CircleLoader from '../CircleLoader';
import { fetchFlights } from '../../actions';
import AirportSelect from './AirportSelect';

const styles = () => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    padding: 16,
  },
  button: {
    margin: 12,
    width: 195,
  },
  flightIcon: {
    height: 70,
    width: 70,
    display: 'block',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginBottom: 15,
    marginTop: 15,
    color: 'gray',
  },
});

// this function takes the string from the origin selection and returns just the IATA code
function getOriginCode(origin) {
  // regex matches all contiguous capital letters that appear after '('
  const re = /[A-Z]+(?!\()/;
  const originCode = origin.match(re);
  return originCode;
}

class FlightsList extends Component {
  state = {
    origin: '',
    selectedDate: new Date(),
    codeNotSelected: false,
  };

  handleClick = () => {
    if (!this.state.origin) {
      this.setState({
        codeNotSelected: true,
      });
      return;
    }

    const originCode = getOriginCode(this.state.origin);
    const destinationCode = this.props.destinationDetails.destination.info.IATA;
    const formattedDate = this.state.selectedDate.toISOString().split('T')[0];
    this.props.fetchFlights(originCode, destinationCode, formattedDate);
  };

  handleOriginChange = origin => {
    this.setState({ origin });
    if (this.state.codeNotSelected === true) {
      this.setState({
        codeNotSelected: false,
      });
    }
  };

  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };

  renderFlightCost() {
    const { isFetching, info } = this.props.destinationDetails.flights;
    const originCode = getOriginCode(this.state.origin);
    const destinationCode = this.props.destinationDetails.destination.info.IATA;

    if (isFetching) {
      return <CircleLoader />;
    }

    if (!isFetching && Object.keys(info).length) {
      const formattedDate = moment(this.state.selectedDate).format(
        'YYYY-MM-DD',
      );
      return info.map(flight => (
        <div key={flight.trips.requestId}>
          <h5>Flights as low as:</h5>
          <h6>{flight.trips.tripOption['0'].saleTotal.replace('USD', '$$')}</h6>
          <br />
          <Button
            raised
            color="primary"
            href={`https://www.google.com/flights/#search;f=${originCode};t=${destinationCode};d=${formattedDate};tt=o`}
            target="_blank"
          >
            Book Flights Now
          </Button>
        </div>
      ));
    }
    return null;
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <FlightIcon className={classes.flightIcon} />
        <p>Pick an airport and departure date.</p>
        <AirportSelect
          onOriginChange={this.handleOriginChange}
          originName={this.state.origin}
          selected={this.state.codeNotSelected}
        />

        <DatePicker
          value={this.state.selectedDate}
          onChange={this.handleDateChange}
          minDate={moment().format('YYYY-MM-DD')}
          className={classes.button}
        />

        <Button
          variant="raised"
          color="primary"
          className={classes.container}
          onClick={this.handleClick}
        >
          Check Prices
        </Button>
        {this.renderFlightCost()}
      </div>
    );
  }
}

function mapStateToProps({ destinationDetails }) {
  return { destinationDetails };
}

FlightsList.propTypes = {
  classes: PropTypes.shape({
    button: PropTypes.string,
    container: PropTypes.string,
    flightIcon: PropTypes.string,
  }).isRequired,
  destinationDetails: PropTypes.shape({
    destination: PropTypes.shape({
      info: PropTypes.shape({
        IATA: PropTypes.string,
      }),
      isFetching: PropTypes.bool,
    }),
    flights: PropTypes.shape({
      info: PropTypes.array.isRequired,
      isFetching: PropTypes.bool.isRequired,
    }),
  }).isRequired,
  fetchFlights: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  fetchFlights,
})(withStyles(styles)(FlightsList));
