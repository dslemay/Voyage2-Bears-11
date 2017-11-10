import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Card, { CardHeader, CardActions, CardMedia } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import RemoveFavAlert from './RemoveFavAlert';

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
  }
});

class DashCards extends Component {
  renderCards() {
    const { classes } = this.props;
    return this.props.favorites.hotels.map(hotel => {
      return (
        <Grid item xs={12} sm={6} md={4} key={hotel.coordinates.latitude}>
          <Card className={classes.card}>
            <RemoveFavAlert yelpId={hotel.id} />
            <CardHeader title={hotel.name} subheader={hotel.location.city} />
            <CardMedia
              className={classes.media}
              image={hotel.image_url}
              title={hotel.name}
            />
            <CardActions>
              <Button dense color="primary">
                Destination Page
              </Button>
              <Button dense color="primary" href={hotel.url} target="_blank">
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

DashCards.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

function mapStateToProps({ favorites }) {
  return { favorites };
}

export default connect(mapStateToProps)(
  withStyles(styles, { withTheme: true })(DashCards)
);
