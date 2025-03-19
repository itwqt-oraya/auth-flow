import {USER, USER_RESPONSE} from '@/models/user';

// auth context
export interface AUTH_CONTEXT {
  user: Pick<USER, 'firstName' | 'lastName' | 'email' | 'userId'>;
  setUser: (
    user: Pick<USER, 'firstName' | 'lastName' | 'email' | 'userId'>
  ) => void;
  loginUser: (res: USER_RESPONSE) => void;
  logoutUser: () => void;
  isAuthenticated: boolean;
}
