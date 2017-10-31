import { FETCH_FLIGHTS } from './types';
import axios from 'axios';

// Action Creator
export function fetchFlightsSuccess(flights) {
  return { type: FETCH_FLIGHTS, flights }; // or flights: flights
}

// Thunk
// post flight info to google api
export function fetchFlights() {
  const url =
    'https://www.googleapis.com/qpxExpress/v1/trips/search?key=';
  const data = {
    request: {
      slice: [
        {
          origin: 'LAS',
          destination: 'SFO',
          date: '2017-11-30'
        }
      ],
      passengers: {
        adultCount: 1
      },
      solutions: 1
    }
  };
  return function(dispatch) {
    return axios
      .post(url, data)
      .then(flights => {
        dispatch(fetchFlightsSuccess(flights));
      })
      .catch(error => {
        throw error;
      });
  };
}
