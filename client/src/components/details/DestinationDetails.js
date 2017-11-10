import React, { Component } from 'react';
import { connect } from 'react-redux';
import DetailsTab from './DetailsTab';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import * as actions from '../../actions';

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

class DestinationDetails extends Component {
  componentDidMount() {
    const destination = this.props.match.params.location;
    this.props.fetchDestination(destination);
  }

  renderContent() {
    const { classes, destination } = this.props;
    switch (this.props.destination) {
      case null:
        return;
      default:
        return (
          <Grid container spacing={24}>
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
                <DetailsTab yelpName={destination.yelpName} />
              </Paper>
            </Grid>
            <Grid item xs={12} md={3}>
              <Paper className={classes.paper}>{destination.description}</Paper>
            </Grid>
          </Grid>
        );
    }
  }

  render() {
    const { classes } = this.props;
    return <div className={classes.root}>{this.renderContent()}</div>;
  }
}

DestinationDetails.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps({ destination }) {
  return { destination };
}

export default connect(mapStateToProps, actions)(
  withStyles(styles)(DestinationDetails)
);