import {http} from '@utils/http';

interface UserDetails {
  firstName: string;
  lastName: string;
}

interface UserPassword {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// PUT user details
export const details = (data: UserDetails, token: string) => {
  return http('PUT', '/user', data, token);
};

// PUT user password
// uhh need: oldpass, newpass, confirmpass
export const password = (data: UserPassword, token: string) => {
  return http('PUT', '/user/password', data, token);
};
