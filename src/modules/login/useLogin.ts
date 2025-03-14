import {useState, useContext} from 'react';
import {AuthContext} from '@context/AuthContext';
import {login} from '@api/auth';
import {useNavigate} from 'react-router';
import {USER, LOGIN_PAYLOAD} from '@/models/user';
import {AxiosError} from 'axios';

export const useLogin = () => {
  const {loginUser, isAuthenticated} = useContext(AuthContext);
  const [response, setResponse] = useState<USER | []>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const nav = useNavigate();

  async function postLogin(data: LOGIN_PAYLOAD) {
    setLoading(true);
    try {
      const res = await login(data);
      setResponse(res);
      // set user from response to context
      // handle status code here
    } catch (error) {
      if (error instanceof AxiosError) {
        const {message} = error;
        setError(message);
      }
    } finally {
      setLoading(false);
    }
  }

  return {response, loading, error, postLogin};
};
