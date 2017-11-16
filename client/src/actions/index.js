// Where we put our action creators
import axios from 'axios';
import {
  FETCH_DESTINATION,
  RECEIVE_DESTINATION,
  FETCH_DESTINATION_CATEGORY,
  RECEIVE_DESTINATION_CATEGORY,
  RESET_DESTINATION,
  FETCH_USER,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  FETCH_FAVORITES,
  FETCH_FAVORITES_ERROR,
  RECEIVE_FAVORITES,
  ADD_MESSAGE,
  REMOVE_MESSAGE
} from './types';

export const fetchDestination = slug => async dispatch => {
  dispatch({ type: FETCH_DESTINATION });

  const res = await axios.get(`/api/locationDetails?location=${slug}`);
  dispatch({ type: RECEIVE_DESTINATION, payload: res.data });
};

export const fetchDestinationCategory = (
  location,
  category
) => async dispatch => {
  dispatch({ type: FETCH_DESTINATION_CATEGORY, category });

  const res = await axios.get(
    `/api/yelp?location=${location}&category=${category}`
  );

  dispatch({ type: RECEIVE_DESTINATION_CATEGORY, category, payload: res.data });
};

export const resetDestination = () => dispatch => {
  dispatch({ type: RESET_DESTINATION });
};

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const updateFavorites = (favArrName, locationId) => async dispatch => {
  const res = await axios.post('/api/favorites', { favArrName, locationId });
  const index = res.data.index;
  dispatch({ type: FETCH_USER, payload: res.data.user });

  if (index === undefined && favArrName !== 'destinations') {
    const yelp = await axios.get(`/api/favorites?location=${locationId}`);
    return dispatch({
      type: ADD_FAVORITE,
      favArrName,
      location: yelp.data
    });
  }

  if (index === undefined && favArrName === 'destinations') {
    const res = await axios.get(
      `/api/destinationDetails?destination=${locationId}`
    );
    const destination = res.data.destination;
    return dispatch({
      type: ADD_FAVORITE,
      favArrName,
      location: destination
    });
  }

  dispatch({
    type: REMOVE_FAVORITE,
    favArrName,
    index: res.data.index
  });
};

export const fetchFavorites = () => async dispatch => {
  dispatch({ type: FETCH_FAVORITES });

  const res = await axios.get('/api/favorites');

  if (!res.data.error) {
    dispatch({ type: RECEIVE_FAVORITES, payload: res.data });
  }

  dispatch({ type: FETCH_FAVORITES_ERROR });
};

export const updateMessages = (index, message) => async dispatch => {
  if (index !== null) {
    return dispatch({ type: REMOVE_MESSAGE, index });
  }
  return dispatch({ type: ADD_MESSAGE, payload: message });
};
