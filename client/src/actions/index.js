// Where we put our action creators
import axios from 'axios';
import { FETCH_HOTELS, FETCH_USER } from './types';

export const fetchHotels = () => async dispatch => {
  const res = await axios.get('/api/yelp');

  dispatch({ type: FETCH_HOTELS, payload: res.data });
};

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');

  dispatch({ type: FETCH_USER, payload: res.data });
};
