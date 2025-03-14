import {useState} from 'react';
import {deletePost} from '@api/dashboard';
import {getCookie} from '@utils/cookie';

export const useDeletePost = () => {
  const [response, setResponse] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const token = getCookie('token');

  // delete data using api
  async function deleteApi(id: string) {
    setLoading(true);
    try {
      const res = await deletePost(id, token);
      if (res && res.status === 200) {
        setResponse(res.data);
        alert('Post deleted successfully');
      } else {
        setResponse({});
        alert('Error deleting post data');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : String(error));
    } finally {
      setLoading(false);
    }
  }
  return {response, loading, error, deleteApi};
};
