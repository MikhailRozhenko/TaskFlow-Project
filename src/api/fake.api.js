import axios from 'axios';

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';

export async function getUsers() {
  const { data } = await axios.get('/users');
  return data;
}
