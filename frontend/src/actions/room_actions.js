import {fetchRoom, createRoom} from "../util/room_util";

export const RECEIVE_ROOM = "RECEIVE_ROOM";
export const RECEIVE_ROOM_ERRORS = "RECEIVE_ROOM_ERRORS";
// export const CREATE_NEW_ROOM = "CREATE_NEW_ROOM";

export const receiveRoom = room => ({
  type: RECEIVE_ROOM,
  room
});

export const receiveRoomErrors = errors => ({
  type: RECEIVE_ROOM_ERRORS,
  errors
});


// export const createNewRoom = room => ({
//   type: CREATE_NEW_ROOM,
//   room
// });

export const joinRoom = roomToken => dispatch => {
  debugger
  return(
    fetchRoom(roomToken)
      .then(res => dispatch(receiveRoom(res)))
      .catch(err => dispatch(receiveRoomErrors(err.response.data)))
  );
};

export const newRoom = (userId) => dispatch => (
  createRoom(userId)
  .then(res => dispatch(receiveRoom(res)))
);
