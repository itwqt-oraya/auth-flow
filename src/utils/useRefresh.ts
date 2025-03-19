import {useState, useContext} from 'react';
import {AuthContext} from '@/context';
import {refresh} from '@api/auth';
import {USER} from '@/models/user';
import {AxiosError} from 'axios';

export const useRefresh = () => {
  const {loginUser} = useContext(AuthContext);
  const [response, setResponse] = useState<USER | []>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function refreshUser() {
    setLoading(true);
    try {
      const {data} = await refresh();
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

  return {response, loading, error, refreshUser};
};
