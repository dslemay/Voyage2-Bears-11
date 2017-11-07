import { combineReducers } from 'redux';
import hotelsReducer from './hotelsReducer';
import flightsReducer from './flightsReducer';
import authReducer from './authReducer';
import favoritesReducer from './favoritesReducer';
import messageReducer from './messageReducer';

export default combineReducers({
  hotels: hotelsReducer,
  flights: flightsReducer,
  auth: authReducer
  auth: authReducer,
  favorites: favoritesReducer,
  messages: messageReducer
});
