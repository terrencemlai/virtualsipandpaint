import {fetchRoom, createRoom} from "../util/room_util";

export const RECEIVE_ROOM = "RECEIVE_ROOM";
export const RECEIVE_ROOM_ERRORS = "RECEIVE_ROOM_ERRORS";
export const CREATE_NEW_ROOM = "CREATE_NEW_ROOM";

export const receiveRoom = room => ({
  type: RECEIVE_ROOM,
  room
});

export const receiveRoomErrors = errors => ({
  type: RECEIVE_ROOM_ERRORS,
  errors
});


export const createNewRoom = roomData => ({
  type: CREATE_NEW_ROOM,
  roomData
});

export const joinRoom = roomToken => dispatch => (
  fetchRoom(roomToken)
  .then(res => dispatch(receiveRoom(res)))
  .catch(err => dispatch(receiveRoomErrors(err.response.data)))
);

export const newRoom = (roomData) => dispatch => (
  createRoom(roomData)
  .then(res => dispatch(receiveRoom(res)))
);
