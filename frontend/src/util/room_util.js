import axios from "axios";

export const createRoom = (roomData) => {
  return axios.post('api/rooms/new', roomData);
};

export const fetchRoom = (roomToken) => {
  return axios.get('api/rooms/join', roomToken);
};