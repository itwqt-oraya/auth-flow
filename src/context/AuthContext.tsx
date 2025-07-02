import {useState, useEffect, ReactNode, createContext} from 'react';
import {deleteCookie, getCookie} from '@utils/cookie';
import {AUTH_CONTEXT} from '@/models/context';

export const AuthContext = createContext<AUTH_CONTEXT>({
  user: {
    firstName: '',
    lastName: '',
    email: '',
    userId: '',
  },
  setUser: () => {},
  logoutUser: () => {},
});

export function AuthProvider({children}: {children: ReactNode}) {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    userId: '',
  });

  useEffect(() => {
    const userCookie = getCookie('user');
    if (userCookie) {
      const userData = JSON.parse(userCookie);
      setUser({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        userId: userData.userId,
      });
    }
  }, []);

  const logoutUser = () => {
    setUser({
      firstName: '',
      lastName: '',
      email: '',
      userId: '',
    });

    deleteCookie('token');
    window.location.href = '/';
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
