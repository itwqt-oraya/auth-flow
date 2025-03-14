import {useState} from 'react';
import {password} from '@api/user';
import {getCookie} from '../../utils/cookie';

interface PasswordInput {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const useChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const token = getCookie('token');

  async function changePassword(data: PasswordInput) {
    setLoading(true);
    try {
      const response = await password(data, token);
      if (response && response.status === 200) {
        alert('Password changed succesfully');
      } else {
        alert('Error changing password');
      }
      return response;
    } catch (error) {
      setError(error instanceof Error ? error.message : String(error));
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
