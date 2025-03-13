import {useState, useContext} from 'react';
import {AuthContext} from '@context/AuthContext';
import {login} from '@api/auth';
import {useNavigate} from 'react-router';

interface LoginData {
  email: string;
  password: string;
}

export const useLogin = () => {
  const {loginUser, isAuthenticated} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  async function postLogin(data: LoginData) {
    setLoading(true);
    try {
      const res = await login(data);
      if (res) {
        loginUser(res.data.data);
        if (isAuthenticated) {
          return nav('/dashboard');
        }
      }
      return res;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  return {loading, postLogin};
};
