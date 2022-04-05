import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl);
}

const create = newObject=>{
    axios.post(baseUrl,newObject);
}

const update = (id,newObject)=>{
    return axios.put(`${baseUrl}/${id}`,newObject);
}

export default {
    getAll:getAll,
    create:create,
    update:update
}