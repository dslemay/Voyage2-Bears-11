import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import paperInformation from './paperInformation';
import destinationInformation from './destinationInformation';
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
    textAlign: 'left',
    color: theme.palette.text.secondary,
    height: '100%'
  },
  media: {
    height: 500
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

class Landing extends Component {
  renderPapers() {
    const classes = this.props.classes;
    return _.map(paperInformation, ({ description, Icon }) => {
      return (
        <Grid item xs={12} sm={6} md={3} key={Icon}>
          <Paper className={classes.paper}>
            <Icon className={classes.paperIcons} />
            {description}
          </Paper>
        </Grid>
      );
    });
  }

  generateRandomLink() {
    const randomNumber = Math.floor(
      Math.random() * destinationInformation.length
    );
    return `/details/${randomNumber}`;
  }

  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image="https://source.unsplash.com/R261qkc-nDE"
                title="Welcome to ChinguTravels"
              />
              <CardContent>
                <Typography type="display2" component="h2">
                  Welcome
                </Typography>
                <Typography component="p">
                  Discover new locations to visit. Click{' '}
                  <b>Generate Random Destination</b> below to start your
                  journey!
                </Typography>
              </CardContent>
              <CardActions>
                <Button raised color="default">
                  <Link to={this.generateRandomLink()}>
                    Generate Random Destination
                  </Link>
                </Button>
              </CardActions>
            </Card>
          </Grid>
          {this.renderPapers()}
        </Grid>
      </div>
    );
  }
}

Landing.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Landing);
