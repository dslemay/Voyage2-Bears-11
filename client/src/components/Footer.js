import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 56,
    paddingBottom: 36,
    marginTop: theme.spacing.unit * 16,
    background: 'rgb(33, 33, 33)',
    color: 'rgba(255, 255, 255, 0.54)',
    textAlign: 'center'
  })
});

function Footer(props) {
  const { classes } = props;
  return (
    <div>
      <Paper className={classes.root} elevation={0}>
        <Typography
          type="headline"
          component="h5"
          color="inherit"
          gutterBottom={true}
        >
          Project created in the Chingu Voyage 2 cohort
        </Typography>
        <Typography
          type="subheading"
          component="p"
          color="inherit"
          gutterBottom={true}
        >
          &copy;2017 Adrian Bernardo, Alex Steele, and Daniel Lemay
        </Typography>
        <a
          href="https://github.com/chingu-coders/Voyage2-Bears-11"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="https://i.imgur.com/yfWEKaX.png" alt="" />
        </a>
      </Paper>
    </div>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Footer);
