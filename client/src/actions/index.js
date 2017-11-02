// Where we put our action creators
import axios from 'axios';
import {
  FETCH_HOTELS,
  FETCH_USER,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  FETCH_FAVORITES
} from './types';

export const fetchHotels = () => async dispatch => {
  const res = await axios.get('/api/yelp');

  dispatch({ type: FETCH_HOTELS, payload: res.data });
};

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const updateFavorites = (favArrName, locationId) => async dispatch => {
  const res = await axios.post('/api/favorites', { favArrName, locationId });
  const index = res.data.index;

  if (!index) {
    const yelp = await axios.get(`/api/favorites?location=${locationId}`);
    return dispatch({
      type: ADD_FAVORITE,
      favArrName,
      location: yelp.data
    });
  }

  dispatch({
    type: REMOVE_FAVORITE,
    favArrName,
    index: res.data.index
  });
};

export const fetchFavorites = () => async dispatch => {
  const res = await axios.get('/api/favorites');

  if (!res.data.error) {
    dispatch({ type: FETCH_FAVORITES, payload: res.data });
  }
};
