import {createContext} from 'react';
type AuthContextType = 'auth' | 'no-auth';

export const AuthContext = createContext<AuthContextType>('no-auth');
