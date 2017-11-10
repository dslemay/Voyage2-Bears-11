import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { GridList, GridListTile, GridListTileBar } from 'material-ui/GridList';
import SimpleSnackbar from '../SimpleSnackbar';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    background: theme.palette.background.paper
  },
  gridList: {
    width: '100%',
    height: 450
  },
  gridImg: {
    cursor: 'pointer'
  }
});

class HotelsList extends Component {
  render() {
    const { classes, yelpCategory } = this.props;
    return (
      <div className={classes.container}>
        <GridList cellHeight={230} className={classes.gridList}>
          {this.props.destinationDetails[yelpCategory].map(POI => (
            <GridListTile key={POI.name}>
              <img
                src={POI.image_url}
                alt={POI.name}
                onClick={() => window.open(POI.url)}
                className={classes.gridImg}
              />
              <GridListTileBar
                title={POI.name}
                subtitle={
                  <span>
                    Rating: {POI.rating}
                    <br />
                    Price: {POI.price}
                  </span>
                }
                actionIcon={
                  this.props.auth ? (
                    <SimpleSnackbar
                      yelpCategory={yelpCategory}
                      yelpId={POI.id}
                    />
                  ) : (
                    ''
                  )
                }
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }
}

HotelsList.propTypes = {
  classes: PropTypes.object.isRequired,
  yelpCategory: PropTypes.string.isRequired
};

function mapStateToProps({ destinationDetails, auth }) {
  return { destinationDetails, auth };
}

export default connect(mapStateToProps)(withStyles(styles)(HotelsList));
