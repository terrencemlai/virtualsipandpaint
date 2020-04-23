import axios from "axios";

export const createRoom = (hostId) => {
  return axios.post('api/rooms/new', hostId);
};

export const fetchRoomByToken = (roomToken) => {
  return axios.get(`api/rooms/join?roomtoken=${roomToken}`);
};

export const fetchRoomById = (roomId) => {
  return axios.get(`api/rooms/${roomId}`);
};