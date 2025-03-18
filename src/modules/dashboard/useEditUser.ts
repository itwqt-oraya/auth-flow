import {useContext, useState} from 'react';
import {AuthContext} from '@context/AuthContext';
import {details} from '@api/user';
import {USER_UPDATE} from '@/models/user';

export const useEditUser = () => {
  const {loginUser} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string>('');

  async function putEdit(payload: USER_UPDATE) {
    setLoading(true);
    try {
      const {data} = await details(payload);
      if (data) {
        loginUser({data: data});
        alert('User updated successfully');
      } else {
        alert('Error updating user data');
      }
    } catch (error) {
      console.log(error);
      setError(error instanceof Error ? error.message : String(error));
    } finally {
      setLoading(false);
      setSuccess(true);
    }
  }
  return {loading, error, putEdit, success};
};
