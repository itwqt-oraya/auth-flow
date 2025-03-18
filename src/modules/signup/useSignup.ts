import {useState} from 'react';
import {signup} from '@api/auth';
import {SIGNUP_PAYLOAD} from '@/models/user';
import {AxiosError} from 'axios';

export const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function postSignup(payload: SIGNUP_PAYLOAD) {
    setLoading(true);
    try {
      const {message} = await signup(payload);
      if (message) {
        alert(message);
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
  return {error, loading, postSignup};
};
