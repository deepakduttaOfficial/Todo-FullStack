import axios from "axios";
import { REACT_APP_API_KEY } from "../backend";

export const getTasks = (token, profileId, todoId) => {
  return axios
    .get(`${REACT_APP_API_KEY}/tasks/get/${profileId}/${todoId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const editTask = (profileId, taskId, data, token) => {
  return axios
    .put(`${REACT_APP_API_KEY}/task/update/${profileId}/${taskId}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const removeTask = (token, profileId, taskId) => {
  return axios
    .delete(`${REACT_APP_API_KEY}/task/remove/${profileId}/${taskId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const createTask = (token, profileId, todoId, data) => {
  return axios
    .post(`${REACT_APP_API_KEY}/task/create/${profileId}/${todoId}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};
