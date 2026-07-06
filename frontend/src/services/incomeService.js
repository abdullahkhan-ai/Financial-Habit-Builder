import API from "./authService";

const getToken = () => {
  return JSON.parse(localStorage.getItem("user"))?.token;
};

export const getIncome = async () => {
  const response = await API.get("/income", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

export const createIncome = async (incomeData) => {
  const response = await API.post("/income", incomeData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

export const updateIncome = async (id, incomeData) => {
  const response = await API.put(`/income/${id}`, incomeData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

export const deleteIncome = async (id) => {
  const response = await API.delete(`/income/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};