// Where we put our action creators
import axios from 'axios';
import {
  FETCH_DESTINATION,
  FETCH_HOTELS,
  FETCH_USER,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  FETCH_FAVORITES,
  ADD_MESSAGE,
  REMOVE_MESSAGE
} from './types';

export const fetchDestination = slug => async dispatch => {
  const res = await axios.get(`/api/locationDetails?location=${slug}`);

  dispatch({ type: FETCH_DESTINATION, payload: res.data });
};

export const fetchHotels = location => async dispatch => {
  const res = await axios.get(`/api/yelp?location=${location}`);

  dispatch({ type: FETCH_HOTELS, payload: res.data });
};

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const updateFavorites = (favArrName, locationId) => async dispatch => {
  const res = await axios.post('/api/favorites', { favArrName, locationId });
  const inFavorites = res.data.index + 1;

  if (!inFavorites) {
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

export const updateMessages = (index, message) => async dispatch => {
  if (index !== null) {
    return dispatch({ type: REMOVE_MESSAGE, index });
  }
  return dispatch({ type: ADD_MESSAGE, payload: message });
};
