import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { GridList, GridListTile, GridListTileBar } from 'material-ui/GridList';
import { fetchHotels } from '../../actions';
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
  componentDidMount() {
    const { yelpName } = this.props;
    this.props.fetchHotels();
  }

  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.container}>
        <GridList cellHeight={230} className={classes.gridList}>
          {this.props.hotels.map(hotel =>
            <GridListTile key={hotel.name}>
              <img
                src={hotel.image_url}
                alt={hotel.name}
                onClick={() => window.open(hotel.url)}
                className={classes.gridImg}
              />
              <GridListTileBar
                title={hotel.name}
                subtitle={
                  <span>
                    Rating: {hotel.rating}
                    <br />
                    Price: {hotel.price}
                  </span>
                }
                actionIcon={<SimpleSnackbar />}
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
