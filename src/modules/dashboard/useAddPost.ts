import {useState} from 'react';
import {createPost} from '@api/dashboard';
import {getCookie} from '@utils/cookie';

export const useAddPost = () => {
  const [response, setResponse] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = getCookie('token');

  // post data using api
  async function post(formData) {
    setLoading(true);
    try {
      const res = await createPost(formData, token);
      setResponse(res.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return {response, loading, error, post};
};
