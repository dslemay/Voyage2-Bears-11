import { combineReducers } from 'redux';
import flightsReducer from './flightsReducer';
import authReducer from './authReducer';
import favoritesReducer from './favoritesReducer';
import messageReducer from './messageReducer';
import destinationDetailsReducer from './destinationDetailsReducer';

export default combineReducers({
  flights: flightsReducer,
  auth: authReducer,
  favorites: favoritesReducer,
  messages: messageReducer,
  destinationDetails: destinationDetailsReducer
});
