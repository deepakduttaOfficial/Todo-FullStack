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
