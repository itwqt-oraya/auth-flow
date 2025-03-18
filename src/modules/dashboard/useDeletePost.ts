import {useCallback, useState} from 'react';
import {deletePost} from '@api/dashboard';

export const useDeletePost = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const deleteApi = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const res = await deletePost(id);
      if (res) {
        alert(res.message);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : String(error));
    } finally {
      setLoading(false);
    }
  }, []);

  return {loading, error, deleteApi};
};
