import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { GridList, GridListTile, GridListTileBar } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import FavoriteBorderIcon from 'material-ui-icons/FavoriteBorder';
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
    width: '100%',
    height: 450
  }
});

class HotelsList extends Component {
  componentDidMount() {
    this.props.fetchHotels();
  }

  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.container}>
        <GridList cellHeight={220} className={classes.gridList}>
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
                  <IconButton>
                    <FavoriteBorderIcon color="rgba(255, 255, 255, 0.84)" />
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

HotelsList.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps({ hotels }) {
  return { hotels };
}

export default connect(mapStateToProps, { fetchHotels })(
  withStyles(styles)(HotelsList)
);
