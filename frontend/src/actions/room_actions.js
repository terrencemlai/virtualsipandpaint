import {fetchRoomByToken, fetchRoomById, createRoom} from "../util/room_util";

export const RECEIVE_ROOM = "RECEIVE_ROOM";
export const RECEIVE_ROOM_ERRORS = "RECEIVE_ROOM_ERRORS";

export const receiveRoom = room => ({
  type: RECEIVE_ROOM,
  room
});

export const receiveRoomErrors = errors => ({
  type: RECEIVE_ROOM_ERRORS,
  errors
});



export const joinRoom = roomToken => dispatch => (
    fetchRoomByToken(roomToken)
      .then(res => dispatch(receiveRoom(res)))
      .catch(err => dispatch(receiveRoomErrors(err.response.data)))
);


export const getRoom = roomId => dispatch => {
  return(
    fetchRoomById(roomId)
      .then(res => dispatch(receiveRoom(res)))
      .catch(err => {
        dispatch(receiveRoomErrors(err.response.data))
      })
  );
};

export const newRoom = (userId) => dispatch => (
  createRoom(userId)
  .then(res => dispatch(receiveRoom(res)))
);
