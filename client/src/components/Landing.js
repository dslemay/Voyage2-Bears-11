import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import paperInformation from './paperInformation';

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: 40,
    [theme.breakpoints.up('lg')]: {
      margin: '12%',
      marginTop: 30,
    },
    [theme.breakpoints.down('sm')]: {
      margin: 0,
    },
  },
  paper: {
    padding: 24,
    textAlign: 'left',
    color: theme.palette.text.secondary,
    height: '100%',
  },
  media: {
    height: 500,
  },
  paperIcons: {
    height: 70,
    width: 70,
    display: 'block',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginBottom: 15,
  },
  greeting: {
    position: 'relative',
    top: 440,
    left: 20,
    color: 'white',
  },
});

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = { link: '/' };
  }

  componentDidMount() {
    axios
      .get('/api/randomLocation')
      .then(res => this.setState({ link: `/details/${res.data}` }));
  }

  renderPapers() {
    const { classes } = this.props;
    return _.map(paperInformation, ({ description, Icon }) => (
      <Grid item xs={12} sm={6} md={3} key={description}>
        <Paper className={classes.paper}>
          <Icon className={classes.paperIcons} />
          {description}
        </Paper>
      </Grid>
    ));
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image="https://source.unsplash.com/R261qkc-nDE"
              >
                <Typography
                  className={classes.greeting}
                  variant="display2"
                  component="h2"
                >
                  Welcome
                </Typography>
              </CardMedia>
              <CardContent>
                <Typography component="p">
                  Discover new locations to visit. Click{' '}
                  <b>Generate Random Destination</b> below to start your
                  journey!
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  component={Link}
                  to={this.state.link}
                  variant="raised"
                  color="primary"
                >
                  Generate Random Destination
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
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
    paper: PropTypes.string.isRequired,
    media: PropTypes.string.isRequired,
    paperIcons: PropTypes.string.isRequired,
    greeting: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(styles)(Landing);
