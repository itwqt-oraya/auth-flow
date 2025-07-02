import {USER} from '@/models/user';

// auth context
export interface AUTH_CONTEXT {
  user: Pick<USER, 'firstName' | 'lastName' | 'email' | 'userId'>;
  setUser: (
    user: Pick<USER, 'firstName' | 'lastName' | 'email' | 'userId'>
  ) => void;
  logoutUser: () => void;
}
