import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import YelpCards from './YelpCards';
import DestinationCards from './DestinationCards';

function TabContainer(props) {
  return (
    <div style={{ padding: 12 }}>
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
    backgroundColor: '#E8EAF6',
    [theme.breakpoints.up('lg')]: {
      margin: '12%',
      marginTop: 30
    }
  },
  tabBar: {
    top: 64,
    boxShadow: theme.shadows[0],
    [theme.breakpoints.down('sm')]: {
      top: 56
    }
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
        <AppBar className={classes.tabBar} color="primary">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Destinations" />
            <Tab label="Hotels" />
            <Tab label="Restaurants" />
            <Tab label="Entertainment" />
          </Tabs>
        </AppBar>
        {value === 0 &&
          <TabContainer>
            <DestinationCards />
          </TabContainer>}
        {value === 1 &&
          <TabContainer>
            <YelpCards favType="hotels" />
          </TabContainer>}
        {value === 2 &&
          <TabContainer>
            <YelpCards favType="restaurants" />
          </TabContainer>}
        {value === 3 &&
          <TabContainer>
            <YelpCards favType="entertainment" />
          </TabContainer>}
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);
