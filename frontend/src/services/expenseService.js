import API from "./authService";

const getToken = () => {
  const user =
    JSON.parse(localStorage.getItem("user")) ||
    JSON.parse(sessionStorage.getItem("user"));

  return user?.token;
};

export const getExpense = async () => {
  const response = await API.get("/expense", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

export const createExpense = async (expenseData) => {
  const response = await API.post("/expense", expenseData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

export const updateExpense = async (id, expenseData) => {
  const response = await API.put(`/expense/${id}`, expenseData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

export const deleteExpense = async (id) => {
  const response = await API.delete(`/expense/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};