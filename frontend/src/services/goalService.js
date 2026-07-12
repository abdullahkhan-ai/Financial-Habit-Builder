import API from "./authService";

const getToken = () => {
  const user =
    JSON.parse(localStorage.getItem("user")) ||
    JSON.parse(sessionStorage.getItem("user"));

  return user?.token;
};

const config = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

export const getGoals = async () => {
  const res = await API.get("/goals", config());
  return res.data;
};

export const createGoal = async (goalData) => {
  const res = await API.post("/goals", goalData, config());
  return res.data;
};

export const updateGoal = async (id, goalData) => {
  const res = await API.put(`/goals/${id}`, goalData, config());
  return res.data;
};

export const deleteGoal = async (id) => {
  const res = await API.delete(`/goals/${id}`, config());
  return res.data;
};

export const addSavings = async (id, amount) => {
  const res = await API.patch(
    `/goals/${id}/add-savings`,
    { amount },
    config()
  );

  return res.data;
};