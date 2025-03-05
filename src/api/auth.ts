import {http} from '@utils/http';
import {getCookie} from '@utils/cookie';
// POST for login /login then store token in auth context
export const login = (data) => {
  return http('POST', '/auth/login', data);
};

// POST for signuo /user/signup
export const signup = (data) => {
  return http('POST', '/user/signup', data);
};

export const test = () => {
  return http('GET', '/test', null, getCookie('token'));
};
