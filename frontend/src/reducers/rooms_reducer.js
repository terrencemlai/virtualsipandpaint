import {
  RECEIVE_ROOM,
} from "../actions/room_actions";

// room obj id, host id, room token
export default function (state = {}, action) {
  switch (action.type) {
    case RECEIVE_ROOM:
      return action.room.data;
    default:
      return state;
  }
}
