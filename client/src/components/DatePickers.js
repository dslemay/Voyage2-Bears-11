import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

class DatePickers extends React.Component {
  state = {
    date: '',
  };

  changeDate = event => {
    this.setState({date: event.target.value});
  };

  render() {
    const { classes } = this.props;
    
    return (
      <form className={classes.container} noValidate>
        <TextField
          id="date"
          type="date"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          value={this.state.date}
          onChange={this.changeDate}
        />
      </form>
    );
  }
}

DatePickers.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DatePickers);