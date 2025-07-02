import {useEffect, useState} from 'react';

import {getPosts} from '@api/dashboard';
import {AxiosError} from 'axios';
import {POST} from '@models/posts';

export const useGetPost = () => {
  const [response, setResponse] = useState<POST[] | []>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Metadata
  const [offset, setOffset] = useState(0);
  const [order, setOrder] = useState('DESC');
  const [totalPage, setTotalPage] = useState<number>(0);
  const [totalPost, setTotalPost] = useState<number>(0);

  const getData = async (offset: number = 0, order: string = 'DESC') => {
    setLoading(true);
    try {
      const res = await getPosts(offset, order);
      setResponse(res.data);
      setTotalPage(res.meta.totalPages);
      setTotalPost(res.meta.totalRows || 0);
    } catch (error) {
      if (error instanceof AxiosError) {
        const {message} = error;
        setError(message);
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle query for next/prev page and order
  const handleQuery = async (offset: number, order: string) => {
    setOffset(offset);
    setOrder(order);
    await getData(offset, order);
  };

  useEffect(() => {
    handleQuery(0, 'DESC');
  }, []);

  return {
    response,
    loading,
    error,
    reload: getData,
    handleQuery,
    totalPage,
    totalPost,
    order,
    offset,
  };
};
