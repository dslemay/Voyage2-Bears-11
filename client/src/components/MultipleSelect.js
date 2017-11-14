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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const originAirport = [
  '(SFO) San Francisco, CA',
  '(ATL) Atlanta, GA',
  '(LAX) Los Angeles, CA',
  '(ORD) Chicago, IL',
  '(DFW) Dallas, TX',
  '(JFK) Queens, NY',
  '(PDX) Portland, OR',
  '(DEN) Denver, CO',
  '(CLT) Charlotte, NC',
  '(SEA) Seattle, WA',
  '(MIA) Miami, FL',
  '(MSP) Minneapolis, MN',
  '(BOS) Boston, MA',
  '(DTW) Detroit, MI',
  '(PHL) Philadelphia, PA',
  '(BWI) Baltimore, MD',
  '(SLC) Salt Lake City, UT'
];

class MultipleSelect extends React.Component {
  constructor(props) {
    super(props);

    this.changeOrigin = this.changeOrigin.bind(this);
  }

  changeOrigin(event) {
    this.props.onOriginChange(event.target.value);
  }

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
            error={this.props.selected}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
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

MultipleSelect.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MultipleSelect);
