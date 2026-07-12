import API from "./authService";

const getToken = () =>
  JSON.parse(localStorage.getItem("user"))?.token ||
  JSON.parse(sessionStorage.getItem("user"))?.token;

const config = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

export const createFeedback = async (feedbackData) => {
  const res = await API.post(
    "/feedback",
    feedbackData,
    config()
  );

  return res.data;
};

export const getMyFeedback = async () => {
  const res = await API.get(
    "/feedback/my",
    config()
  );

  return res.data;
};

export const getAllFeedback = async () => {
  const res = await API.get(
    "/feedback/admin",
    config()
  );

  return res.data;
};

export const resolveFeedback = async (id) => {
  const res = await API.patch(
    `/feedback/admin/${id}/resolve`,
    {},
    config()
  );

  return res.data;
};

export const deleteFeedback = async (id) => {
  const res = await API.delete(
    `/feedback/admin/${id}`,
    config()
  );

  return res.data;
};