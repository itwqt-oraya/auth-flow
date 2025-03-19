import {createContext} from 'react';
import {AUTH_CONTEXT} from '@/models/context';

export const AuthContext = createContext<AUTH_CONTEXT>({
  user: {
    firstName: '',
    lastName: '',
    email: '',
    userId: '',
  },
  setUser: () => {},
  isAuthenticated: false,
  loginUser: () => {},
  logoutUser: () => {},
});
