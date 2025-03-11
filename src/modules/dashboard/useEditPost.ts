import {useState} from 'react';
import {updatePost} from '@api/dashboard';
import {getCookie} from '@utils/cookie';

export const useEditPost = () => {
  const [response, setResponse] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = getCookie('token');

  // pUT data using api
  async function put(formData, id) {
    setLoading(true);
    try {
      const res = await updatePost(id, formData, token);
      setResponse(res.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return {response, loading, error, put};
};
