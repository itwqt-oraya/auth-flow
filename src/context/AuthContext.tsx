import {createContext, useState} from 'react';
import {getCookie, setCookie, deleteCookie} from '@utils/cookie';
// type AuthContextType = {
//   state: {isAuthenticated: boolean};
//   login: (isAuthenticated: boolean) => void;
//   logout: () => void;
// };

// export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContext = createContext({});

export function AuthProvider({children}) {
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // login -> set token in cookie
  const loginUser = (res) => {
    setUser(res.data);
    setIsAuthenticated(true);
    setCookie('token', res.data.token, 1);
  };

  // logout -> remove token from cookie
  const logoutUser = () => {
    setUser({});
    setIsAuthenticated(false);
    deleteCookie('token');
    window.location.href = '/';
  };

  // check if cookie exists
  const refresh = () => {
    const token = getCookie('token');
    // @TODO: call refresh api
    if (token) {
      setUser({token});
      setIsAuthenticated(true);
    }
  };

  const isAuth = () => {
    const token = getCookie('token');
    if (token) {
      setUser({token});
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        loginUser,
        logoutUser,
        refresh,
        isAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// TODO: For context
// if (response.config.url === '/auth/login') {
//   if (response.status === 200) {
//     console.log('login', response);
//     setCookie('token', response.data.data.token, 1);
//     window.location.reload();
//   }
// }

// if (response.config.url === '/auth/signup') {
//   if (response.status === 200) {
//     console.log('signup', response);
//     window.location.reload();
//   }
// }
