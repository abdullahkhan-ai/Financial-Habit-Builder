import API from "./authService";

const getToken = () =>
  JSON.parse(localStorage.getItem("user"))?.token;

export const getAnalytics = async () => {
  const response = await API.get("/analytics", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};