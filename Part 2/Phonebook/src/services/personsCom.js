import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';


const getAll = () => {
    console.log("Getting")
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const add = newObject => {
    console.log("Adding")
  const request = axios.post(baseUrl, newObject);
  console.log("adedd")
  return request.then(response => response.data);

};

const erase = id =>{
    console.log("Deleting")
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then(response => response.data);
}

const update = (id, newObject) => {
    console.log("Updating")
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then(response => response.data);
};

export default { getAll,add,erase,update }