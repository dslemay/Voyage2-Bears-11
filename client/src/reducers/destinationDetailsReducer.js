import {
  FETCH_DESTINATION,
  RECEIVE_DESTINATION,
  FETCH_DESTINATION_CATEGORY,
  RECEIVE_DESTINATION_CATEGORY,
  RESET_DESTINATION,
  FETCH_FLIGHTS,
  RECEIVE_FLIGHTS
} from '../actions/types';

const initialState = {
  destination: {
    isFetching: false,
    info: {}
  },
  hotels: {
    isFetching: false,
    locations: []
  },
  restaurants: {
    isFetching: false,
    locations: []
  },
  entertainment: {
    isFetching: false,
    locations: []
  },
  flights: {
    isFetching: false,
    info: []
  }
};

export default function(state = initialState, action) {
  const { category } = action;
  switch (action.type) {
    case FETCH_DESTINATION:
      return Object.assign({}, state, { destination: { isFetching: true } });
    case RECEIVE_DESTINATION:
      return Object.assign({}, state, {
        destination: { isFetching: false, info: action.payload }
      });
    case FETCH_DESTINATION_CATEGORY:
      return Object.assign({}, state, {
        [category]: { isFetching: true }
      });
    case RECEIVE_DESTINATION_CATEGORY:
      return Object.assign({}, state, {
        [category]: { isFetching: false, locations: action.payload }
      });
    case FETCH_FLIGHTS:
      return Object.assign({}, state, {
        flights: { isFetching: true }
      });
    case RECEIVE_FLIGHTS:
      return Object.assign({}, state, {
        flights: { isFetching: false, info: [action.payload] }
      });
    case RESET_DESTINATION:
      return Object.assign({}, initialState);
    default:
      return state;
  }
}
