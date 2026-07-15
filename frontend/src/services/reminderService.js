import API from "./authService";

const getToken = () =>
  JSON.parse(localStorage.getItem("user"))?.token ||
  JSON.parse(sessionStorage.getItem("user"))?.token;

const config = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

export const getReminders = async () => {
  const res = await API.get(
    "/reminders",
    config()
  );

  return res.data;
};

export const createReminder = async (
  reminder
) => {
  const res = await API.post(
    "/reminders",
    reminder,
    config()
  );

  return res.data;
};

export const toggleReminder = async (
  id
) => {
  const res = await API.patch(
    `/reminders/${id}/toggle`,
    {},
    config()
  );

  return res.data;
};

export const deleteReminder = async (
  id
) => {
  const res = await API.delete(
    `/reminders/${id}`,
    config()
  );

  return res.data;
};