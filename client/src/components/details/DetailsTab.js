import React from 'react';
import HotelsList from './HotelsList';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import { fetchDestinationCategory } from '../../actions';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';

function TabContainer(props) {
  return <div style={{ padding: 8 * 3 }}>{props.children}</div>;
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const styles = theme => ({
  root: {
    flexGrow: 1,

    backgroundColor: theme.palette.background.paper,
    width: '100%'
  }
});

class DetailsTab extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 0
    };
  }

  componentDidMount() {
    const { yelpLocation } = this.props;
    this.props.fetchDestinationCategory(yelpLocation, 'hotels');
    this.props.fetchDestinationCategory(yelpLocation, 'restaurants');
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange} centered>
            <Tab label="Hotels" />
            <Tab label="Restaurants" />
            <Tab label="Flights" />
          </Tabs>
        </AppBar>
        {value === 0 && (
          <TabContainer>
            <HotelsList yelpCategory="hotels" />
          </TabContainer>
        )}
        {value === 1 && (
          <TabContainer>
            <HotelsList yelpCategory="restaurants" />
          </TabContainer>
        )}
        {value === 2 && (
          <TabContainer>
            <h2>Flights Component</h2>
          </TabContainer>
        )}
      </div>
    );
  }
}

DetailsTab.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(null, { fetchDestinationCategory })(
  withStyles(styles)(DetailsTab)
);
