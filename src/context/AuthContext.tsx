import {createContext, useState, ReactNode} from 'react';
import {setCookie, deleteCookie} from '@utils/cookie';
import {USER_RESPONSE} from '@/models/user';
import {AUTH_CONTEXT} from '@/models/context';

export const AuthContext = createContext<AUTH_CONTEXT>();

export function AuthProvider({children}: {children: ReactNode}) {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    userId: '',
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // login -> set token in cookie
  const loginUser = (res: USER_RESPONSE) => {
    setUser({
      firstName: res.data.firstName,
      lastName: res.data.lastName,
      email: res.data.email,
      userId: res.data.userId,
    });
    setIsAuthenticated(true);
    setCookie('token', res.data.token, 1);
  };

  // logout -> remove token from cookie
  const logoutUser = () => {
    setUser({
      firstName: '',
      lastName: '',
      email: '',
      userId: '',
    });
    setIsAuthenticated(false);
    deleteCookie('token');
    window.location.href = '/';
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
