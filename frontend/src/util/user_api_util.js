import axios from "axios";

export const fetchUser = (userData) => {
  return axios.get(`/api/users/${userData.id}`, userData);
};

export const fetchAllUsers = (userData) => {
  return axios.get("api/users", userData);
};
