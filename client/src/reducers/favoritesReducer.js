import { ADD_FAVORITE } from '../actions/types';

export default function(state = { hotels: [] }, action) {
  const arr = action.favArrName;
  const location = action.locationId;
  switch (action.type) {
    case ADD_FAVORITE:
      return Object.assign({}, state, {
        [arr]: [...state[arr], location]
      });
    default:
      return state;
  }
}
