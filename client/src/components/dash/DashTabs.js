import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import YelpCards from './YelpCards';
import DestinationCards from './DestinationCards';

function TabContainer(props) {
  return (
    <div style={{ padding: 8 * 3 }}>
      {props.children}
    </div>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 20,
    backgroundColor: '#E8EAF6'
  }
});

class Dashboard extends Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs value={value} onChange={this.handleChange} centered>
            <Tab label="Destinations" />
            <Tab label="Hotels" />
            <Tab label="POI's" />
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer>Destinations</TabContainer>}
        {value === 1 &&
          <TabContainer>
            <YelpCards favType="hotels" />
          </TabContainer>}
        {value === 2 && <TabContainer>Item Three</TabContainer>}
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);
