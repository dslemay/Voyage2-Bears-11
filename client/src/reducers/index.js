import { combineReducers } from 'redux';
import hotelsReducer from './hotelsReducer';
import flightsReducer from './flightsReducer';

export default combineReducers({
  hotels: hotelsReducer,
  flights: flightsReducer,
});
