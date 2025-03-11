import React, {useState} from 'react';
import {password} from '@api/user';
import {getCookie} from '../../utils/cookie';

export const useChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const [isToggle, setIsToggle] = useState(false);
  const [error, setError] = useState(null);
  const token = getCookie('token');

  async function changePassword(data) {
    setLoading(true);
    try {
      const response = await password(data, token);
      if (response.status === 200) {
        setIsToggle(true);
      }
      if (response.status === 400) {
        setIsToggle(false);
        alert('Error changing password');
      }
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
    isToggle,
  };
};
