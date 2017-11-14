import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Card, { CardHeader, CardActions, CardMedia } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import RemoveFavAlert from './RemoveFavAlert';
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
    height: 200
  },
  line: {
    marginBottom: 23
  },
  button: {
    marginTop: 40,
    marginLeft: '14%'
  }
});

class YelpCards extends Component {
  renderCards() {
    const { classes, favType } = this.props;
    const { isFetching } = this.props.favorites;
    const numFavorites = this.props.favorites[favType].length;

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

    return this.props.favorites[favType].map(favItem => {
      return (
        <Grid item xs={12} sm={6} md={4} key={favItem.coordinates.latitude}>
          <Card className={classes.card}>
            <RemoveFavAlert yelpId={favItem.id} category={favType} />
            <CardHeader
              title={favItem.name}
              subheader={favItem.location.city}
            />
            <CardMedia
              className={classes.media}
              image={favItem.image_url}
              title={favItem.name}
            />
            <CardActions>
              <img
                src="https://i.imgur.com/fIljKM6.png"
                alt=""
                height="50"
                width="50"
              />
              <Button dense color="primary" href={favItem.url} target="_blank">
                Yelp Info
              </Button>
            </CardActions>
          </Card>
        </Grid>
      );
    });
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

YelpCards.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  favType: PropTypes.string.isRequired
};

function mapStateToProps({ favorites }) {
  return { favorites };
}

export default connect(mapStateToProps)(
  withStyles(styles, { withTheme: true })(YelpCards)
);
