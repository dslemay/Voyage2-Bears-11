import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import DetailsTab from './DetailsTab';
import FlightsList from '../FlightsList';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import ShuffleIcon from 'material-ui-icons/Shuffle';
import * as actions from '../../actions';

const breakpoint = {
  small: '@media (max-width: 500px)'
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 30,
    marginRight: 30,
    marginLeft: 30,

    [breakpoint.small]: {
      margin: 0
    }
  },
  paper: {
    padding: 34,
    marginBottom: 30,
    textAlign: 'left',
    color: theme.palette.text.secondary
  },
  card: {
    width: '100%',
    marginBottom: 30
  },
  media: {
    height: 500
  },
  shuffleBtn: {
    float: 'right',
    top: 40,
    right: 40
  }
});

class DestinationDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { link: '/' };
  }

  componentDidMount() {
    const destination = this.props.match.params.location;
    this.props.fetchDestination(destination);

    axios
      .get('/api/randomLocation')
      .then(res => this.setState({ link: `/details/${res.data}` }));
  }

  componentWillUnmount() {
    this.props.fetchDestination(null);
  }

  renderContent() {
    const { classes } = this.props;
    const { destination } = this.props.destinationDetails;
    switch (this.props.destinationDetails.destination) {
      case null:
        return;
      default:
        return (
          <Grid container justify="center" spacing={24}>
            <Grid item xs={12}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.media}
                  image={destination.image}
                  title={destination.name}
                />
                <CardContent>
                  <Typography type="display2" component="h2">
                    {destination.name}
                  </Typography>
                  <Button
                    fab
                    color="primary"
                    className={classes.shuffleBtn}
                    href={this.state.link}
                  >
                    <ShuffleIcon />
                  </Button>
                </CardContent>
                <CardActions>
                  {this.renderFavButton()}
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} md={8}>
              <Paper className={classes.paper}>
                {destination.description}
              </Paper>
            </Grid>
            <Grid item xs={12} md={8}>
              <Paper>
                <DetailsTab yelpLocation={destination.yelpName} />
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper>
                <FlightsList />
              </Paper>
            </Grid>
          </Grid>
        );
    }
  }

  renderFavButton = () => {
    const { auth } = this.props;
    const id = this.props.destinationDetails.destination._id;

    // Render button if user is logged in
    if (auth) {
      return (
        <Button
          dense
          color="primary"
          onClick={() => this.props.updateFavorites('destinations', id)}
        >
          {this.renderFavMessage()}
        </Button>
      );
    }

    return;
  };

  renderFavMessage = () => {
    const id = this.props.destinationDetails.destination._id;
    const destinations = this.props.auth.favorites.destinations;
    const inFavorites = destinations.indexOf(id);
    return inFavorites > -1 ? 'Remove from Favorites' : 'Add to Favorites';
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        {this.renderContent()}
      </div>
    );
  }
}

DestinationDetails.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps({ auth, destinationDetails }) {
  return { auth, destinationDetails };
}

export default connect(mapStateToProps, actions)(
  withStyles(styles)(DestinationDetails)
);
