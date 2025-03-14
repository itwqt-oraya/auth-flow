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
  loginUser: (res: LoginProps) => void;
  logoutUser: () => void;
  refreshAuth: () => void;
  reload: boolean;
  triggerReload: () => void;
}

interface ResponseProps {
  status: number;
  data: {
    data: {
      firstName: string;
      lastName: string;
      email: string;
      userId: string;
      token: string;
    };
  };
}

interface LoginProps {
  firstName: string;
  lastName: string;
  email: string;
  userId: string;
  token: string;
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
  const loginUser = (res: LoginProps) => {
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
        const response = res as ResponseProps;
        if (response.status === 200) {
          setUser({
            firstName: response.data.data.firstName,
            lastName: response.data.data.lastName,
            email: response.data.data.email,
            userId: response.data.data.userId,
          });
          setCookie('token', response.data.data.token, 1);
          setIsAuthenticated(true);
          console.log('Token refreshed');
        }
        if (response.status === 401 || response.status === 403) {
          console.log('Unauthorized');
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
