import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Card, { CardHeader, CardActions, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 30
  },
  card: {
    width: '100%'
  },
  media: {
    height: 200
  }
});

class DashCards extends Component {
  renderCards() {
    const { classes } = this.props;
    return this.props.favorites.hotels.map(hotel => {
      return (
        <Grid item xs={12} sm={6} md={4} key={hotel.id}>
          <Card className={classes.card}>
            <CardHeader title={hotel.name} subheader={hotel.location.city} />
            <CardMedia
              className={classes.media}
              image={hotel.image_url}
              title={hotel.name}
            />

            <CardActions>
              <Button dense color="primary">
                Share
              </Button>
              <Button dense color="primary">
                Learn More
              </Button>
              <IconButton>
                <CloseIcon />
              </IconButton>
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

export default withStyles(styles, { withTheme: true })(DashCards);
