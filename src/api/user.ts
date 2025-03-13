import {http} from '@utils/http';

// PUT user details
export const details = (data, token: string) => {
  return http('PUT', '/user', data, token);
};

// PUT user password
// uhh need: oldpass, newpass, confirmpass
export const password = (data, token: string) => {
  return http('PUT', '/user/password', data, token);
};
