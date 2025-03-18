import {useCallback, useEffect, useState} from 'react';

import {getPosts} from '@api/dashboard';
import {AxiosError} from 'axios';
import {POST} from '@models/posts';

export const useGetPost = () => {
  const [response, setResponse] = useState<POST[] | []>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getData = useCallback(async () => {
    setLoading(true);
    try {
      const {data} = await getPosts();
      setResponse(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        const {message} = error;
        setError(message);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  return {
    response,
    loading,
    error,
    reload: getData,
  };
};
