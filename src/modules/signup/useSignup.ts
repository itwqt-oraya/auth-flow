import React, {useState} from 'react';
import {signup} from '@api/auth';
import {useNavigate} from 'react-router';

export const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  async function postSignup(data) {
    setLoading(true);
    try {
      const res = await signup(data);
      if (res.status === 200) {
        if (res.data) {
          return nav('/');
        }
      }
      return res;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  return {loading, postSignup};
};
