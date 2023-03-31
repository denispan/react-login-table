import axios from 'axios';
import { routes } from '../routes';
import { getToken } from './localStorageService';

export const HOST = `https://test.v5.pryaniky.com`;

const $api = axios.create({
  baseURL: HOST
});

$api.interceptors.request.use((config) => {
  config.headers['x-auth'] = getToken();
  return config;
});

$api.interceptors.response.use((response) => {
  if (response.data.error_text === 'Access deny') {
    // alert('Нужно залогиниться. Вы сейчас будете перенаправлены на страницу авторизации');
    window.location.assign(routes.login);
  }
  return response;
});

export default $api;
