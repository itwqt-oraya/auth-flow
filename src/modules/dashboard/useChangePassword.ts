import React, {useState} from 'react';
import {password} from '@api/user';
import {getCookie} from '../../utils/cookie';

export const useChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const token = getCookie('token');

  async function changePassword(data) {
    setLoading(true);
    try {
      const response = await password(data, token);
      return response;
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }
  return {
    loading,
    error,
    changePassword,
  };
};
