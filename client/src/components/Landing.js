import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import CardTravelIcon from 'material-ui-icons/CardTravel';
import FlightTakeoffIcon from 'material-ui-icons/FlightTakeoff';
import HotelIcon from 'material-ui-icons/Hotel';
import FavoriteBorderIcon from 'material-ui-icons/FavoriteBorder';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 30,
    marginRight: 100,
    marginLeft: 100
  },
  paper: {
    padding: 16,
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  media: {
    height: 400
  },
  paperIcons: {
    height: 70,
    width: 70,
    display: 'block',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginBottom: 15
  }
});

function Landing(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image="https://source.unsplash.com/IE_sifhay7o"
              title="Icy Mountain"
            />
            <CardContent>
              <Typography type="display2" component="h2">
                Welcome
              </Typography>
              <Typography component="p">
                Possibly add description here.
              </Typography>
            </CardContent>
            <CardActions>
              <Button raised color="primary">
                Generate Destinations
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>
            <CardTravelIcon className={classes.paperIcons} />
            Generate a random list of popular destinations in order to discover
            exciting and interesting places you may have otherwise never found.
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>
            <FlightTakeoffIcon className={classes.paperIcons} />
            Discover flights from your chosen airport to see availability and
            price information to a specific destination.
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>
            <HotelIcon className={classes.paperIcons} />
            Find popular, nearby hotels with their ratings, along with reviews
            from costumers and detailed information thanks to Yelp.
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>
            <FavoriteBorderIcon className={classes.paperIcons} />
            Make an account with us in order to keep track of the most tempting
            destinations you find and check them out later.
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

Landing.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Landing);
