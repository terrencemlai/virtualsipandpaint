import axios from "axios";

export const createRoom = (hostId) => {
  return axios.post('api/rooms/new', hostId);
};

export const fetchRoom = (roomToken) => {
  return axios.get('api/rooms/join', roomToken);
};