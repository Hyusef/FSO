import axios from "axios";

const baseURL = "http://localhost:3003/anecdotesAtStart";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export default { getAll };
