import axios from 'axios';

const getApi = (config = {}) => {
  const api = axios.create({
    baseUrl: 'http://localhost:3000',
    timeout: 2000,
    headers: config,
  });
  return api;
}

export {
  getApi,
};