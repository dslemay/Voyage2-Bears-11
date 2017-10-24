import { combineReducers } from 'redux';
import hotelsReducer from './hotelsReducer';
import flightsReducer from './flightsReducer';
import authReducer from './authReducer';

export default combineReducers({
  hotels: hotelsReducer,
  flights: flightsReducer,
  hotels: hotelsReducer,
  auth: authReducer
});
