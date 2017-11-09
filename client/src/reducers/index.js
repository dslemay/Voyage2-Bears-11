import { combineReducers } from 'redux';
import hotelsReducer from './hotelsReducer';
import authReducer from './authReducer';
import favoritesReducer from './favoritesReducer';
import messageReducer from './messageReducer';
import destinationReducer from './destinationReducer';

export default combineReducers({
  hotels: hotelsReducer,
  auth: authReducer,
  favorites: favoritesReducer,
  messages: messageReducer,
  destination: destinationReducer
});
