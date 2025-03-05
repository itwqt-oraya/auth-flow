import axios from 'axios';

export const http = (
  method: string = 'GET',
  url: string,
  data: any,
  token: string
) => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
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
      console.log(response);
      return response;
    })
    .catch((error) => {
      console.log('the error', error);
    });
};
