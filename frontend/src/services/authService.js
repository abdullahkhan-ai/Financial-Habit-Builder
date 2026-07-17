import axios from "axios";

const API = axios.create({
  baseURL: "https://finhabit-backend.onrender.com/api",
});

export const registerUser = async (userData) => {
  const response = await API.post("/auth/register", userData);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await API.post("/auth/login", userData);
  return response.data;
};

export default API;