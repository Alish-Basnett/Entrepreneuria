import axios from "axios";

const API_URL = "http://localhost:5000/api/auth/";

const login = (email, password) => {
  return axios.post(API_URL + "login", { email, password });
};

const signup = (email, password) => {
  return axios.post(API_URL + "signup", { email, password });
};

export default {
  login,
  signup,
};
