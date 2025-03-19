import {useState, ReactNode} from 'react';
import {setCookie, deleteCookie} from '@utils/cookie';
import {USER_RESPONSE} from '@/models/user';
import {AuthContext} from '@/context';

export function AuthProvider({children}: {children: ReactNode}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    userId: '',
  });

  // login -> set token in cookie
  const loginUser = (res: USER_RESPONSE) => {
    setUser({
      firstName: res.data.firstName,
      lastName: res.data.lastName,
      email: res.data.email,
      userId: res.data.userId,
    });
    setCookie('isAuthenticated', 'true', 1);
    setCookie('token', res.data.token, 1);

    setIsAuthenticated(true);
  };

  // logout -> remove token from cookie
  const logoutUser = () => {
    setUser({
      firstName: '',
      lastName: '',
      email: '',
      userId: '',
    });
    deleteCookie('token');
    deleteCookie('isAuthenticated');
    setIsAuthenticated(false);
    window.location.href = '/';
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loginUser,
        logoutUser,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
