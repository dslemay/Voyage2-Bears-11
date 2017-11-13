import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { GridList, GridListTile, GridListTileBar } from 'material-ui/GridList';
import SimpleSnackbar from '../SimpleSnackbar';
import yelpStars from './yelpStars';

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
    height: 500
  },
  gridImg: {
    cursor: 'pointer'
  }
});

class DetailsList extends Component {
  render() {
    const { classes, yelpCategory } = this.props;
    return (
      <div className={classes.container}>
        <GridList cellHeight={230} className={classes.gridList}>
          {this.props.destinationDetails[yelpCategory].map(POI =>
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
                    <img src={yelpStars[POI.rating]} alt={POI.rating} />
                    <br />
                    Based on {POI.review_count} reviews
                  </span>
                }
                actionIcon={
                  this.props.auth
                    ? <SimpleSnackbar
                        yelpCategory={yelpCategory}
                        yelpId={POI.id}
                      />
                    : ''
                }
              />
            </GridListTile>
          )}
        </GridList>
      </div>
    );
  }
}

DetailsList.propTypes = {
  classes: PropTypes.object.isRequired,
  yelpCategory: PropTypes.string.isRequired
};

function mapStateToProps({ destinationDetails, auth }) {
  return { destinationDetails, auth };
}

export default connect(mapStateToProps)(withStyles(styles)(DetailsList));
