import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import Grid from 'material-ui/Grid';
import CircleLoader from '../CircleLoader';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 30
  },
  card: {
    width: '100%',
    '&:hover': {
      boxShadow: theme.shadows[8]
    }
  },
  media: {
    height: 350
  },
  line: {
    marginBottom: 23
  },
  button: {
    marginTop: 40,
    marginLeft: '14%'
  }
});

class DestinationCards extends Component {
  renderCards() {
    const { classes } = this.props;
    const { isFetching, destinations } = this.props.favorites;
    const numFavorites = this.props.favorites.destinations.length;
    console.log(numFavorites);

    if (isFetching) {
      return <CircleLoader />;
    }

    if (numFavorites === 0) {
      return (
        <div>
          <Typography type="subheading" className={classes.button}>
            You have no favorites in this category. Start exploring to find
            some!
          </Typography>
          <Button
            className={classes.button}
            component={Link}
            to="/details/melbourne"
            color="primary"
            raised
          >
            Explore
          </Button>
        </div>
      );
    }

    if (destinations) {
      return destinations.map(destination => {
        return (
          <Grid item xs={12} md={6} key={destination._id}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image={destination.image}
                title={destination.name}
              />
              <CardContent>
                <Typography type="headline" component="h2">
                  {destination.name}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  component={Link}
                  to={`details/${destination.slug}`}
                  dense
                  color="primary"
                >
                  More Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        );
      });
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Typography type="display2" gutterBottom>
          My Favorites
        </Typography>
        <Divider className={classes.line} />
        <Grid container spacing={24}>
          {this.renderCards()}
        </Grid>
      </div>
    );
  }
}

DestinationCards.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps({ favorites }) {
  return { favorites };
}

export default connect(mapStateToProps)(withStyles(styles)(DestinationCards));
