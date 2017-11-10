import {
  FETCH_DESTINATION,
  FETCH_DESTINATION_CATEGORY
} from '../actions/types';

export default function(state = { destination: null, hotels: [] }, action) {
  const { category } = action;
  switch (action.type) {
    case FETCH_DESTINATION:
      return Object.assign({}, state, { destination: action.payload });
    case FETCH_DESTINATION_CATEGORY:
      return Object.assign({}, state, {
        [category]: action.payload
      });
    default:
      return state;
  }
}
