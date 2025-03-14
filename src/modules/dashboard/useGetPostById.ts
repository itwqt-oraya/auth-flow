import {useState} from 'react';

import {getPost} from '@api/dashboard';
import {getCookie} from '@utils/cookie';

interface PostData {
  title: string;
  message: string;
}

export const useGetPostById = () => {
  const [response, setResponse] = useState<PostData>({
    title: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const token = getCookie('token');

  // fetch data using api
  const fetch = async (id: string) => {
    console.log('fetching');
    setLoading(true);
    try {
      const res = await getPost(id, token);
      if (res) {
        setResponse(res.data);
      } else {
        setResponse({
          title: '',
          message: '',
        });
      }
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {response, loading, error, reload: fetch, fetch};
};
