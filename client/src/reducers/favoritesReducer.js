import {
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  FETCH_FAVORITES,
  RECEIVE_FAVORITES
} from '../actions/types';

const initialState = {
  isFetching: false,
  hotels: [],
  restaurants: [],
  entertainment: [],
  destinations: []
};

export default function(state = initialState, action) {
  const arr = action.favArrName;
  const i = action.index;
  switch (action.type) {
    case ADD_FAVORITE:
      return Object.assign({}, state, {
        [arr]: [action.location, ...state[arr]]
      });
    case REMOVE_FAVORITE:
      return Object.assign({}, state, {
        [arr]: [...state[arr].slice(0, i), ...state[arr].slice(i + 1)]
      });
    case FETCH_FAVORITES:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_FAVORITES:
      return Object.assign({}, state, {
        isFetching: false,
        ...action.payload
      });
    default:
      return state;
  }
}
