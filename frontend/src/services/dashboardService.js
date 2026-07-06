import API from "./authService";

const getToken = () => {
  return JSON.parse(localStorage.getItem("user"))?.token;
};

export const getDashboard = async () => {
  const response = await API.get("/dashboard", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};