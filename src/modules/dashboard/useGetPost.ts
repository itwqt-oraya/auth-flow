import {useCallback, useEffect, useState} from 'react';

import {getPosts} from '@api/dashboard';
import {AxiosError} from 'axios';
import {POST} from '@models/posts';

export const useGetPost = () => {
  const [response, setResponse] = useState<POST[] | []>([]);
  const [offset, setOffset] = useState(0);
  const [order, setOrder] = useState('DESC');
  const [totalPage, setTotalPage] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getPosts(offset, order);
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
  }, [offset, order]);

  // uhh let's try page change
  const handlePage = useCallback(
    (page: number) => {
      if (page >= 0 && page < totalPage) {
        setOffset(page);
      }
    },
    [totalPage]
  );

  // ok now sort/order asc or desc
  const handleOrder = useCallback((order: string) => {
    setOrder(order);
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
    handleOrder,
    setOffset,
    totalPage,
    offset,
  };
};
