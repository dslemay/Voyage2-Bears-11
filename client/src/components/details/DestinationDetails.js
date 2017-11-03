// LINK https://source.unsplash.com/9bdt03k4ujw

import React from 'react';
import DetailsTab from './DetailsTab';
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

  return (
    <div className={classes.root}>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image="https://source.unsplash.com/9bdt03k4ujw"
              title="Random Destination"
            />
            <CardContent>
              <Typography type="headline" component="h2">
                Destination name
              </Typography>
            </CardContent>
            <CardActions>
              <Button dense color="primary">
                Add to Favorites
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={9}>
          <Paper>
            <DetailsTab />
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            Lorem ipsum dolor sit amet, errem reprehendunt at nec, ex ius
            eleifend contentiones. Dolor meliore cu pri, ei atqui falli
            intellegat vix. Mea quot constituto definiebas ei, ex ius fugit
            honestatis, an vide justo laoreet his. Ipsum cetero complectitur duo
            cu, mel saperet necessitatibus ad. <br />
            <br />Volumus deleniti comprehensam vim ea. An mea deserunt
            adversarium, graece facete possim eum no. Dicant utamur maiestatis
            et nam. Per reque cotidieque ad, prima eruditi omittantur id mea. Ne
            sale harum his, id errem verear suavitate per, ex principes
            theophrastus nec. Ei nemore antiopam dissentias sea, ius scaevola
            percipit et, ei tale graece forensibus his.
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
