import React from 'react';
import DetailsTab from './DetailsTab';
import destinationInformation from '../destinationInformation';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 30,
    marginRight: 30,
    marginLeft: 30
  },
  paper: {
    padding: 16,
    paddingTop: 40,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '100%'
  },
  card: {
    width: '100%'
  },
  media: {
    height: 600
  }
});

function DestinationDetails(props) {
  const { classes } = props;
  const destination = destinationInformation[props.match.params.number];

  return (
    <div className={classes.root}>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image={destination.data.image}
              title={destination.name}
            />
            <CardContent>
              <Typography type="display2" component="h2">
                {destination.name}
              </Typography>
            </CardContent>
            <CardActions>
              <Button dense color="primary">
                Add to Favorites
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} md={9}>
          <Paper>
            <DetailsTab yelpName={destination.data.yelpName} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper className={classes.paper}>
            {destination.data.description}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

DestinationDetails.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DestinationDetails);
