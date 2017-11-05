import { FETCH_FLIGHTS } from './types';
import axios from 'axios';

export const fetchFlights = (origin, destination, date) => async dispatch => {
  const flights = await axios.post('/api/flights', {
    origin,
    destination,
    date
  });

  dispatch({ type: FETCH_FLIGHTS, flights });
};
