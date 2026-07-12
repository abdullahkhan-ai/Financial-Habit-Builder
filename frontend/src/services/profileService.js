import API from "./authService";

const getToken = () =>
  JSON.parse(localStorage.getItem("user"))?.token ||
  JSON.parse(sessionStorage.getItem("user"))?.token;

const config = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

export const getProfile = async () => {
  const res = await API.get(
    "/profile",
    config()
  );

  return res.data;
};

export const updateProfile = async (
  profile
) => {
  const res = await API.put(
    "/profile",
    profile,
    config()
  );

  return res.data;
};