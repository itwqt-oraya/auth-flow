import {http} from '@utils/http';
import {USER_RESPONSE, LOGIN_PAYLOAD, SIGNUP_PAYLOAD} from '@/models/user';
import {MSG_RESPONSE} from '@/models/posts';

// POST for login /login then store token in auth context
export const login = (data: LOGIN_PAYLOAD) => {
  return http<USER_RESPONSE>('POST', '/auth/login', data);
};

// POST for signuo /user/signup
export const signup = (data: SIGNUP_PAYLOAD) => {
  return http<MSG_RESPONSE>('POST', '/user/signup', data);
};

// GET for refresh token
export const refresh = () => {
  return http<USER_RESPONSE>('GET', '/auth/refresh');
};
