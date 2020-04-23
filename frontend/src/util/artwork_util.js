import axios from "axios";

export const createArtwork = (data) => {
  return axios.post('api/artworks/new', data);
};

export const fetchArtworks = (userId) => {
  return axios.get(`api/artworks/index?userId=${userId}`);
};