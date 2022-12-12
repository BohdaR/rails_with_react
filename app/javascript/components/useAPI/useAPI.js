import axios from "axios";

export const get = async (url, config) => {
  return await axios.get(url, config);
}

export const post = async (url, body, config) => {
  return await axios.post(url, body, config);
}

export const put = async (url, body, config) => {
  return await axios.put(url, body, config);
}

export const deleteRequest = async (url, config) => {
  return await axios.delete(url, config);
}
