import API from "./authService";

const getToken = () =>
  JSON.parse(localStorage.getItem("user"))?.token;

const config = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

export const getAdminStats = async () => {
  const res = await API.get(
    "/admin/dashboard",
    config()
  );

  return res.data;
};

export const getUsers = async () => {
  const res = await API.get(
    "/admin/users",
    config()
  );

  return res.data;
};

export const deleteUser = async (id) => {
  const res = await API.delete(
    `/admin/users/${id}`,
    config()
  );

  return res.data;
};