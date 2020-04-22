import { combineReducers } from 'redux';
import sessionErrorsReducer from './session_errors_reducer';
import roomErrorsReducer from "./room_errors_reducer";

export default combineReducers({
  session: sessionErrorsReducer,
  room: roomErrorsReducer,
});