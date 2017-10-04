// Where we put our action creators
import axios from 'axios';
import { FETCH_HOTELS } from './types';

export const fetchHotels = () => async dispatch => {
  const res = await axios.get('/api/yelp');

  dispatch({ type: FETCH_HOTELS, payload: res.data });
};
