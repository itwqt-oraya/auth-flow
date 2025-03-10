import axios from 'axios';
import {getCookie} from '@utils/cookie';

// if token -> add auth header
export const http = (
  method: string = 'GET',
  url: string,
  data: any,
  token: string
) => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 5000,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      Authorization: `Bearer ${token}`,
    },
  });

  return instance({
    method: method,
    url: url,
    data: data,
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      // status code here -> window location redirect
      console.log(error);
      throw error;
    });
};
