import axios from "axios";

const baseURL = "http://localhost:3003/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseURL);
  return response.data;
};

const getId = () => (100000 * Math.random()).toFixed(0);

const createNew = async (content) => {
  const object = {
    content: content,
    id: getId(),
    votes: 0,
  };
  const response = await axios.post(baseURL, object);
  return response.data;
};

const putNew = async(id,object)=>{
  const response = await axios.put(baseURL+`/${id}`,object)
  return response.data
  }



export default { getAll, createNew,putNew };
