import React, {useContext, useState} from 'react';
import {AuthContext} from '@context/AuthContext';
import {details} from '@api/user';
import {getCookie} from '@utils/cookie';

export const useEditUser = () => {
  const {triggerReload} = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const token = getCookie('token');

  async function putEdit(formData) {
    setLoading(true);
    try {
      const res = await details(formData, token);
      triggerReload();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  return {loading, putEdit};
};
