import { combineReducers } from 'redux';
import sessionErrorsReducer from './session_errors_reducers';

export default combineReducers({
  session: sessionErrorsReducer
});