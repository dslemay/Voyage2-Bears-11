import { FETCH_DESTINATION } from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_DESTINATION:
      return action.payload;
    default:
      return state;
  }
}
