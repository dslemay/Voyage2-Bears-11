import React from 'react';
import { connect } from 'react-redux';
import { fetchFlights } from '../../actions/flightActions';
import Button from 'material-ui/Button';
import MultipleSelect from './MultipleSelect';
import DatePickers from './DatePickers';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import FlightIcon from 'material-ui-icons/Flight';
import CircleLoader from '../CircleLoader';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    padding: 16
  },
  button: {
    marginTop: 20,
    marginBottom: 20,
    width: '50%',
    marginLeft: '25%'
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

function checkDate(date) {
  var dateArr = date.split('-');
  dateArr = dateArr.map(Number);

  var today = new Date();
  if (dateArr[0] < today.getFullYear()) {
    return true;
  } else if (
    dateArr[1] < today.getMonth() + 1 &&
    dateArr[0] === today.getFullYear()
  ) {
    return true;
  } else if (
    dateArr[2] < today.getDate() &&
    dateArr[1] === today.getMonth() + 1 &&
    dateArr[0] === today.getFullYear()
  ) {
    return true;
  }
  return false;
}

class FlightsList extends React.Component {
  constructor(props) {
    super(props);

    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleOriginChange = this.handleOriginChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      origin: '',
      date: '',
      codeNotSelected: false,
      dateNotSelected: false
    };
  }

  handleClick() {
    if (!this.state.origin) {
      this.setState({
        codeNotSelected: true
      });
      return;
    }

    if (!this.state.date) {
      this.setState({
        dateNotSelected: true
      });
      return;
    }

    const checked = checkDate(this.state.date);
    if (checked) {
      this.setState({
        dateNotSelected: true
      });
      return;
    }

    const originCode = getOriginCode(this.state.origin);
    const destinationCode = this.props.destinationDetails.destination.info.IATA;
    this.props.fetchFlights(originCode, destinationCode, this.state.date);
  }

  handleOriginChange(origin) {
    this.setState({ origin });
    if (this.state.codeNotSelected === true) {
      this.setState({
        codeNotSelected: false
      });
    }
  }

  handleDateChange(date) {
    this.setState({ date });
    if (this.state.dateNotSelected === true) {
      this.setState({
        dateNotSelected: false
      });
    }
  }

  renderFlightCost() {
    const { isFetching, info } = this.props.destinationDetails.flights;
    const originCode = getOriginCode(this.state.origin);
    const destinationCode = this.props.destinationDetails.destination.info.IATA;

    if (isFetching) {
      return <CircleLoader />;
    }

    if (!isFetching && Object.keys(info).length) {
      return info.map(flight => (
        <div key={flight.trips.requestId}>
          <h5>Flights as low as:</h5>
          <h6>{flight.trips.tripOption['0'].saleTotal.replace('USD', '$$')}</h6>
          <br />
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
      ));
    }
  }

  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.container}>
        <FlightIcon className={classes.flightIcon} />
        <p>Pick an airport and departure date.</p>
        <MultipleSelect
          onOriginChange={this.handleOriginChange}
          originName={this.state.origin}
          selected={this.state.codeNotSelected}
        />

        <DatePickers
          departureDate={this.state.date}
          onDateChange={this.handleDateChange}
          selected={this.state.dateNotSelected}
        />

        <Button
          raised
          color="primary"
          className={classes.button}
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
  classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps, {
  fetchFlights
})(withStyles(styles)(FlightsList));
