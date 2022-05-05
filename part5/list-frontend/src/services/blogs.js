import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (onToken) => {
  token = `bearer ${onToken}`;
};
const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (blogObject) => {
  const config = {
    headers: {
      Authorization: token,
      "Cache-Control": "no-cache",
    },
  };
  const response = await axios.post(baseUrl, blogObject, config);
  return response.data;
};

const makeComment = async (comment, id) => {
  const config = {
    headers: {
      Authorization: token,
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
    },
  };
  const response = await axios.post(
    `${baseUrl}/${id}/comments`,
    { comment: comment },
    config
  );
  return response.data;
};

const createPut = async (blogObject, id) => {
  const response = await axios.put(blogObject, id);
  return response.data;
};
export default { getAll, create, setToken, createPut, makeComment };
