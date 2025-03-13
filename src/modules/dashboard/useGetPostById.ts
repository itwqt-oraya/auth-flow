import React, {useState} from 'react';

import {getPost} from '@api/dashboard';
import {getCookie} from '@utils/cookie';

export const useGetPostById = () => {
  const [response, setResponse] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = getCookie('token');

  // fetch data using api
  const fetch = async (id) => {
    console.log('fetching');
    setLoading(true);
    try {
      const res = await getPost(id, token);
      setResponse(res.data);
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {response, loading, error, reload: fetch, fetch};
};
