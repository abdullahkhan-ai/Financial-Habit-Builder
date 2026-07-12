import API from "./authService";

const getToken = () => {
  const user =
    JSON.parse(localStorage.getItem("user")) ||
    JSON.parse(sessionStorage.getItem("user"));

  return user?.token;
};

export const getDashboard = async () => {
  const response = await API.get("/dashboard", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};