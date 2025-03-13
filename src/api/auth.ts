import {http} from '@utils/http';

interface LoginData {
  email: string;
  password: string;
}

interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

// POST for login /login then store token in auth context
export const login = (data: LoginData) => {
  return http('POST', '/auth/login', data);
};

// POST for signuo /user/signup
export const signup = (data: SignupData) => {
  return http('POST', '/user/signup', data);
};

// GET for refresh token
export const refresh = (token: string) => {
  return http('GET', '/auth/refresh', null, token);
};
