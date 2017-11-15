import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 195,
    maxWidth: 300
  }
});

const originAirport = [
  '(ATL) Atlanta, GA',
  '(BOS) Boston, MA',
  '(BWI) Baltimore, MD',
  '(CLT) Charlotte, NC',
  '(DEN) Denver, CO',
  '(DFW) Dallas, TX',
  '(DTW) Detroit, MI',
  '(JFK) Queens, NY',
  '(LAX) Los Angeles, CA',
  '(MIA) Miami, FL',
  '(MSP) Minneapolis, MN',
  '(ORD) Chicago, IL',
  '(PDX) Portland, OR',
  '(PHL) Philadelphia, PA',
  '(SEA) Seattle, WA',
  '(SFO) San Francisco, CA',
  '(SLC) Salt Lake City, UT'
];

class AirportSelect extends React.Component {
  changeOrigin = event => {
    this.props.onOriginChange(event.target.value);
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="name-multiple">Departing from</InputLabel>
          <Select
            value={this.props.originName}
            onChange={this.changeOrigin}
            input={<Input id="name-multiple" />}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 224,
                  width: 200
                }
              }
            }}
          >
            {originAirport.map(name =>
              <MenuItem
                key={name}
                value={name}
                style={{
                  fontWeight:
                    this.props.originName.indexOf(name) !== -1 ? '500' : '400'
                }}
              >
                {name}
              </MenuItem>
            )}
          </Select>
        </FormControl>
      </div>
    );
  }
}

AirportSelect.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AirportSelect);
