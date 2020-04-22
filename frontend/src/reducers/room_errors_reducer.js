import {
  RECEIVE_ROOM_ERRORS,
  RECEIVE_ROOM,
} from "../actions/room_actions";

const _nullErrors = [];

const roomErrorsReducer = (state = _nullErrors, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ROOM_ERRORS:
      return action.errors;
    case RECEIVE_ROOM:
      return _nullErrors;
    default:
      return state;
  }
};

export default roomErrorsReducer;
