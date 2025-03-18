import {useState} from 'react';
import {getPost} from '@api/dashboard';
import {POST_PAYLOAD} from '@/models/posts';
import {AxiosError} from 'axios';

export const useGetPostById = () => {
  const [response, setResponse] = useState<POST_PAYLOAD>({
    title: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // fetch data using api
  const fetch = async (id: string) => {
    setLoading(true);
    try {
      const res = await getPost(id);
      if (res) {
        setResponse(res);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const {message} = error;
        setError(message);
      }
    } finally {
      setLoading(false);
    }
  };

  return {response, loading, error, reload: fetch, fetch};
};
