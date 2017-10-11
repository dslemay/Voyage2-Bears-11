import { FETCH_FLIGHTS } from './types';
import axios from 'axios';

// Action Creator
export function fetchFlightsSuccess(flights) {
  return { type: FETCH_FLIGHTS, flights }; // or flights: flights
}

// Thunk
export function fetchFlights() {
  const dest = 'SFO';
  const url =
    'https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyA5uBa7NKGCyrL3NxLuT3q23dZoMV-mLM8';
  const data = {
    request: {
      slice: [
        {
          origin: 'LAS',
          destination: dest,
          date: '2017-10-30'
        }
      ],
      passengers: {
        adultCount: 1,
        infantInLapCount: 0,
        infantInSeatCount: 0,
        childCount: 0,
        seniorCount: 0
      },
      solutions: 1,
      maxPrice: 'USD100.00',
      refundable: false
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
