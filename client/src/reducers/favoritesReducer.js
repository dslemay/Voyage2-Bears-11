import {
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  FETCH_FAVORITES,
  RECEIVE_FAVORITES,
  FETCH_FAVORITES_ERROR,
} from '../actions/types';

const initialState = {
  isFetching: false,
  hotels: [],
  restaurants: [],
  entertainment: [],
  destinations: [],
};

export default function(state = initialState, action) {
  const arr = action.favArrName;
  const i = action.index;
  switch (action.type) {
    case ADD_FAVORITE:
      return {
        ...state,
        [arr]: [action.location, ...state[arr]],
      };
    case REMOVE_FAVORITE:
      return {
        ...state,
        [arr]: [...state[arr].slice(0, i), ...state[arr].slice(i + 1)],
      };
    case FETCH_FAVORITES:
      return {
        ...state,
        isFetching: true,
      };
    case RECEIVE_FAVORITES:
      return {
        ...state,
        isFetching: false,
        ...action.payload,
      };
    case FETCH_FAVORITES_ERROR:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
}
