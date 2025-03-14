import {useEffect, useState} from 'react';

import {getPosts} from '@api/dashboard';
import {getCookie} from '@utils/cookie';

export const useGetPost = () => {
  const [response, setResponse] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const token = getCookie('token');

  useEffect(() => {
    if (token) {
      fetch();
    }
  }, [token]);

  // fetch data using api
  const fetch = async () => {
    setLoading(true);
    try {
      const res = await getPosts(token);
      if (res && res.status === 200) {
        setResponse(res.data);
      } else {
        setResponse({});
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : String(error));
    } finally {
      setLoading(false);
    }
  };

  return {
    response,
    loading,
    error,
    reload: fetch,
  };
};
