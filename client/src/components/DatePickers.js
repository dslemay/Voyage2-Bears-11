import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
});

class DatePickers extends React.Component {
  constructor(props) {
    super(props);

    this.changeDate = this.changeDate.bind(this);
  }

  changeDate(event) {
    this.props.onDateChange(event.target.value);
  }

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} noValidate>
        <TextField
          id="date"
          type="date"
          error={this.props.selected}
          className={classes.textField}
          InputLabelProps={{
            shrink: true
          }}
          value={this.props.departureDate}
          onChange={this.changeDate}
        />
      </form>
    );
  }
}

DatePickers.propTypes = {
  classes: PropTypes.object.isRequired,
  departureDate: PropTypes.string.isRequired,
  onDateChange: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired
};

export default withStyles(styles)(DatePickers);
