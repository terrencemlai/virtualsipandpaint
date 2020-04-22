import {
  RECEIVE_ROOM,
  CREATE_NEW_ROOM,
} from "../actions/room_actions";

// room obj id, host id, room token
export default function (state = {}, action) {
  switch (action.type) {
    case RECEIVE_ROOM:
      return action.room;
    case CREATE_NEW_ROOM:
      return action.roomData;
    default:
      return state;
  }
}
