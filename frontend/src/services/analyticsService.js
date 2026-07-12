import API from "./authService";

const getToken = () => {
  const user =
    JSON.parse(localStorage.getItem("user")) ||
    JSON.parse(sessionStorage.getItem("user"));

  return user?.token;
};

export const getAnalytics = async () => {
  const response = await API.get("/analytics", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};