import axios, {AxiosError, AxiosResponse} from 'axios';
import {getCookie} from '@utils/cookie';

const token = getCookie('token');

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    ...(token && {Authorization: `Bearer ${token}`}),
  },
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

    return Promise.reject(error);
  }
);
// if token -> add auth header
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

  return dataResponse;
};

export const sampleFunction = <T = string>(data: T) => {
  return data;
};
