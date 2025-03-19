import {useState, useContext} from 'react';
import {AuthContext} from '@/context';
import {login} from '@api/auth';
import {USER, LOGIN_PAYLOAD} from '@/models/user';
import {AxiosError} from 'axios';

export const useLogin = () => {
  const {loginUser} = useContext(AuthContext);
  const [response, setResponse] = useState<USER | []>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function postLogin(payload: LOGIN_PAYLOAD) {
    setLoading(true);
    try {
      const {data} = await login(payload);
      if (data) {
        setResponse(data);
        loginUser({data: data});
      }
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
