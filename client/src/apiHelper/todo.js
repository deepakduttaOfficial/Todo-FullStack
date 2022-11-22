import axios from "axios";
import { REACT_APP_API_KEY } from "../backend";

export const createTodo = (profileId, data, token) => {
  return axios
    .post(`${REACT_APP_API_KEY}/todo/create/${profileId}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const getTodos = (token) => {
  return axios
    .get(`${REACT_APP_API_KEY}/todos/get`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const getTodo = (token, profileId, todoId) => {
  return axios
    .get(`${REACT_APP_API_KEY}/todo/get/${profileId}/${todoId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const updateTodo = (profileId, todoId, data, token) => {
  return axios
    .put(`${REACT_APP_API_KEY}/todo/update/${profileId}/${todoId}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};