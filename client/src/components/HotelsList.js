import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { GridList, GridListTile, GridListTileBar } from 'material-ui/GridList';
import Subheader from 'material-ui/List/ListSubheader';
import IconButton from 'material-ui/IconButton';
import InfoIcon from 'material-ui-icons/Info';
import { fetchHotels } from '../actions';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    background: theme.palette.background.paper
  },
  gridList: {
    width: 500,
    height: 450
  }
});

class FlightsList extends Component {
  componentDidMount() {
    this.props.fetchHotels();
  }

  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.container}>
        <GridList cellHeight={180} className={classes.gridList}>
          <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
            <Subheader>Hotels</Subheader>
          </GridListTile>
          {this.props.hotels.map(hotel =>
            <GridListTile key={hotel.name}>
              <img src={hotel.image_url} alt={hotel.name} />
              <GridListTileBar
                title={hotel.name}
                subtitle={
                  <span>
                    Rating: {hotel.rating}
                  </span>
                }
                actionIcon={
                  <IconButton href={hotel.url} target="_blank">
                    <InfoIcon color="rgba(255, 255, 255, 0.54)" />
                  </IconButton>
                }
              />
            </GridListTile>
          )}
        </GridList>
      </div>
    );
  }
}

FlightsList.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps({ hotels }) {
  return { hotels };
}

export default connect(mapStateToProps, { fetchHotels })(
  withStyles(styles)(FlightsList)
);
