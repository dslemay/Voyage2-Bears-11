import { FETCH_HOTELS } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_HOTELS:
      return action.payload;
    default:
      return state;
  }
}
