import API from "./authService";

const getToken = () => {
  const localUser = localStorage.getItem("user");
  const sessionUser = sessionStorage.getItem("user");

  const user =
    (localUser && JSON.parse(localUser)) ||
    (sessionUser && JSON.parse(sessionUser));

  return user?.token;
};

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
  if (!id) {
    throw new Error("User ID is missing.");
  }

  const res = await API.delete(
    `/admin/users/${id}`,
    config()
  );

  return res.data;
};