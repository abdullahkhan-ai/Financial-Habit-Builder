import API from "./authService";

const getToken = () => {
  const storedUser =
    localStorage.getItem("user") ||
    sessionStorage.getItem("user");

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser).token;
  } catch (error) {
    console.error("Failed to parse stored user:", error);
    return null;
  }
};

export const getDashboard = async () => {
  const token = getToken();

  if (!token) {
    throw new Error("Authentication token not found.");
  }

  try {
    const { data } = await API.get("/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error) {
    console.error("Dashboard API Error:", error);
    throw error;
  }
};