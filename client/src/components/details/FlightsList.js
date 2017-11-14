import React from 'react';
import { connect } from 'react-redux';

import { fetchFlights } from '../../actions/flightActions';
import { updateMessages } from '../../actions';
import Button from 'material-ui/Button';
import MultipleSelect from '../MultipleSelect';
import DatePickers from '../DatePickers';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center'
  },
  button: {
    marginTop: 20,
    marginBottom: 20
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
  var dateArr = date.split("-");
  dateArr = dateArr.map(Number);

  var today = new Date();
  if (dateArr[0] < today.getFullYear()) {
    return true;
  }
  else if (dateArr[1] < today.getMonth()+1) {
    return true;
  }
  else if (dateArr[2] < today.getDate()) {
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
      dateNotSelected: false,
    };
  }

  handleClick() {
    if (!this.state.origin) {
      this.setState({
        codeNotSelected: true,
      });
      return;
    }

    if (!this.state.date) {
      this.setState({
        dateNotSelected: true,
      });
      return;
    }

    const checked = checkDate(this.state.date);
    if (checked) {
      this.setState({
        dateNotSelected: true,
      });
      return;
    }

    var ticket = this.props.flights;
    // ticket.pop() is used to remove any flight prices currently on the tab if user wants to change date or originCode
    ticket.pop();
    const originCode = getOriginCode(this.state.origin);
    const destinationCode = this.props.destinationDetails.destination.IATA;
    this.props.fetchFlights(originCode, destinationCode, this.state.date);
  }

  handleOriginChange(origin) {
    this.setState({ origin });
    if (this.state.codeNotSelected === true) {
      this.setState({
        codeNotSelected: false,
      });
    }
  }

  handleDateChange(date) {
    this.setState({ date });
    if (this.state.dateNotSelected === true) {
      this.setState({
        dateNotSelected: false,
      });
    }
  }

  render() {
    const classes = this.props.classes;
    const originCode = getOriginCode(this.state.origin);
    const destinationCode = this.props.destinationDetails.destination.IATA;
    return (
      <section className={classes.container}>
        <div>
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

          <Button raised className={classes.button} onClick={this.handleClick}>
            Check Prices
          </Button>

          {this.props.flights.map(flight =>
            <div key={flight.data.flights.trips.requestId}>
              <h5>Flights as low as</h5>
              <p>
                {flight.data.flights.trips.tripOption['0'].saleTotal}
              </p>
              <Button
                raised
                href={`https://www.google.com/flights/#search;f=${originCode};t=${destinationCode};d=${this
                  .state.date};tt=o`}
                target="_blank"
              >
                Book Flights Now
              </Button>
            </div>
          )}
        </div>
      </section>
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
