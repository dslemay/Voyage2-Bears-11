import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import DetailsList from './DetailsList';
import { fetchDestinationCategory } from '../../actions';

function TabContainer(props) {
  return <div style={{ padding: 0 }}>{props.children}</div>;
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,

    backgroundColor: theme.palette.background.paper,
    width: '100%',
  },
});

class DetailsTab extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 0,
    };
  }

  componentDidMount() {
    const { yelpLocation } = this.props;
    this.props.fetchDestinationCategory(yelpLocation, 'hotels');
    this.props.fetchDestinationCategory(yelpLocation, 'restaurants');
    this.props.fetchDestinationCategory(yelpLocation, 'entertainment');
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
            <Tab label="Entertainment" />
          </Tabs>
        </AppBar>
        {value === 0 && (
          <TabContainer>
            <DetailsList yelpCategory="hotels" />
          </TabContainer>
        )}
        {value === 1 && (
          <TabContainer>
            <DetailsList yelpCategory="restaurants" />
          </TabContainer>
        )}
        {value === 2 && (
          <TabContainer>
            <DetailsList yelpCategory="entertainment" />
          </TabContainer>
        )}
      </div>
    );
  }
}

DetailsTab.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
  }).isRequired,
  yelpLocation: PropTypes.string.isRequired,
  fetchDestinationCategory: PropTypes.func.isRequired,
};

export default connect(null, { fetchDestinationCategory })(
  withStyles(styles)(DetailsTab),
);
