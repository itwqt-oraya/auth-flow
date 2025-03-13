import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';
import {getCookie, setCookie, deleteCookie} from '@utils/cookie';
import {refresh} from '@api/auth';

interface AuthContextProps {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    userId: string;
  };
  setUser: Dispatch<
    SetStateAction<{
      firstName: string;
      lastName: string;
      email: string;
      userId: string;
    }>
  >;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  loginUser: (res: object) => void;
  logoutUser: () => void;
  refreshAuth: () => void;
  reload: boolean;
  triggerReload: () => void;
}

export const AuthContext = createContext<AuthContextProps>();

export function AuthProvider({children}: {children: ReactNode}) {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    userId: '',
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = getCookie('token');
    if (token && token !== 'undefined') {
      setIsAuthenticated(true);
    }
  }, []);

  // login -> set token in cookie
  const loginUser = (res) => {
    setUser({
      firstName: res.firstName,
      lastName: res.lastName,
      email: res.email,
      userId: res.userId,
    });
    setIsAuthenticated(true);
    setCookie('token', res.token, 1);
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

  // check if cookie still exists and refresh token
  const refreshAuth = () => {
    const token = getCookie('token');
    if (token && token !== 'undefined' && !isAuthenticated) {
      refresh(token).then((res) => {
        if (res.status === 200) {
          setCookie('token', res.data.data.token, 1);
          setUser({
            firstName: res.data.data.firstName,
            lastName: res.data.data.lastName,
            email: res.data.data.email,
            userId: res.data.data.userId,
          });
          setIsAuthenticated(true);
        }
        if (res.status === 401 || res.status === 403) {
          logoutUser();
        }
      });
    }
  };

  const [reload, setReload] = useState(false);

  const triggerReload = () => {
    setReload(!reload);
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
        refreshAuth,
        reload,
        triggerReload,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
