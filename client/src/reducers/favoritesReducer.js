import { ADD_FAVORITE, REMOVE_FAVORITE } from '../actions/types';

export default function(state = { hotels: [] }, action) {
  const arr = action.favArrName;
  const location = action.locationId;
  const i = action.index;
  switch (action.type) {
    case ADD_FAVORITE:
      return Object.assign({}, state, {
        [arr]: [...state[arr], location]
      });
    case REMOVE_FAVORITE:
      return Object.assign({}, state, {
        [arr]: [...state[arr].slice(0, i), ...state[arr].slice(i + 1)]
      });
    default:
      return state;
  }
}
