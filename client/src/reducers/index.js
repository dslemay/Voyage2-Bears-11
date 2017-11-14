import { combineReducers } from 'redux';
import authReducer from './authReducer';
import favoritesReducer from './favoritesReducer';
import messageReducer from './messageReducer';
import destinationDetailsReducer from './destinationDetailsReducer';

export default combineReducers({
  auth: authReducer,
  favorites: favoritesReducer,
  messages: messageReducer,
  destinationDetails: destinationDetailsReducer
});
