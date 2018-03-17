import {
  FETCH_DESTINATION,
  RECEIVE_DESTINATION,
  FETCH_DESTINATION_CATEGORY,
  RECEIVE_DESTINATION_CATEGORY,
  RESET_DESTINATION,
  FETCH_FLIGHTS,
  RECEIVE_FLIGHTS,
} from '../actions/types';

const initialState = {
  destination: {
    isFetching: false,
    info: {},
  },
  hotels: {
    isFetching: false,
    locations: [],
  },
  restaurants: {
    isFetching: false,
    locations: [],
  },
  entertainment: {
    isFetching: false,
    locations: [],
  },
  flights: {
    isFetching: false,
    info: [],
  },
};

export default function(state = initialState, action) {
  const { category } = action;
  switch (action.type) {
    case FETCH_DESTINATION:
      return { ...state, destination: { isFetching: true } };
    case RECEIVE_DESTINATION:
      return {
        ...state,
        destination: { isFetching: false, info: action.payload },
      };
    case FETCH_DESTINATION_CATEGORY:
      return {
        ...state,
        [category]: { isFetching: true },
      };
    case RECEIVE_DESTINATION_CATEGORY:
      return {
        ...state,
        [category]: { isFetching: false, locations: action.payload },
      };
    case FETCH_FLIGHTS:
      return {
        ...state,
        flights: { isFetching: true },
      };
    case RECEIVE_FLIGHTS:
      return {
        ...state,
        flights: { isFetching: false, info: [action.payload] },
      };
    case RESET_DESTINATION:
      return { ...initialState };
    default:
      return state;
  }
}
