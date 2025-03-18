import {useState} from 'react';
import {signup} from '@api/auth';
import {SIGNUP_PAYLOAD} from '@/models/user';
import {AxiosError} from 'axios';

export const useSignup = () => {
  const [response, setResponse] = useState<SIGNUP_PAYLOAD | []>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function postSignup(data: SIGNUP_PAYLOAD) {
    setLoading(true);
    try {
      const res = await signup(data);
      setResponse(res);
      // handle status code here
      // handle redirect
    } catch (error) {
      if (error instanceof AxiosError) {
        const {message} = error;
        setError(message);
      }
    } finally {
      setLoading(false);
    }
  }
  return {response, error, loading, postSignup};
};
