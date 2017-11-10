import { FETCH_FLIGHTS } from '../actions/types';

export default function flightsReducer(state = [], action) {
  switch (action.type) {
    case FETCH_FLIGHTS:
      return [...state, action.flights];
    default:
      return state;
  }
}
