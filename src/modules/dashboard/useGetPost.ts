import {useCallback, useEffect, useState} from 'react';

import {getPosts} from '@api/dashboard';
import {AxiosError} from 'axios';
import {POST} from '@models/posts';

export const useGetPost = () => {
  const [response, setResponse] = useState<POST[] | []>([]);
  const [offset, setOffset] = useState(0);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getPosts(offset);
      setResponse(res.data);
      setTotalPage(res.meta.totalPages);
    } catch (error) {
      if (error instanceof AxiosError) {
        const {message} = error;
        setError(message);
      }
    } finally {
      setLoading(false);
    }
  }, [offset]);

  // uhh let's try page change
  const handlePage = useCallback((page: number) => {
    setOffset(page);
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  return {
    response,
    loading,
    error,
    reload: getData,
    handlePage,
    setOffset,
    totalPage,
    offset,
  };
};
