import axios, {AxiosError} from 'axios';
import {getCookie} from '@utils/cookie';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  },
});

instance.interceptors.request.use((config) => {
  const token = getCookie('token');

  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    const status = error.status;
    const message = error.message;
    const code = error.code;

    console.log('status', status);
    console.log('message', message);
    console.log('code', code);

    if (status === 403) {
      window.location.href = '/';
    }

    return Promise.reject(error);
  }
);

export const http = async <T = Record<string, unknown>>(
  method: string = 'GET',
  url: string,
  data?: unknown
) => {
  const {data: dataResponse} = await instance<T>({
    method: method,
    url: url,
    data: data,
  });
  console.log('response');

  return dataResponse;
};
