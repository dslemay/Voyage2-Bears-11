import { FETCH_FLIGHTS, RECEIVE_FLIGHTS } from './types';
import axios from 'axios';

export const fetchFlights = (origin, destination, date) => async dispatch => {
  dispatch({ type: FETCH_FLIGHTS });

  const flights = await axios.post('/api/flights', {
    origin,
    destination,
    date
  });

  dispatch({ type: RECEIVE_FLIGHTS, payload: flights.data.flights });
};
