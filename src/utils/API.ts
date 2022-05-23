import axios, { AxiosRequestConfig } from 'axios';
import { fetchSigninUser, signoutUser } from '../store/reducers/userSlice';
import { store } from '../store/store';

export const API_URL = 'https://project-management-app-76.herokuapp.com/';

export const API = axios.create({
  baseURL: API_URL,
});

API.interceptors.request.use((config: AxiosRequestConfig) => {
  (config.headers ?? {}).Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

API.interceptors.response.use(
  async (response) => {
    if (response.config.url === '/signup') {
      const userData = JSON.parse(response.config.data);
      store.dispatch(fetchSigninUser(userData));
    }
    return response;
  },
  async (error) => {
    if (error.response.statusCode === 401) store.dispatch(signoutUser);
    return Promise.reject(error);
  }
);
