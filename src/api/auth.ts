import {http} from '@utils/http';

// POST for login /login then store token in auth context
export const login = (data) => {
  return http('POST', '/auth/login', data);
};

// POST for signuo /user/signup
export const signup = (data) => {
  return http('POST', '/user/signup', data);
};

// GET for refresh token
export const refresh = (token: string) => {
  return http('GET', '/auth/refresh', null, token);
};
