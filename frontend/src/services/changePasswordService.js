import API from "./authService";

export const changePassword = async (passwordData) => {
  const user =
    JSON.parse(localStorage.getItem("user")) ||
    JSON.parse(sessionStorage.getItem("user"));

  const response = await API.put(
    "/auth/change-password",
    passwordData,
    {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }
  );

  return response.data;
};