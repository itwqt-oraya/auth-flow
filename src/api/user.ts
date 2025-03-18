import {http} from '@utils/http';
import {USER_UPDATE, USER_PASSWORD, USER_RESPONSE} from '@/models/user';

// PUT user details
export const details = (data: USER_UPDATE) => {
  return http<USER_RESPONSE>('PUT', '/user', data);
};

// PUT user password
// uhh need: oldpass, newpass, confirmpass
export const password = (data: USER_PASSWORD) => {
  return http('PUT', '/user/password', data);
};
