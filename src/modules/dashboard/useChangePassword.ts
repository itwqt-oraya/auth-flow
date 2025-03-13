import {useState} from 'react';
import {password} from '@api/user';
import {getCookie} from '../../utils/cookie';

interface FormData {
  password: string;
  newPassword: string;
}

export const useChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const token = getCookie('token');

  async function changePassword(data: FormData) {
    setLoading(true);
    try {
      const response = await password(data, token);
      if (response.status === 200) {
        alert('Password changed successfully');
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
  };
};
