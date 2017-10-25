import { combineReducers } from 'redux';
import hotelsReducer from './hotelsReducer';
import authReducer from './authReducer';

export default combineReducers({
  hotels: hotelsReducer,
  auth: authReducer
});
