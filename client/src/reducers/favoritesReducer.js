import {
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  FETCH_FAVORITES
} from '../actions/types';

export default function(
  state = { hotels: [], restaurants: [], entertainment: [] },
  action
) {
  const arr = action.favArrName;
  const i = action.index;
  switch (action.type) {
    case ADD_FAVORITE:
      return Object.assign({}, state, {
        [arr]: [...state[arr], action.location]
      });
    case REMOVE_FAVORITE:
      return Object.assign({}, state, {
        [arr]: [...state[arr].slice(0, i), ...state[arr].slice(i + 1)]
      });
    case FETCH_FAVORITES:
      return action.payload;
    default:
      return state;
  }
}
