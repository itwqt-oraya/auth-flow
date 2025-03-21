import {useState} from 'react';
import {password} from '@api/user';
import {USER_PASSWORD} from '@/models/user';

export const useChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  async function changePassword(payload: USER_PASSWORD) {
    setLoading(true);
    try {
      const {data, status} = await password(payload);
      setLoading(false);
      if (data && status === 200) {
        alert('Password changed succesfully');
      } else {
        alert('Error changing password');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : String(error));
    }
  }
  return {
    loading,
    error,
    changePassword,
  };
};
