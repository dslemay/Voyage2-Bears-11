// Where we put our action creators
import axios from 'axios';
import {
  FETCH_HOTELS,
  FETCH_USER,
  ADD_FAVORITE,
  REMOVE_FAVORITE
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
  const res = await axios.post(`/api/favorites/${favArrName}`, { locationId });
  const index = res.data.index;

  if (!index) {
    return dispatch({
      type: ADD_FAVORITE,
      favArrName,
      locationId,
      index: res.data.index
    });
  }

  dispatch({
    type: REMOVE_FAVORITE,
    favArrName,
    locationId,
    index: res.data.index
  });
};
