import { ADD_MESSAGE, REMOVE_MESSAGE } from '../actions/types';

export default function(state = [], action) {
  const i = action.index;
  switch (action.type) {
    case ADD_MESSAGE:
      return [...state, action.payload];
    case REMOVE_MESSAGE:
      return [...state.slice(0, i), ...state.slice(i + 1)];
    default:
      return state;
  }
}
