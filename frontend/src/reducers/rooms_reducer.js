import { RECEIVE_ROOM, RECEIVE_ROOM_ERRORS } from "../actions/room_actions";

// room obj id, host id, room token
export default function (state = {}, action) {
  switch (action.type) {
    case RECEIVE_ROOM:
      return action.room.data;
    case RECEIVE_ROOM_ERRORS:
      return {};
    default:
      return state;
  }
}
