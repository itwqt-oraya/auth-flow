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
      if (res && res.status === 200) {
        loginUser(res.data.data);
        if (isAuthenticated) {
          alert('Logged in successfully');
          return nav('/dashboard');
        }
      } else {
        alert('Error logging in. Please try again.');
        return;
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
