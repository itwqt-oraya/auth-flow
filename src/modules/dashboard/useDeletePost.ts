import {useState} from 'react';
import {deletePost} from '@api/dashboard';
import {getCookie} from '@utils/cookie';

export const useDeletePost = () => {
  const [response, setResponse] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = getCookie('token');

  // delete data using api
  async function deleteApi(id) {
    setLoading(true);
    try {
      const res = await deletePost(id, token);
      setResponse(res.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }
  return {response, loading, error, deleteApi};
};
