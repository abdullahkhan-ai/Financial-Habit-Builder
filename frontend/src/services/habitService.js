import API from "./authService";

const getToken = () =>
  JSON.parse(localStorage.getItem("user"))?.token;

const config = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

export const getHabits = async () => {
  const res = await API.get("/habits", config());
  return res.data;
};

export const createHabit = async (habitData) => {
  const res = await API.post(
    "/habits",
    habitData,
    config()
  );

  return res.data;
};

export const updateHabit = async (
  id,
  habitData
) => {
  const res = await API.put(
    `/habits/${id}`,
    habitData,
    config()
  );

  return res.data;
};

export const completeHabit = async (id) => {
  const res = await API.patch(
    `/habits/${id}/complete`,
    {},
    config()
  );

  return res.data;
};

export const deleteHabit = async (id) => {
  const res = await API.delete(
    `/habits/${id}`,
    config()
  );

  return res.data;
};