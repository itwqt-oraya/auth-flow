import {createContext, useState, useEffect} from 'react';
import {getCookie, setCookie, deleteCookie} from '@utils/cookie';
import {refresh} from '@api/auth';

export const AuthContext = createContext();

export function AuthProvider({children}) {
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = getCookie('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // login -> set token in cookie
  const loginUser = (res, status) => {
    setUser({
      firstName: res.data.firstName,
      lastName: res.data.lastName,
      email: res.data.email,
      userId: res.data.userId,
    });
    if (handleStatusCode(status)) {
      setIsAuthenticated(true);
      setCookie('token', res.data.token, 1);
    }
  };

  // logout -> remove token from cookie
  const logoutUser = () => {
    setUser({});
    setIsAuthenticated(false);
    deleteCookie('token');
    window.location.href = '/';
  };

  // check if cookie still exists and refresh token
  const refreshAuth = () => {
    const token = getCookie('token');
    if (token) {
      refresh(token).then((res) => {
        if (res.status === 200) {
          setCookie('token', res.data.token, 1);
          setUser({
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            email: res.data.email,
            userId: res.data.userId,
            token: res.data.token,
          });
          setIsAuthenticated(true);
        }
      });
    }
  };

  const [reload, setReload] = useState(false);

  const triggerReload = () => {
    setReload(!reload);
  };

  // handle status codes
  // 200 -> login / signup / post / edit / delete
  // 401 -> unauthorized
  // 403 -> forbidden
  // 404 -> not found
  function handleStatusCode(status) {
    console.log('Status Code:', status);
    switch (status) {
      case 200:
        console.log('Success');
        return true;
      case 401:
        console.log('Unauthorized');
        refreshAuth();
        break;
      case 403:
        console.log('Forbidden');
        break;
      case 404:
        console.log('Not Found');
        break;
      default:
        console.log('Unknown Status Code');
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        loginUser,
        logoutUser,
        refreshAuth,
        handleStatusCode,
        reload,
        triggerReload,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
