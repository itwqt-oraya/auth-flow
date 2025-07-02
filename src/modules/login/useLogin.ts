import {useState} from 'react';
import {login} from '@api/auth';
import {LOGIN_PAYLOAD} from '@/models/user';
import {AxiosError} from 'axios';

import {setCookie} from '@/utils/cookie';

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function postLogin(payload: LOGIN_PAYLOAD) {
    setLoading(true);
    try {
      const {data} = await login(payload);
      if (data) {
        // set cookie
        setCookie('token', data.token, 1);
        // set user in cookie
        setCookie('user', JSON.stringify(data), 1);
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

  return {loading, error, postLogin};
};
