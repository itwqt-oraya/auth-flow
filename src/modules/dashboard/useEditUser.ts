import {useContext, useState} from 'react';
import {AuthContext} from '@context/AuthContext';
import {details} from '@api/user';
import {getCookie} from '@utils/cookie';

interface FormData {
  firstName: string;
  lastName: string;
}

export const useEditUser = () => {
  const {triggerReload, loginUser} = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const token = getCookie('token');

  async function putEdit(formData: FormData) {
    setLoading(true);
    try {
      const res = await details(formData, token);
      if (res && res.status === 200) {
        loginUser(res.data.data);
        alert('User updated successfully');
      } else {
        alert('Error updating user data');
      }
      triggerReload();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setSuccess(true);
    }
  }
  return {loading, putEdit, success};
};
